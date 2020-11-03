import React, { PropsWithChildren } from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from "@storybook/react";
import { muiTheme } from "storybook-addon-material-ui";
import { LeidosLight } from "../theme";
import { SiderBar, SiderBarProps } from "../layouts/SideBar";
import DraftsIcon from "@material-ui/icons/Drafts";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const namedTheme: any = { themeName: "Leidos Light", ...LeidosLight };
export default {
	title: "layout/SideBarWithNav",
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
			<Router>
				<SiderBar {...args}></SiderBar>

				<Switch>
					<Route exact path="/">
						<div>Hi Home</div>
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export const WithNavLinks = Template.bind({});
WithNavLinks.args = {
	menu: [
		{
			id: "m1",
			label: "Hi",
			icon: <DraftsIcon />,
			useNavLink: true,
			linkTo: "/Hi",
		},
		{
			id: "m2",
			label: "bye",
			icon: <DraftsIcon />,
			useNavLink: true,
			linkTo: "/bye",
		},
	],
	intialSelection: "m1",
};
