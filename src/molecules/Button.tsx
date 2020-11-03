import React from "react";
import {
	Button as AntButton,
	ButtonProps as MUIButtonProps,
} from "@material-ui/core";

export interface ButtonProps extends MUIButtonProps {}

const defaults: ButtonProps = {
	size: "large",
	variant: "contained",
};
export const Button = (props: ButtonProps) => {
	const p: MUIButtonProps = { ...defaults, ...props };
	return <AntButton {...p} />;
};
