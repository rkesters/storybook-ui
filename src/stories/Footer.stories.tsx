import React, { PropsWithChildren } from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from "@storybook/react";
import { muiTheme } from "storybook-addon-material-ui";
import { LeidosLight } from "../theme";
import { Footer, FooterProps } from "../atoms/Footer";

const namedTheme: any = { themeName: "Leidos Light", ...LeidosLight };
export default {
	title: "atoms/Footer",
	argTypes: {},
	decorators: [
		muiTheme([namedTheme, "Dark Theme", "Light Theme"]),
		(story: any) => {
			document.body.setAttribute("style", "");
			return story();
		},
	],
} as Meta;

const Template: Story<PropsWithChildren<FooterProps>> = (
	args: PropsWithChildren<FooterProps>
) => {
	return (
		<div style={{ width: "100vw" , height: "100vh" , display:'flex', flexFlow: "column",}}>
			<div style={{ width: "100vw" , height: "100vh" , flex: "1 1 auto"}}></div>
			<Footer {...args}></Footer>
		</div>
	);
};

export const Base = Template.bind({});
Base.args = {};


