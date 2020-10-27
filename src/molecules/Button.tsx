
import React from "react";
import { Button as AntButton } from "antd";
import { ButtonProps } from "antd/lib/button/button";

const defaults: ButtonProps = { 
	size: "large",
  shape: "round",
};
export const Button = (props: ButtonProps) => {
	const p: ButtonProps = { ...defaults, ...props };
  console.log('Button');
  console.dir(p);
	return <AntButton {...p} />;
};
