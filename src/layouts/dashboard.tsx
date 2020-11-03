import { makeStyles, Theme } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { Footer, FooterProps } from "../atoms/Footer";
import { Header, HeaderProps } from "../atoms/Header";
import { SiderBar, SiderBarProps } from "./SideBar";

const useStyles = makeStyles((theme: Theme) => {
	return {
		root: {
			width: "100vw",
			height: "100vh",
			display: "flex",
			flexFlow: "column",
			"& .dashboard-center": {
				width: "100%",
				height: "100%",
				display: "flex",
				flexFlow: "row",
				"& .dashboard-content": {
					background: "rgb(250 250 250)",
					width: "100%",
				height: "100%",
				}
			},
		},
	};
});

export interface DashboardProps {
	header?: HeaderProps;
	sidebar?: SiderBarProps;
	footer?: FooterProps;
}

export const Dashboard: FunctionComponent<DashboardProps> = (args) => {
	const style = useStyles();
	return (
		<div className={style.root}>
			<Header {...args.header}></Header>
			<div className="dashboard-center">
				<SiderBar {...args.sidebar}></SiderBar>
				<div className="dashboard-content"> HI </div>
			</div>
			<Footer {...args.footer}> </Footer>
		</div>
	);
};
