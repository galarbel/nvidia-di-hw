import { css } from "@emotion/react";
import { FC } from "react";
import { useSearchContext } from "../../contexts/SearchContext";
import { getRawDataDownloadLink } from "../../services/SearchService";
import CommonButton from "../common/Button";

const rootStyle = css`
  text-align: right;
`;


const DownloadRawButton: FC = () => {
  const { dates, pnName, type } = useSearchContext();

  if (!dates) {
    return null;
  }

  const rawDataLink = getRawDataDownloadLink(dates, pnName, type);

  return (
    <div css={rootStyle}>
      <CommonButton>
        <a href={rawDataLink} download="data.csv">Download raw data</a>
      </CommonButton>
    </div>
  );
};

export default DownloadRawButton;
