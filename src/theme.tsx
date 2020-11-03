import createMuiTheme, { Theme } from "@material-ui/core/styles/createMuiTheme";
//, contrastText: "#BDBEBC"
export const LeidosLight: Theme = createMuiTheme({
	palette: {
		primary: { main: "#850F88" },
		secondary: { main: "#1F1646" },
		type: "light",
		background: {
			default: "white",
		//	paper: "#BDBEBC",
		},
	},
});

function getColorFromRGB(col: string): number[] {
	return col
		.replace("rgb", "")
		.replace("(", "")
		.replace(")", "")
		.split(",")
		.map((d) => parseInt(d, 10));
}

function getColorFromString(col: string): [number, number, number] {
	if (col[0] === "#") {
		col = col.slice(1);
	}

	const num = parseInt(col, 16);

	let r = num >> 16;

	if (r > 255) r = 255;
	else if (r < 0) r = 0;

	let b = (num >> 8) & 0x00ff;

	if (b > 255) b = 255;
	else if (b < 0) b = 0;

	let g = num & 0x0000ff;

	if (g > 255) g = 255;
	else if (g < 0) g = 0;

	return [r, g, b];
}
function changerColor(
	[r, g, b]: [number, number, number],
	amt: number
): [number, number, number] {
	console.log(`LightenDarkenColor : ${r} ${g}  ${b}`);

	r += amt;

	if (r > 255) r = 255;
	else if (r < 0) r = 0;

	b += amt;

	if (b > 255) b = 255;
	else if (b < 0) b = 0;

	g += amt;

	if (g > 255) g = 255;
	else if (g < 0) g = 0;

	return [r, g, b];
}

export function LightenDarkenColor(col: string, amt: number) {
	let [r, g, b] = col.trim().startsWith("rgb(")
		? getColorFromRGB(col.trim())
		: getColorFromString(col.trim());

	const [nr, ng, nb] = changerColor([r, g, b], amt);

	return col.trim().startsWith("rgb(")
		? `rgb(${nr},${ng},${nb})`
		: col.trim().startsWith("#")
		? `#${(g | (b << 8) | (r << 16)).toString(16)}`
		: `${(g | (b << 8) | (r << 16)).toString(16)}`;
}
