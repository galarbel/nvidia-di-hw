import { css } from "@emotion/react";
import { Button } from "antd";
import { FC, ReactNode } from "react";

export type TButtonProps = {
  children: ReactNode,
};

const rootStyle = css`
  background-color: #76b900;
  border: 1px solid #76b900 !important;

  &:hover {
    background-color: #91c733 !important;
  }
`;

const CommonButton: FC<TButtonProps> = (props) => {
  const { children } = props;
  return (
    <Button css={rootStyle}>
      {children}
    </Button>
  );
};

export default CommonButton;
