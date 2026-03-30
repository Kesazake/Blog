import type { FriendLink, FriendsPageConfig } from "../types/config";

// 可以在src/content/spec/friends.md中编写友链页面下方的自定义内容

// 友链页面配置
export const friendsPageConfig: FriendsPageConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "",

	// 是否显示底部自定义内容（friends.mdx 中的内容）
	showCustomContent: true,
};

// 友链配置
export const friendsConfig: FriendLink[] = [
	{
		title: "夏夜流萤",
		imgurl: "https://q1.qlogo.cn/g?b=qq&nk=7618557&s=640",
		desc: "飞萤之火自无梦的长夜亮起，绽放在终竟的明天。",
		siteurl: "https://blog.cuteleaf.cn",
		tags: ["Blog"],
		weight: 1, // 权重，数字越大排序越靠前
		enabled: false, // 是否启用
	},
	{
		title: "Firefly Docs",
		imgurl: "https://docs-firefly.cuteleaf.cn/logo.png",
		desc: "Firefly主题模板文档",
		siteurl: "https://docs-firefly.cuteleaf.cn",
		tags: ["Docs"],
		weight: 2,
		enabled: false,
	},
	{
		title: "Astro",
		imgurl: "https://avatars.githubusercontent.com/u/44914786?v=4&s=640",
		desc: "The web framework for content-driven websites. ⭐️ Star to support our work!",
		siteurl: "https://github.com/withastro/astro",
		tags: ["Framework"],
		weight: 3,
		enabled: false,
	},
	{
		title: "阿獭佧",
		imgurl: "https://www.ataka.top/assets/images/ac3fac02bf48e8b5fdc404a874eaecb8.webp",
		desc: "我是阿獭佧，会做点傻开心的事.",
		siteurl: "https://www.ataka.top",
		tags: ["Blog"],
		weight: 8,
		enabled: true,
	},
	{
		title: "孤蛍",
		imgurl: "https://www.kohotaru.top/_astro/avatar.BcAu2wMi_yT6PR.webp",
		desc: "",
		siteurl: "https://www.kohotaru.top",
		tags: ["Blog"],
		weight: 9,
		enabled: true,
	},
	{
		title: "xihale",
		imgurl: "https://xihale.top/_astro/avatar.DGynp9Uf_ZyoA79.webp",
		desc: "I have some thoughts.",
		siteurl: "https://xihale.top",
		tags: ["Blog"],
		weight: 9,
		enabled: true,
	},
	{
		title: "焦茶咖啡厅",
		imgurl: "https://tea.keqing.moe/tea.png",
		desc: "来和焦茶染香喝杯奶茶吗？",
		siteurl: "https://tea.keqing.moe",
		tags: ["Blog"],
		weight: 9,
		enabled: true,
	},
];

// 获取启用的友链并按权重排序
export const getEnabledFriends = (): FriendLink[] => {
	return friendsConfig
		.filter((friend) => friend.enabled)
		.sort((a, b) => b.weight - a.weight);
};
