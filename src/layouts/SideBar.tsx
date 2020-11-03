import React, {
	FunctionComponent,
	MouseEventHandler,
	useEffect,
	useState,
} from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/styles/withStyles";
import { Theme } from "@material-ui/core/styles";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import MenuList from "@material-ui/core/MenuList";
import { NavLink } from "react-router-dom";

import { LightenDarkenColor } from "../theme";

type SiderBarClassKeys = "root" | "colapsed";
type StyleRulesType = StyleRules<{}, SiderBarClassKeys>["root"];

const baseStyle = (theme: Theme): StyleRulesType => ({
	background: theme.palette.primary.light,
	color: theme.palette.primary.contrastText,
	display: "flex",
	flexFlow: "column",
	height: "100%",
	//zIndex: -2,
	"& .MuiListItem-button:hover": {
		background: LightenDarkenColor(theme.palette.primary.light, 30),
	},
	"& .MuiListItemIcon-root": {
		color: theme.palette.primary.contrastText,
	},
	"& .Mui-selected": {
		background: theme.palette.secondary.main,
		"&:hover": {
			background: theme.palette.secondary.light,
		},
	},
	"& section": {
		flex: "1 1 auto",
		paddingTop: "5px",
	},
	"& footer": {
		textAlign: "center",
		flex: "0 0 40px",
		cursor: "pointer",
		"&:hover": {
			color: "black",
		},
	},
});

const useStyles = makeStyles((theme: Theme) => {
	const bs = baseStyle(theme);
	return {
		root: {
			width: "30ch",
			...bs,
		},
		colapsed: {
			width: "8ch",
			...bs,
		},
	};
});

export interface SiderBarMenu {
	icon: React.ReactElement;
	label: string;
	id: string;
	onClick?: MouseEventHandler;
	useNavLink?: boolean;
	linkTo?: string;
}
export interface SiderBarProps {
	classKey?: "root" | "colapsed";
	menu?: SiderBarMenu[];
	intialSelection?: string;
}

export const SiderBar: FunctionComponent<SiderBarProps> = (args) => {
	const styles = useStyles();
	const [classKey, setClassKey] = useState(args.classKey ?? "root");
	const [selected, setSelected] = useState(args.intialSelection ?? "");
	let style = styles[classKey];

	const toggle = () => {
		switch (classKey) {
			case "root":
				setClassKey("colapsed");
				break;
			case "colapsed":
				setClassKey("root");
				break;
			default:
				setClassKey("root");
				break;
		}
	};

	const genMenu = (menu?: SiderBarMenu[]) => {
		if (!menu || menu.length === 0) {
			return "";
		}

		return (
			<MenuList variant={"selectedMenu"}>
				{menu.map((m) => {
					let miProps = m.useNavLink
						? {
								component: NavLink,
								to: m.linkTo,
								activeClassName: 'Mui-selected',
								button: true
						  }
						: {
								onClick: (event: React.MouseEvent) => {
									setSelected(m.id);
									return m.onClick ? m.onClick(event) : null;
								},
								selected: selected === m.id
						  };

					return (
						<MenuItem
							key={m.id}
							id={m.id}
							
							{...miProps}
						>
							<ListItemIcon>{m.icon}</ListItemIcon>
							<Typography variant="inherit">{m.label}</Typography>
						</MenuItem>
					);
				})}
			</MenuList>
		);
	};

	useEffect(() => {}, [classKey]);

	return (
		<Box className={style}>
			<section>
				{args.children ? args.children : ""}
				{genMenu(args.menu)}
			</section>
			<footer onClick={toggle}>
				{classKey === "root" ? <ChevronLeft /> : <ChevronRight />}
			</footer>
		</Box>
	);
};
