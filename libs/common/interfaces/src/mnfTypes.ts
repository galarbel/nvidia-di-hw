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
