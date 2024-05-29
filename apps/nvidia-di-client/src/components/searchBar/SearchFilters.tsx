import { css } from "@emotion/react";
import { FC } from "react";
import DateRangeFilter from "./DateRangeFilter";
import GranularityFilter from "./GranularityFilter";
import TypeFilter from "./TypeFilter";
import PNFilter from "./PNFilter";


const rootStyle = css`
  display: flex;
  gap: 12px;
`;

const SearchFilters: FC = () => (
  <div css={rootStyle}>
    <GranularityFilter />
    <DateRangeFilter />
    <PNFilter />
    <TypeFilter />
  </div>
);

export default SearchFilters;
