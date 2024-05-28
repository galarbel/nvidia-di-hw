import { useEffect } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import searchService from "../services/SearchService";

const useSearch = () => {
  const { dates, pnName, type, setResults } = useSearchContext();

  useEffect(() => {
    if (dates) {
      searchService(dates, pnName, type).then((data: unknown[]) => { setResults(data); });
    }
  }, [dates, pnName, type, setResults]);
};

export default useSearch;
