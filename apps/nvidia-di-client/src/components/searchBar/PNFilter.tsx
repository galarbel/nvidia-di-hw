import { Select } from "antd";
import { FC, useEffect } from "react";
import { useSearchContext } from "../../contexts/SearchContext";
import { stringArrayToSelectOptions } from "../../utils/utils";
import useGetPNs from "../../hooks/useGetPNs";
import { DEFAULT_PN_OPTIONS } from "../../constants/options";


const PNFilter: FC = () => {
  const searchContext = useSearchContext();
  const { pnName, setPNName } = searchContext;

  const [isLoading, error, PNs] = useGetPNs();

  useEffect(() => {
    error && console.error("Failed fetching PNs, defaulting to a closed list");
  }, [error]);

  const onSelect = (newPN: string) => { setPNName(newPN); };
  const pnOptions = stringArrayToSelectOptions(error ? DEFAULT_PN_OPTIONS : PNs);

  return (
    <Select
      allowClear
      onClear={() => onSelect("")}
      placeholder="PN"
      value={pnName || undefined}
      onSelect={onSelect}
      style={{ width: 140 }}
      options={pnOptions}
      disabled={isLoading}
    />
  );
};

export default PNFilter;
