import { TAPIRepsonseMnfReport } from "@nvidia-di/interfaces";
import { useEffect, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { searchService } from "../services/SearchService";

const useSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const { granularity, dates, pnName, type, setResults } = useSearchContext();

  const doSearch = async () => {
    dates && searchService(granularity, dates, pnName, type).then((data: TAPIRepsonseMnfReport) => { setResults(data); });
  };

  useEffect(() => {
    if (dates) {
      setResults(undefined);
      doSearch();
    }
  }, [granularity, dates, pnName, type, setResults]);

  return [isLoading, error];
};

export default useSearch;
