import { Select } from "antd";
import { FC, useEffect } from "react";
import { useSearchContext } from "../../contexts/SearchContext";
import useGetTestTypes from "../../hooks/useGetTestTypes";
import { stringArrayToSelectOptions } from "../../utils/utils";
import { DEFAULT_TEST_TYPES_OPTIONS } from "../../constants/options";


const TypeFilter: FC = () => {
  const searchContext = useSearchContext();
  const { type, setType } = searchContext;

  const [isLoading, error, testTypes] = useGetTestTypes();

  useEffect(() => {
    error && console.error("Failed fetching test types, defaulting to a closed list");
  }, [error]);

  const onSelect = (newType: string) => { setType(newType); };
  const testTypeOptions = stringArrayToSelectOptions(error ? DEFAULT_TEST_TYPES_OPTIONS : testTypes);

  return (
    <Select
      allowClear
      onClear={() => onSelect("")}
      placeholder="Test Type"
      value={type || undefined}
      onSelect={onSelect}
      style={{ width: 140 }}
      options={testTypeOptions}
      disabled={isLoading}
    />
  );
};

export default TypeFilter;
