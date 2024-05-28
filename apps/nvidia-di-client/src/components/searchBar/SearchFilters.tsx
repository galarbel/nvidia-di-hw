import { css } from "@emotion/react";
import { DatePicker, Input, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { FC } from "react";
import { TEST_TYPE_OPTIONS } from "../../constants/options";
import { useSearchContext } from "../../contexts/SearchContext";

const MAX_DATE = dayjs();
const { RangePicker } = DatePicker;


const rootStyle = css`
  display: flex;
  gap: 12px;

  > input {
    width: 25vw;
  }
`;

const SearchFilters: FC = () => {
  const searchContext = useSearchContext();

  const { dates, setDates, pnName, setPNName, type, setType } = searchContext;

  const onDateChange = (newDates: [Dayjs, Dayjs]) => {
    setDates(newDates);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { setPNName(e.target.value); };
  const onSelect = (newType: string) => { setType(newType); };

  return (
    <div css={rootStyle}>
      <RangePicker
        value={dates}
        // @ts-expect-error seems to be an issue with antd and passing onChange funcs in typescript
        onChange={onDateChange}
        maxDate={MAX_DATE}
      />
      <Input value={pnName} placeholder="PN name" onChange={onInputChange} />
      <Select
        allowClear
        onClear={() => onSelect("")}
        placeholder="Test Type"
        value={type || undefined}
        onSelect={onSelect}
        style={{ width: 140 }}
        options={TEST_TYPE_OPTIONS}
      />
    </div>
  );
};

export default SearchFilters;
