export type MetaType = {
	title?: string;
	tagline?: string;
	url?: string;
	favicon?: string;
	organizationName?: string;
	projectName?: string;
};

export type NavbarType = {
	title?: string;
	"title-margin"?: string;
	height?: string;
	"background-color"?: string;
	position?: string;
	"logo-image"?: string;
	"logo-alt"?: string;
	"items"?: {
		name?: string;
		type?: string;
		color?: string;
		position?: string;
	}[]
}

export type HeaderType = {
	height?: string;
	"background-color"?: string;
	"background-image"?: string;
	show: string;
	tagline: string;
	title?: {
		"font-size"?: string;
		"font-color"?: string;
		"font-family"?: string;
	};
	desc?: {
		"font-size"?: string;
		"font-color"?: string;
		"font-family"?: string;
	};
	button?: {
		show?: string;
		"font-size"?: string;
		"font-color"?: string;
		"font-family"?: string;
		"background-color"?: string;
	};
};

export type FeatureBasicItemType = {
	index?: number;
	title?: string;
	image?: string;
	description?: string;
};

export type FeatureLinkItemType = {
	index?: number;
	title?: string;
	image?: string;
	to?: string;
	href?: string;
};

export type FeatureType = {
	basicHeight?: string;
	"basicBackground-color"?: string;
	"basicBackground-image"?: string;
	linkHeight?: string
	"linkBackground-color"?: string;
	"linkBackground-image"?: string;
	items?: {
		basic?: FeatureBasicItemType[];
		link?: FeatureLinkItemType[];
	}
}

export type FooterType = {
	"background-color"?: string;
	"background-image"?: string;
	sections?: {
		title?: string;
		"font-size"?: string;
		"font-color"?: string;
		items?: {
			name?: string;
			"font-size"?: string;
			"font-color"?: string;
			to?: string;
			href?: string;
		}[];
	}[];
}

export type WholeJSONType = {
	meta?: MetaType;
	navbar?: NavbarType;
	header?: HeaderType;
	feature?: FeatureType;
	footer?: FooterType;
};
