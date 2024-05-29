import { Line, LineConfig } from "@ant-design/plots";
import { css } from "@emotion/react";
import { TMnfIDItem } from "@nvidia-di/interfaces";
import { Dayjs } from "dayjs";
import { FC } from "react";
import { TGranularityOptions } from "../../constants/types";
import { useSearchContext } from "../../contexts/SearchContext";
import { getWeekDates } from "../../utils/utils";


const rootStyle = css`
  margin-top: 10px;
  border: 1px solid #cdcdcd;
  border-radius: 6px;

  .partial-info {
    display: block;
    text-align: right;
    padding: 6px;
    font-size: 12px;
  }
`;

const dataLabelHandlers = {
  h: (item) => `${item.hour}:00`,
  d: (item) => `${item.year}-${item.month}-${item.day}`,
  w: (item) => {
    const weekDates = getWeekDates(item.year, item.week);
    return `${weekDates.startDate} -> ${weekDates.endDate}`;
  },
  m: (item) => `${item.year}-${item.month}`,
} as Record<TGranularityOptions, (item: TMnfIDItem) => string>;

// add * to labels with partial data
const markPartialDates = (dates: [Dayjs, Dayjs] | undefined, granularity: string, firstDataItem: { date: string; value: string; }, lastDataItem: { date: string; value: string; }) => {
  let hasPartialDates = false;
  if (!dates) {
    return hasPartialDates;
  }
  const [startDate, endDate] = dates;
  
  if (granularity === "m") {
    if (startDate.date() > 1) {
      firstDataItem.date += "*";
      hasPartialDates = true;
    }
    if (endDate.date() < endDate.daysInMonth()) {
      lastDataItem.date += "*";
      hasPartialDates = true;
    }
  }
  if (granularity === "w") {
    // TODO. need to check if startDate smaller than first part of firstDataItem, and vice versa for endDate
  }
  return hasPartialDates;
}

const YieldChart: FC = () => {
  const { results, granularity, dates } = useSearchContext();

  const data = results?.map((item) => (
    { 
      date: dataLabelHandlers[granularity]?.(item._id) || "", 
      value: ((item.passTests / item.totalTests) * 100).toFixed(1) }
  )) || [];

  const hasPartialDates = (data?.[0] && markPartialDates(dates, granularity, data[0], data[data.length - 1]));

  const config = {
    data,
    xField: "date",
    yField: "value",
    point: {
      shapeField: "square",
      sizeField: 3,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 1,
    },
    axis: {
      y: { title: "Yield %", labelFormatter: (a: number) => `${a}%` },
    },
  } as LineConfig;

  return (
    <div css={rootStyle}>
      { /* eslint-disable-next-line react/jsx-props-no-spreading. this is a bad key. but seems to be an issue with the canvas. */ }
      <Line {...config} key={granularity} />
      <i className="partial-info" style={{ visibility: hasPartialDates ? "visible": "hidden"}}>* - partial data</i>
    </div>
  );
};

export default YieldChart;
