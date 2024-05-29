import { Line, LineConfig } from "@ant-design/plots";
import { css } from "@emotion/react";
import { TGranularityOptions, TMnfIDItem } from "@nvidia-di/interfaces";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { FC, useMemo } from "react";
import { useSearchContext } from "../../contexts/SearchContext";

dayjs.extend(weekOfYear);


const rootStyle = css`
  min-height: calc(80vh - 200px);

  margin-top: 10px;
  border: 1px solid #cdcdcd;
  border-radius: 6px;

  .partial-info {
    display: block;
    text-align: right;
    padding: 6px;
    font-size: 12px;
  }

  &.no-results {
    display: flex;


    > div {
      flex:1;
      text-align: center;
      align-self: center;
    }
  }
`;

const dataLabelHandlers = {
  h: (item) => `${item.hour}:00`,
  d: (item) => `${item.year}-${item.month}-${item.day}`,
  w: (item) => dayjs().year(item.year).week(item.week).format("YYYY - wo"),
  m: (item) => dayjs().month(item.month).format("MMMM"),
} as Record<TGranularityOptions, (item: TMnfIDItem) => string>;


const YieldChart: FC = () => {
  const { results, granularity } = useSearchContext();

  const data = useMemo(() => results?.map((item) => {
    const value = parseFloat(((item.passTests / item.totalTests) * 100).toFixed(1));
    return {
      date: dataLabelHandlers[granularity]?.(item._id) || "",
      value,
    };
  }) || [], [results]);


  const config = {
    data,
    xField: "date",
    yField: "value",
    point: {
      shapeField: "square",
      sizeField: 3,
    },
    tooltip: {
      title: false,
    },
    style: {
      lineWidth: 1,
    },
    axis: {
      y: { title: "Yield %", labelFormatter: (a: number) => `${a}%` },
    },
  } as LineConfig;

  if (data.length === 0) {
    return (
      <div css={rootStyle} className="no-results">
        <div>No results found for specificed filters.</div>
      </div>
    );
  }

  return (
    <div css={rootStyle}>
      { /* eslint-disable-next-line react/jsx-props-no-spreading */ }
      <Line {...config} />
    </div>
  );
};

export default YieldChart;
