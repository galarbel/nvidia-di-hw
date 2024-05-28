import { Dayjs } from "dayjs";

const searchService = async (dates: Dayjs[], pnName?: string, testType?: string): Promise<unknown[]> => {
  // Replace with actual API call
  const apiUrl = new URL(`${import.meta.env.VITE_API_URL}/mnf/`);
  apiUrl.searchParams.append("startDate", dates[0].format("YYYY-MM-DD"));
  apiUrl.searchParams.append("endDate", dates[1].format("YYYY-MM-DD"));

  pnName?.trim() && apiUrl.searchParams.append("pnName", pnName);
  testType?.trim() && apiUrl.searchParams.append("testType", testType);

  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
};


export default searchService;
