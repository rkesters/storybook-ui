import React, { PropsWithChildren } from "react";
import { Meta, Story } from "@storybook/react";
import { muiTheme } from "storybook-addon-material-ui";
import { LeidosLight } from "../theme";
import { Gauge, GaugeProps } from "../molecules/Gauge";

const namedTheme: any = { themeName: "Leidos Light", ...LeidosLight };
export default {
	title: "molecules/Gauge",
	argTypes: {},
	decorators: [
		muiTheme([namedTheme, "Dark Theme", "Light Theme"]),
		(story: any) => {
			document.body.setAttribute("style", "");
			return story();
		},
	],
} as Meta;

const Template: Story<PropsWithChildren<GaugeProps>> = (
	args: PropsWithChildren<GaugeProps>
) => {
	return <Gauge {...args}> </Gauge>;
};

export const Base = Template.bind({});
Base.args = { value: 25, min: 0, max: 100, label: "Free Space", units: "%" };

export const Large = Template.bind({});
Large.args = { value: 25, min: 0, max: 100, label: "Free Space", units: "%", size:"large" };

export const small = Template.bind({});
small.args = { value: 25, min: 0, max: 100, label: "Free Space", units: "%" ,  size:"small" };

export const customeSize = Template.bind({});
customeSize.args = { value: 25, min: 0, max: 100, label: "Free Space", units: "%" , size:30 };

export const withSections = Template.bind({});
withSections.args = {
	value: 90,
	min: 0,
	max: 100,
	label: "Free Space",
	units: "%",
	sections: [
		{
			color: "#f2ab05",
			min: 10,
			max: 30,
			type: "warning",
		},
		{
			color: "#e00707",
			min: 0,
			max: 10,
			type: "alert",
		},
		{
			color: "#08bf39",
			min: 30,
			max: 100,
			type: "ok",
		},
	],
};

export const withReversedSections = Template.bind({});
withReversedSections.args = {
	value: 25,
	min: 0,
	max: 100,
	label: "Free Space",
	units: "%",
	reverseSections: true,
	sections: [
		{
			color: "#f2ab05",
			min: 10,
			max: 30,
			type: "warning",
		},
		{
			color: "#e00707",
			min: 0,
			max: 10,
			type: "alert",
		},
		{
			color: "#08bf39",
			min: 30,
			max: 100,
			type: "ok",
		},
	],
};

export const asAlert = Template.bind({});
asAlert.args = {
	value: 1,
	min: 0,
	max: 100,
	label: "Free Space",
	units: "%",
	reverseSections: true,
	sections: [
		{
			color: "#f2ab05",
			min: 10,
			max: 30,
			type: "warning",
		},
		{
			color: "#e00707",
			min: 0,
			max: 10,
			type: "alert",
		},
		{
			color: "#08bf39",
			min: 30,
			max: 100,
			type: "ok",
		},
	],
};
