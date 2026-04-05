import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import glob from 'glob';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.resolve(__dirname, '..', 'src', 'content', 'posts');
const OUT_DIR = path.resolve(__dirname, '..', 'public', 'api');
const OUT_FILE = path.join(OUT_DIR, 'allPostMeta.json');

function normalizeId(filePath) {
  // filePath is absolute under CONTENT_DIR, produce id like the Astro content id
  const rel = path.relative(CONTENT_DIR, filePath).replaceAll('\\', '/');
  // remove extension
  const noext = rel.replace(/\.[^.]+$/, '');
  // keep path segments but lowercase folder names but preserve filename casing for compatibility
  const parts = noext.split('/');
  if (parts.length === 1) return parts[0];
  // lower-case directory segments, keep filename as-is
  return parts.map((p, i) => (i < parts.length - 1 ? p.toLowerCase() : p)).join('/');
}

async function collect() {
  return new Promise((resolve, reject) => {
    glob('**/*.+(md|mdx|markdown)', { cwd: CONTENT_DIR, nodir: true }, (err, files) => {
      if (err) return reject(err);
      resolve(files.map((f) => path.join(CONTENT_DIR, f)));
    });
  });
}

async function run() {
  try {
    const files = await collect();
    const all = [];

    for (const file of files) {
      const raw = await fs.readFile(file, 'utf8');
      const parsed = matter(raw);
      const data = parsed.data || {};

      // skip drafts in production builds
      if (process.env.NODE_ENV === 'production' && data.draft === true) continue;

      let published = data.published || data.date || null;
      let publishedTs = null;
      if (published) {
        const d = new Date(published);
        if (!Number.isNaN(d.getTime())) publishedTs = d.getTime();
      }

      // Fallback to file mtime
      if (!publishedTs) {
        const stat = await fs.stat(file);
        publishedTs = stat.mtime.getTime();
      }

      const id = normalizeId(file);

      all.push({
        id,
        title: data.title || '',
        description: data.description || '',
        published: publishedTs,
        category: data.category || '',
        password: !!data.password,
      });
    }

    // sort descending by published
    all.sort((a, b) => b.published - a.published);

    await fs.mkdir(OUT_DIR, { recursive: true });
    await fs.writeFile(OUT_FILE, JSON.stringify(all, null, 2), 'utf8');
    console.log('Wrote', OUT_FILE, 'with', all.length, 'items');
  } catch (e) {
    console.error('Error generating allPostMeta.json', e);
    process.exitCode = 1;
  }
}

run();
