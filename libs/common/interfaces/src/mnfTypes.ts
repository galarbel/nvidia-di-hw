import { TGranularityOptions } from "./options";

export type TMnfIDItem = {
  week: number;
  hour: number;
  year: number;
  month: number;
  day: number;
};

export type TAPIRepsonseMnfReport = {
  _id: TMnfIDItem,
  totalTests: number,
  passTests: number
}[];

export type TAPIRequestQueryParams = {
  startDate?: string,
  endDate?: string,
  pnName?: string,
  testType?: string,
  granularity?: TGranularityOptions
};
