import { Line } from "@ant-design/plots";
import { css } from "@emotion/react";
import { FC } from "react";
import { useSearchContext } from "../../contexts/SearchContext";

const rootStyle = css`

`;

const YieldChart: FC = (props) => {
  const { results } = useSearchContext();

  const data = [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 },
  ];

  const config = {
    data,
    xField: "year",
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
  };

  return (
    <div css={rootStyle}>
      { /* eslint-disable-next-line react/jsx-props-no-spreading */ }
      <Line {...config} />
    </div>
  );
};

export default YieldChart;
