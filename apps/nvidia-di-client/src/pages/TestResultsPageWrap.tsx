import { FC } from "react";
import { SearchContextProvider } from "../contexts/SearchContext";
import TestResultsPage from "./TestResultsPage";


const TestResultsPageWrap: FC = () => (
  <SearchContextProvider>
    <TestResultsPage />
  </SearchContextProvider>
);

export default TestResultsPageWrap;
