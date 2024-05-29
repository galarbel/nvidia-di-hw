/* eslint-disable react/jsx-no-constructed-context-values */
import { TAPIRepsonseMnfReport } from "@nvidia-di/interfaces";
import { Dayjs } from "dayjs";
import { FC, PropsWithChildren, createContext, useContext, useState } from "react";
import { DEFAULT_END_DATE, DEFAULT_START_DATE } from "../constants/defaults";
import { TGranularityOptions } from "../constants/types";

type TSearchContext = {
  granularity: TGranularityOptions,
  setGranularity: (frequency: TGranularityOptions) => void,
  dates?: [Dayjs, Dayjs],
  pnName?: string,
  type?: string,
  setDates: (dates: [Dayjs, Dayjs]) => void,
  setPNName: (pnName: string) => void,
  setType: (type: string) => void,
  results: TAPIRepsonseMnfReport | undefined,
  setResults: (results: TAPIRepsonseMnfReport | undefined) => void;
};

const SearchContext = createContext<TSearchContext | undefined>(undefined);

const SearchContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [dates, setDates] = useState<[Dayjs, Dayjs]>([DEFAULT_START_DATE, DEFAULT_END_DATE]);
  const [granularity, setGranularity] = useState<TGranularityOptions>("d");
  const [pnName, setPNName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [results, setResults] = useState<TAPIRepsonseMnfReport | undefined>([]);

  return (
    <SearchContext.Provider value={{
      granularity,
      setGranularity,
      dates,
      setDates,
      pnName,
      setPNName,
      type,
      setType,
      results,
      setResults,
    }}
    >
      {children}
    </SearchContext.Provider>
  );
};

const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearchContext must be within SearchContextProvider");
  }

  return context;
};

export { SearchContextProvider, useSearchContext };

