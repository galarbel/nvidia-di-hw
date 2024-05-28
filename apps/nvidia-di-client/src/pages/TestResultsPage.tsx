import { css } from "@emotion/react";
import { FC } from "react";
import CommonButton from "../components/common/Button";
import SearchFilters from "../components/searchBar/SearchFilters";
import YieldChart from "../components/searchResults/YieldChart";
import useSearch from "../hooks/useSearch";

const rootStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;

  > .download-raw-btn-wrap {
    text-align: right;
    padding-right: 40px;
  }
`;

const TestResultsPage: FC = () => {
  useSearch();

  return (
    <div css={rootStyle}>
      <SearchFilters />
      <YieldChart />
      <div className="download-raw-btn-wrap">
        <CommonButton>Download raw data</CommonButton>
      </div>
    </div>
  );
};

export default TestResultsPage;
