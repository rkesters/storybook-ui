import React, { PropsWithChildren } from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from "@storybook/react";
import { muiTheme } from "storybook-addon-material-ui";
import { LeidosLight } from "../theme";
import { SiderBar, SiderBarProps } from "../layouts/SideBar";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";

const namedTheme: any = { themeName: "Leidos Light", ...LeidosLight };
export default {
	title: "layout/SideBar",
	argTypes: {},
	decorators: [
		muiTheme([namedTheme, "Dark Theme", "Light Theme"]),
		(story: any) => {
			document.body.setAttribute("style", "");
			return story();
		},
	],
} as Meta;

const Template: Story<PropsWithChildren<SiderBarProps>> = (
	args: PropsWithChildren<SiderBarProps>
) => {
	return (
		<div style={{ height: "100vh" }}>
			<SiderBar {...args}></SiderBar>
		</div>
	);
};

export const Base = Template.bind({});
Base.args = {};

export const Children = Template.bind({});
Children.args = {
	children: <div>Hi</div>,
};

export const WithMenu = Template.bind({});
WithMenu.args = {
	children: (
		<MenuList variant={"selectedMenu"}>
			<MenuItem>
				<ListItemIcon>
					<SendIcon fontSize="small" />
				</ListItemIcon>
				<Typography variant="inherit">A short message</Typography>
			</MenuItem>
			<MenuItem selected>
				<ListItemIcon>
					<PriorityHighIcon fontSize="small" />
				</ListItemIcon>
				<Typography variant="inherit" noWrap>
					A very long text that overflows
				</Typography>
			</MenuItem>
			<MenuItem>
				<ListItemIcon>
					<DraftsIcon fontSize="small" />
				</ListItemIcon>
				<Typography variant="inherit" noWrap>
					A very long text that overflows
				</Typography>
			</MenuItem>
		</MenuList>
	),
};

export const WithMenuProps = Template.bind({});
WithMenuProps.args = {
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
};
