import { Select } from "antd";
import { FC } from "react";
import { FREQUENCY_OPTIONS } from "../../constants/options";
import { TGranularityOptions } from "../../constants/types";
import { useSearchContext } from "../../contexts/SearchContext";


const GranularityFilter: FC = () => {
  const searchContext = useSearchContext();
  const { granularity, setGranularity, setResults } = searchContext;

  const onSelect = (newGranularity: TGranularityOptions) => {
    setGranularity(newGranularity);
  };

  return (
    <Select
      value={granularity}
      onSelect={onSelect}
      style={{ width: 120 }}
      options={FREQUENCY_OPTIONS}
    />
  );
};

export default GranularityFilter;
