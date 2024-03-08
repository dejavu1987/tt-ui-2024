import { Group } from "@visx/group";
import { curveBasis } from "@visx/curve";
import { LinePath } from "@visx/shape";
import { Threshold } from "@visx/threshold";
import { scaleLinear } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { GridRows, GridColumns } from "@visx/grid";
import { LinearGradient } from "@visx/gradient";
import cityTemperature from "@visx/mock-data/lib/mocks/cityTemperature";

// accessors
const date = (d) => d.i;
const pos = (d) => Number(d["positive"]);
const neg = (d) => Number(d["negative"]);

const defaultMargin = { top: 40, right: 30, bottom: 50, left: 40 };

const ThresholdChart = ({
  width,
  height,
  datum,
  axisLabels,
  margin = defaultMargin,
  colorP = "#0f0",
  colorN = "#f66",
}) => {
  if (width < 10) return null;
  console.log(datum);
  // scales
  const timeScale = scaleLinear({
    domain: [0, datum.length - 1],
    nice: true,
  });
  const yScale = scaleLinear({
    domain: [
      0,
      Math.max(...datum.map((x) => Math.max(x.positive, x.negative))),
    ],
    nice: true,
  });

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  timeScale.range([0, xMax]);
  yScale.range([yMax, 0]);

  return (
    <div className="mt-2">
      <svg
        width={width}
        height={height}
        className="w-full h-auto"
        viewBox={`0 0 ${width} ${height}`}
      >
        <LinearGradient from="#0080a0" to="#44B3C2" id="teal" />
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="url(#teal)"
          rx={14}
        />
        <Group left={margin.left} top={margin.top}>
          <GridRows
            opacity={0.5}
            scale={yScale}
            width={xMax}
            height={yMax}
            stroke="#aaa"
          />
          <GridColumns
            opacity={0.5}
            scale={timeScale}
            width={xMax}
            height={yMax}
            stroke="#aaa"
          />
          <line x1={xMax} x2={xMax} y1={0} y2={yMax} stroke="#aaa" />
          <AxisBottom
            top={yMax}
            scale={timeScale}
            tickFormat={(v) => {
              return `${v}`.replace(/\d+\.\d+/, "");
            }}
            numTicks={width > 520 ? 10 : 5}
            tickLabelProps={() => ({
              fill: "#fff",
              fontSize: 11,
              textAnchor: "middle",
            })}
            tickStroke="white"
            stroke="white"
          />
          <AxisLeft
            scale={yScale}
            tickFormat={(v) => {
              return `${v}`.replace(/\d+\.\d+/, "");
            }}
            tickLabelProps={() => ({
              fill: "#fff",
              fontSize: 10,
              textAnchor: "middle",
            })}
            tickStroke="white"
            stroke="white"
          />
          <text x="0" y="25" transform="rotate(90)" fontSize={10} fill="white">
            {`${axisLabels[0]} vs ${axisLabels[1]}`}
          </text>
          <Threshold
            id={`${Math.random()}`}
            data={datum}
            x={(d) => timeScale(date(d)) ?? 0}
            y0={(d) => yScale(pos(d)) ?? 0}
            y1={(d) => yScale(neg(d)) ?? 0}
            clipAboveTo={0}
            clipBelowTo={yMax}
            curve={curveBasis}
            belowAreaProps={{
              fill: colorN,
              fillOpacity: 0.4,
            }}
            aboveAreaProps={{
              fill: colorP,
              fillOpacity: 0.4,
            }}
          />
          <LinePath
            data={cityTemperature}
            curve={curveBasis}
            x={(d) => timeScale(date(d)) ?? 0}
            y={(d) => yScale(neg(d)) ?? 0}
            stroke="#fff"
            strokeWidth={1.5}
            strokeOpacity={0.8}
            strokeDasharray="1,2"
          />
          <LinePath
            data={cityTemperature}
            curve={curveBasis}
            x={(d) => timeScale(date(d)) ?? 0}
            y={(d) => yScale(pos(d)) ?? 0}
            stroke="#fff"
            strokeWidth={1.5}
          />
        </Group>
      </svg>
    </div>
  );
};

export { ThresholdChart as Threshold };
