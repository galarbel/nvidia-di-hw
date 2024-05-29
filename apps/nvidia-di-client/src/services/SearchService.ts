import { TAPIRepsonseMnfReport } from "@nvidia-di/interfaces";
import { Dayjs } from "dayjs";

const MAIN_API = import.meta.env.VITE_API_URL

export const searchService = async (granularity: string, dates: Dayjs[], pnName?: string, testType?: string): Promise<TAPIRepsonseMnfReport> => {
  // Replace with actual API call
  const apiUrl = new URL(`${MAIN_API}/mnf/`);
  apiUrl.searchParams.append("granularity", granularity);
  apiUrl.searchParams.append("startDate", dates[0].format("YYYY-MM-DD"));
  apiUrl.searchParams.append("endDate", dates[1].format("YYYY-MM-DD"));

  pnName?.trim() && apiUrl.searchParams.append("pnName", pnName);
  testType?.trim() && apiUrl.searchParams.append("testType", testType);

  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
};

export const getAllTestTypes = async () => {
  const apiUrl = new URL(`${MAIN_API}/mnf/test-types`);
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
};

export const getRawDataDownloadLink = (dates: Dayjs[], pnName?: string, testType?: string) => {
  const apiUrl = new URL(`${MAIN_API}/mnf/raw`);
  apiUrl.searchParams.append("startDate", dates[0].format("YYYY-MM-DD"));
  apiUrl.searchParams.append("endDate", dates[1].format("YYYY-MM-DD"));
  pnName?.trim() && apiUrl.searchParams.append("pnName", pnName);
  testType?.trim() && apiUrl.searchParams.append("testType", testType);

  return apiUrl.toString();
}

