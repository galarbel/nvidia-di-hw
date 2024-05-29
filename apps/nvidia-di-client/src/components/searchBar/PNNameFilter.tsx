import { css } from "@emotion/react";
import { Input } from "antd";
import { ChangeEvent, FC } from "react";
import { useSearchContext } from "../../contexts/SearchContext";

const rootStyle = css`
  width: 20vw;
`;

const PNNameFilter: FC = () => {
  const searchContext = useSearchContext();
  const { pnName, setPNName } = searchContext;

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => { setPNName(e.target.value); };


  return (
    <Input css={rootStyle} value={pnName} placeholder="PN name" onChange={onInputChange} />
  );
};

export default PNNameFilter;
