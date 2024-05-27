import { css } from "@emotion/react";
import { FC } from "react";
import SearchFilters from "../components/searchBar/SearchFilters";
import useSearch from "../hooks/useSearch";

const rootStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;

const TestResultsPage: FC = () => {
  useSearch();

  return (
    <div css={rootStyle}>
      <SearchFilters />
      <div>chart</div>
    </div>
  );
};

export default TestResultsPage;
