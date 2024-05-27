import { css } from "@emotion/react";
import { DatePicker, Input, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { FC } from "react";
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
        placeholder="Test Type"
        value={type}
        onSelect={onSelect}
        style={{ width: 140 }}
        options={[
          { value: "jack", label: "Jack" },
          { value: "lucy", label: "Lucy" },
          { value: "Yiminghe", label: "yiminghe" },
          { value: "disabled", label: "Disabled", disabled: true },
        ]}
      />
    </div>
  );
};

export default SearchFilters;
