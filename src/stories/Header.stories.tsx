import React, { PropsWithChildren } from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from "@storybook/react";
import { muiTheme } from "storybook-addon-material-ui";
import { LeidosLight } from "../theme";
import { Header, HeaderProps } from "../atoms/Header";
import SendIcon from "@material-ui/icons/Send";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const namedTheme: any = { themeName: "Leidos Light", ...LeidosLight };
export default {
	title: "atoms/Header",
	argTypes: {},
	decorators: [
		muiTheme([namedTheme, "Dark Theme", "Light Theme"]),
		(story: any) => {
			document.body.setAttribute("style", "");
			return story();
		},
	],
} as Meta;

const Template: Story<PropsWithChildren<HeaderProps>> = (
	args: PropsWithChildren<HeaderProps>
) => {
	return (
		<div style={{ width: "100vw" }}>
			<Header {...args}></Header>
		</div>
	);
};

export const Base = Template.bind({});
Base.args = {};

export const withLogo = Template.bind({});
withLogo.args = {
	logo: {
		title: "Bonfire",
		icon: <SendIcon />,
	},
};

export const withUser = Template.bind({});
withUser.args = {
	logo: {
		title: "Bonfire",
		icon: <SendIcon />,
	},
	user: {},
};

export const withAccountMenu = Template.bind({});
withAccountMenu.args = {
	logo: {
		title: "Bonfire",
		icon: <SendIcon />,
	},
	user: {},
	accountMenu: [{ icon: <ExitToAppIcon />, label: "log out", id: "m1" }],
};
