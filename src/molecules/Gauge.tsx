import { makeStyles, Theme } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { arc } from "d3-shape";
import { scaleLinear } from "d3-scale";
import { format } from "d3-format";
import { sortBy, isNumber } from "lodash";
import WarningIcon from "@material-ui/icons/Warning";



const sizes = { large: 20, medium: 10, small: 5 };

export interface GaugeProps {
	value: number;
	min: number;
	max: number;
	label: string;
	units: string;
	size?: keyof typeof sizes | number;
	sections?: {
		color: string;
		min: number;
		max: number;
		type: "ok" | "warning" | "alert";
	}[];
	reverseSections?: boolean;
}

//const gap = 0.027;

const useStyles = makeStyles((theme: Theme) => {
	return {
		root: {
			textAlign: "center",
			
		},
		svg: {
			overflow: "visible",
		},
		value: {
			marginTop: "0.4em",
			fontSize: "3em",
			lineHeight: "1em",
			fontWeight: 900,
			fontFeatureSettings: "'zero', 'tnum' 1",
		},
		label: {
			fontSize: "1.3em",
			lineHeight: "1.3em",
			fontWeight: 700,
		},
		units: { color: "#8b8ba7", lineHeight: "1.3em", fontWeight: 300 },
	};
});

export const Gauge: FunctionComponent<GaugeProps> = (props) => {
	const style = useStyles();

	const sizeInt = props.size ?? "medium";
	const size = isNumber(sizeInt)
		? sizeInt
		: sizes[sizeInt as keyof typeof sizes];

	const fontScale = scaleLinear().domain([5, 10, 20]).range([1, 2, 3]);

	const percentScale = scaleLinear()
		.domain([props.min, props.max])
		.range([0, 1]);
	const percent = percentScale(props.value) ?? 0;

	const angleScale = scaleLinear()
		.domain(props.reverseSections ? [1, 0] : [0, 1])
		.range([-Math.PI / 2, Math.PI / 2])
		.clamp(true);
	const angle = angleScale(percent) ?? 0;

	const colorScale = scaleLinear()
		.domain([0, 1])
		.range(["#89faa7", "#00ff44"] as any);
	const gradientSteps: number[] = colorScale
		.ticks(10)
		.map((value) => colorScale(value))
		.filter((k) => k) as number[];

	const sections = sortBy(
		!props.sections || !props.sections.length
			? [
					{
						color: "#850F88",
						min: props.min,
						max: props.max,
						type: "ok",
					},
			  ]
			: props.sections,
		["min"]
	);

	const paths = sections.map((s, i) => {
		const startPercent = percentScale(s.min) ?? 0,
			endPercent = percentScale(s.max) ?? 0,
			startAngle = angleScale(startPercent) ?? 0,
			endAngle = angleScale(endPercent) ?? 0;

		const p = (arc()
			.innerRadius(0.65)
			.outerRadius(1)
			.startAngle(startAngle)
			.endAngle(endAngle)
			.cornerRadius(0) as any)();
		return <path key={`section-${i}`} d={p} fill={s.color} opacity=".5" />;
	});

	const fills = sections
		.map((s, i): any => {
			const min = props.reverseSections ? s.max : s.min;
			const max = props.reverseSections ? s.min : s.max;

			const startPercent = percentScale(min) ?? 0,
				endPercent = percentScale(max) ?? 0,
				fillPercent = percentScale(props.value) ?? 0,
				startAngle = angleScale(startPercent) ?? 0,
				endAngle = angleScale(endPercent) ?? 0,
				fillAngle = angleScale(fillPercent) ?? 0;

			console.log(`(${startAngle}, ${endAngle}) ${fillAngle}`);

			const getFillTo = () => {
				if (fillAngle < startAngle) {
					return undefined;
				}
				return fillAngle < endAngle ? fillAngle : endAngle;
			};
			const fillTo = getFillTo();
			if (isNumber(fillTo)) {
				const p = (arc()
					.innerRadius(0.65)
					.outerRadius(1)
					.startAngle(startAngle)
					.endAngle(fillTo)
					.cornerRadius(0) as any)();
				return (
					<path key={`fill-section-${i}`} d={p} fill={s.color} opacity="1" />
				);
			}

			return undefined;
		})
		.filter((k) => k);
	const alert = (props.reverseSections ? sections.reverse() : sections).reduce(
		(a, s) => {
			const min = props.reverseSections ? s.max : s.min;

			const startPercent = percentScale(min) ?? 0,
				fillPercent = percentScale(props.value) ?? 0,
				startAngle = angleScale(startPercent) ?? 0,
				fillAngle = angleScale(fillPercent) ?? 0;

			if (startAngle < fillAngle) {
				return s.type;
			}

			return a;
		},
		"ok"
	);
	return (
		<div className={style.root}>
			<svg
				width={`${size}em`}
				viewBox={[-1, -1, 2, 1].join(" ")}
				className={style.svg}
			>
				<defs>
					<linearGradient
						id="Gauge__gradient"
						gradientUnits="userSpaceOnUse"
						x1="-1"
						x2="1"
						y2="0"
					>
						{gradientSteps.map((color, index) => (
							<stop
								key={color}
								stopColor={`${color}`}
								offset={`${index / (gradientSteps.length - 1)}`}
							/>
						))}
					</linearGradient>
				</defs>
				{fills}
				{paths}
				<line y1="-1" y2="-0.65" stroke="white" strokeWidth="0.027" />

				<path
					fill="#333333"
					stroke="#333333"
					strokeDasharray="1.7976931348623157e+308"
					vectorEffect="non-scaling-stroke"
					d="M -0.1 .1 L 0 -.9 L 0.1 .1 L -0.1 .1 Z"
					strokeMiterlimit="10"
					strokeWidth="1"
					transform={`rotate(${angle * (180 / Math.PI)})`}
				/>
			</svg>
			<div
				className={style.value}
				style={{ fontSize: `${fontScale(size) ?? 1}em` }}
			>
				{`${format(",")(props.value)}${props.units}`}
				{alert === "ok" ? undefined : (
					<WarningIcon
						style={{ color: alert === "alert" ? "red" : "#ffbf00" }}
					></WarningIcon>
				)}
			</div>

			<div
				className={style.label}
				style={{ fontSize: `${(fontScale(size) ?? 1) / 2}em` }}
			>
				{props.label}
			</div>
		</div>
	);
};
