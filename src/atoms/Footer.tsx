import React, { FunctionComponent, MouseEventHandler, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/styles/withStyles";
import { Theme } from "@material-ui/core/styles";


type FooterClassKeys = "root" | "logo" | "account" | "accountMenu";

type StyleRulesType = StyleRules<{}, FooterClassKeys>["root"];
const baseStyle = (theme: Theme): StyleRulesType => ({
	height: "50px",
	background: theme.palette.secondary.main,
	width: "100%",
	zIndex: 1,
	boxShadow: "0px 0px 8px 3px #BDBEBC",
	color: theme.palette.secondary.contrastText,
	display: "flex",
	flexFlow: "row",
});

const useStyles = makeStyles((theme: Theme) => {
	const bs = baseStyle(theme);
	return {
		root: {
			...bs,
		},
		logo: {
			flex: "1 1 auto",
			display: "flex",
			alignContent: "center",
			alignItems: "center",
			height: "100%",
			color: theme.palette.primary.contrastText,
			"& .icon": {
				color: theme.palette.primary.contrastText,
				paddingLeft: "5px",
			},
			"& .title": {
				color: theme.palette.primary.contrastText,
				paddingLeft: "10px",
				fontSize: "1.8rem",
			},
		},
		account: {
			flex: "0 1 auto",
			display: "flex",
			alignContent: "center",
			alignItems: "center",
			paddingRight: "10px",
			"& .MuiIconButton-root": {
				color: theme.palette.primary.contrastText,
			},
		},
		accountMenu: {
			background: "white",
		},
	};
});

export interface AccountMenu {
	icon: React.ReactElement;
	label: string;
	id: string;
	onClick?: MouseEventHandler;
	disabled?: boolean;
}
export interface FooterProps {
	logo?: { icon?: React.ReactElement; title?: string };
	user?: object;
	accountMenu?: AccountMenu[];
}
export const Footer: FunctionComponent<FooterProps> = (args) => {
	const styles = useStyles();

	useEffect(() => {}, [args.user, args]);

	return <footer className={styles.root}></footer>;
};
