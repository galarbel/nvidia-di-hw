import { Line, LineConfig } from "@ant-design/plots";
import { css } from "@emotion/react";
import { FC } from "react";
import { useSearchContext } from "../../contexts/SearchContext";

const rootStyle = css`

`;

const YieldChart: FC = (props) => {
  const { results } = useSearchContext();

  // @ts-expect-error TODO...
  // eslint-disable-next-line no-underscore-dangle
  const data = results.map((item) => ({ date: item._id, value: ((item.passCount / item.totalCount) * 100).toFixed(1), passes: item.passCount }));

  const config = {
    data,
    xField: "date",
    yField: "value",
    point: {
      shapeField: "square",
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
    axis: {
      y: { title: "Yield %", labelFormatter: (a: number) => `${a}%` },
    },
  } as LineConfig;

  return (
    <div css={rootStyle}>
      { /* eslint-disable-next-line react/jsx-props-no-spreading */ }
      <Line {...config} />
    </div>
  );
};

export default YieldChart;
