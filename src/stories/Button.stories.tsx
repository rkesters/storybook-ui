import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { Button } from "../molecules/Button";
import { ButtonProps } from "antd/lib/button/button";
import { DownloadOutlined } from "@ant-design/icons";
 
export default {
	title: "molecules/Button",
	argTypes: {
		label: {
			control: {
				type: "text",
			},
		},
		danger: {
			control: {
				type: "boolean",
			},
		},
		loading: {
			control: {
				type: "boolean",
			},
		},
		size: {
			control: {
				type: "inline-radio",
				options: ["large", "small", "middle"],
			},
		},
		shape: {
			control: {
				type: "inline-radio",
				options: ["null", "round", "circle"],
			},
		},
		type: {
			control: {
				type: "inline-radio",
				options: ["text", "link", "ghost", "default", "primary", "dashed"],
			},
		},
		htmlType: {
			control: {
				type: "inline-radio",
				options: ["submit", "button", "reset"],
			},
		},
	},
} as Meta;

const Template: Story<ButtonProps & { label?: string }> = (args) => {
	const label: string = args.label ?? "Button";

	return <Button {...args}>{label}</Button>;
};

export const Primary = Template.bind({});
Primary.args = {
	type: "primary",
	shape: "round",
};

export const Large = Template.bind({});
Large.args = {
	size: "large",
	type: "primary",
	shape: "round",
};

export const Small = Template.bind({});
Small.args = {
	size: "small",
	type: "primary",
	shape: "round",
};

export const Icon = Template.bind({});
Icon.args = {
	type: "primary",
	shape: "round",
	icon: <DownloadOutlined />,
};
