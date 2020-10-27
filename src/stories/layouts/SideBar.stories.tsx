import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import {SideBar} from '../../layouts/SideBar'

export default {
	title: "layouts/SideBar",
	argTypes: {},
} as Meta;

const Template: Story<any> = (args) => {
	return <SideBar {...args} />;
};

export const Simple = Template.bind({});
