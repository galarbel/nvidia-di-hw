import { Select } from "antd";
import { FC } from "react";
import { useSearchContext } from "../../contexts/SearchContext";
import useGetTestTypes, { DEFAULT_TEST_TYPES } from "../../hooks/useGetTestTypes";
import { stringArrayToSelectOptions } from "../../utils/utils";


const TypeFilter: FC = () => {
  const searchContext = useSearchContext();
  const { type, setType } = searchContext;

  const [isLoading, error, testTypes] = useGetTestTypes();

  const onSelect = (newType: string) => { setType(newType); };
  const testTypeOptions = stringArrayToSelectOptions(error ? DEFAULT_TEST_TYPES : testTypes);

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
