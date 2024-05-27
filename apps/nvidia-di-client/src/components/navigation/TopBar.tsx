import { css } from "@emotion/react";
import { FC } from "react";
import NvidiaLogo from "../../assets/svgs/nvidia-logo.svg?react";
import { navTitle } from "../../constants/strings";

const rootStyle = css`
  padding: 0 12px;
  border-bottom: 1px solid #ccc;
  display: flex;
  gap: 30px;
  align-items: center;

  > svg {
    height: 44px;
    width: 110px;
  }
`;

const TopBar: FC = () => (
  <nav css={rootStyle}>
    <NvidiaLogo />
    <h3>{navTitle}</h3>
  </nav>
);

export default TopBar;
