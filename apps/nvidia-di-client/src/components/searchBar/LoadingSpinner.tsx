import { css } from "@emotion/react";
import { Spin } from "antd";
import { FC } from "react";

export type TLoadingSpinnerProps = {
  isLoading: boolean,
};

const rootStyle = css`

`;

const LoadingSpinner: FC<TLoadingSpinnerProps> = ({ isLoading }) => (
  <div css={rootStyle}>
    {isLoading && <Spin />}
  </div>
);

export default LoadingSpinner;
