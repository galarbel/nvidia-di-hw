import { css } from "@emotion/react";
import { FC } from "react";
import LoadingSpinner from "../components/searchBar/LoadingSpinner";
import SearchFilters from "../components/searchBar/SearchFilters";
import DownloadRawButton from "../components/searchResults/DownloadRawButton";
import YieldChart from "../components/searchResults/YieldChart";
import useSearch from "../hooks/useSearch";

const rootStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;

  > div:first-of-type {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const TestResultsPage: FC = () => {
  const [isLoading] = useSearch();

  return (
    <div css={rootStyle}>
      <div>
        <SearchFilters />
        <LoadingSpinner isLoading={isLoading as boolean} />
      </div>
      <YieldChart />
      <DownloadRawButton />
    </div>
  );
};

export default TestResultsPage;
