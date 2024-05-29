import dayjs, { Dayjs } from "dayjs";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import { searchService } from "../services/SearchService";

const useSearch = () => {
  const { granularity, dates, pnName, type, setResults } = useSearchContext();

  const [startDate, endDate] = dates || [dayjs(), dayjs()]; // help typescript with default values

  const { isLoading, error, data } = useQuery(
    ["search", granularity, pnName, type, startDate.toString(), endDate.toString()],
    () => searchService(granularity, dates as [Dayjs, Dayjs], pnName, type),
    {
      enabled: !!dates, // Only run the query if dates is not undefined
      onError: (e: Error) => {
        // eslint-disable-next-line no-alert
        alert(`There was a problem fetching data from the server. \n\nerror: ${e.message}`);
      },
    },
  );

  // accidently misused how we use data. this is a workaround. can be optimized.
  useEffect(() => {
    data && setResults(data);
  }, [data]);

  return [isLoading, error];
};

export default useSearch;
