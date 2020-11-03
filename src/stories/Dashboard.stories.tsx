import React, { PropsWithChildren } from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from "@storybook/react";
import { muiTheme } from "storybook-addon-material-ui";
import { LeidosLight } from "../theme";
import { Dashboard, DashboardProps } from "../layouts/dashboard";
import SendIcon from "@material-ui/icons/Send";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DraftsIcon from "@material-ui/icons/Drafts";

const namedTheme: any = { themeName: "Leidos Light", ...LeidosLight };
export default {
	title: "layout/Dashboard",
	argTypes: {},
	decorators: [
		muiTheme([namedTheme, "Dark Theme", "Light Theme"]),
		(story: any) => {
			document.body.setAttribute("style", "");
			return story();
		},
	],
} as Meta;

const Template: Story<PropsWithChildren<DashboardProps>> = (
	args: PropsWithChildren<DashboardProps>
) => {
	return (
			<Dashboard {...args}></Dashboard>
	);
};

export const Base = Template.bind({});
Base.args = {};

export const Full = Template.bind({});
Full.args = {
	header:{
		logo: {
			title: "Bonfire",
			icon: <SendIcon />,
		},
		user: {},
		accountMenu: [{ icon: <ExitToAppIcon />, label: "log out", id: "m1" }],
	},
	sidebar: 
	{
		menu: [
			{
				id: "m1",
				label: "Hi",
				icon: <DraftsIcon />,
				onClick: (event: React.MouseEvent) =>
					console.log("Click callback handled"),
			},
			{ id: "m2", label: "bye", icon: <DraftsIcon /> },
		],
		intialSelection: "m1",
	},

};







