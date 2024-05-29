import { css } from "@emotion/react";
import { Spin } from "antd";
import { FC } from "react";
import { useSearchContext } from "../../contexts/SearchContext";


const rootStyle = css`

`;

const LoadingSpinner: FC = (props) => {
  const { results } = useSearchContext();

  return (
    <div css={rootStyle}>
      {!results && <Spin />}
    </div>
  );
};

export default LoadingSpinner;
