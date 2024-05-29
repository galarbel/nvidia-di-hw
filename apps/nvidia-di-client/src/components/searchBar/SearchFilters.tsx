import { css } from "@emotion/react";
import { FC } from "react";
import DateRangeFilter from "./DateRangeFilter";
import GranularityFilter from "./GranularityFilter";
import PNNameFilter from "./PNNameFilter";
import TypeFilter from "./TypeFilter";


const rootStyle = css`
  display: flex;
  gap: 12px;
`;

const SearchFilters: FC = () => (
  <div css={rootStyle}>
    <GranularityFilter />
    <DateRangeFilter />
    <PNNameFilter />
    <TypeFilter />
  </div>
);

export default SearchFilters;
