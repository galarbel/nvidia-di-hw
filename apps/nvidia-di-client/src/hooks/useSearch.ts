import { useEffect } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import searchService from "../services/SearchService";

const useSearch = () => {
  const { dates, setResults } = useSearchContext();

  useEffect(() => {
    if (dates) {
      searchService(dates).then((data: unknown[]) => setResults(data));
    }
  }, [dates, setResults]);
};

export default useSearch;
