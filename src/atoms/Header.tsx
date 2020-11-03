import React, { FunctionComponent, MouseEventHandler, useEffect } from "react";
import Box from "@material-ui/core/Box";
import { Button } from "../molecules/Button";
import { makeStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/styles/withStyles";
import { Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";

type HeaderClassKeys = "root" | "logo" | "account" | "accountMenu";

type StyleRulesType = StyleRules<{}, HeaderClassKeys>["root"];
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
export interface HeaderProps {
	logo?: { icon?: React.ReactElement; title?: string };
	user?: object;
	accountMenu?: AccountMenu[];
}
export const Header: FunctionComponent<HeaderProps> = (args) => {
	const styles = useStyles();

	useEffect(() => {}, [args.user, args]);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const genMenu = (menu?: AccountMenu[]) => {
		if (!menu || menu.length === 0) {
			return "";
		}

		return (
			<Menu
				variant={"selectedMenu"}
				id="customized-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{menu.map((m) => {
					return (
						<MenuItem
							key={m.id}
							id={m.id}
							onClick={(event: React.MouseEvent) => {
								return m.onClick ? m.onClick(event) : null;
							}}
						>
							<ListItemIcon>{m.icon}</ListItemIcon>
							<Typography variant="inherit">{m.label}</Typography>
						</MenuItem>
					);
				})}
			</Menu>
		);
	};

	const getLogo = () => {
		if (!args.logo) {
			return;
		}
		return (
			<React.Fragment>
				<Box className={"icon"}> {args.logo.icon ? args.logo.icon : ""} </Box>
				<Typography className={"title"}>
					{args.logo.title ? args.logo.title : ""}{" "}
				</Typography>{" "}
			</React.Fragment>
		);
	};

	return (
		<Box className={styles.root}>
			<Box className={styles.logo}>{getLogo()}</Box>
			<Box className={styles.account}>
				{args.user ? (
					<React.Fragment>
						{args.accountMenu ? (
							<React.Fragment>
								<IconButton onClick={handleClick}>
									<AccountBoxIcon fontSize="large" />
								</IconButton>
								{genMenu(args.accountMenu)}
							</React.Fragment>
						) : (
							<AccountBoxIcon fontSize="large" />
						)}
					</React.Fragment>
				) : (
					<React.Fragment>
						<Button color="secondary" size="small">
							Log on
						</Button>
					</React.Fragment>
				)}
			</Box>
		</Box>
	);
};
