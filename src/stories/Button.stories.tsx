import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { Button, ButtonProps } from "../molecules/Button";
import { muiTheme } from "storybook-addon-material-ui";
import { LeidosLight } from "../theme";

const namedTheme: any = { themeName: "Leidos Light", ...LeidosLight };
export default {
	title: "molecules/Button",
	argTypes: {
		color: {
			name: "color",
			type: { name: "string", required: false },
			defaultValue: "primary",
			control: {
				type: "inline-radio",
				options: ["default", "inherit", "primary", "secondary"],
			},
		},
		variant: {
			name: "variant",
			type: { name: "string", required: false },
			defaultValue: "contained",
			control: {
				type: "inline-radio",
				options: ["contained", "outlined", "text"],
			},
		},

		size: {
			name: "size",
			type: { name: "string", required: false },
			defaultValue: "contained",
			control: {
				type: "inline-radio",
				options: ["large", "medium", "small"],
			},
		},
	},
	decorators: [muiTheme([namedTheme, "Dark Theme", "Light Theme"])],
} as Meta;

const Template: Story<ButtonProps & { label?: string }> = (args) => {
	const label: string = args.label ?? "Button";

	return <Button {...args}>{label}</Button>;
};

export const Primary = Template.bind({});
Primary.args = {
	color: 'primary'
};

export const Secondary = Template.bind({});
Secondary.args = {
	color: 'secondary'
};

export const Large = Template.bind({});
Large.args = {
	size: "large",
};

export const Small = Template.bind({});
Small.args = {
	size: "small",
};

