import { TGranularityOptions } from "@nvidia-di/interfaces";
import { DatePicker, DatePickerProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { FC, useEffect } from "react";
import { useSearchContext } from "../../contexts/SearchContext";

const { RangePicker } = DatePicker;
const MAX_DATE = dayjs();

const COMMON_WIDTH_STYLE = { width: 250 };

type TNewDates = [Dayjs, Dayjs];
type TGranularityChangeHandler = (newDates: TNewDates, setDates: (newDates: TNewDates) => void) => void;

const granularityChangeHandlers = {
  h: ([startDate, _], setDates) => { setDates([startDate, startDate.add(1, "day")]); },
  d: ([startDate, endDate], setDates) => {
    const dayDiff = endDate.diff(startDate, "day");
    (dayDiff < 2 || dayDiff > 30) && setDates([startDate, startDate.add(7, "day")]);
  },
  w: ([startDate, endDate], setDates) => {
    const dayDiff = endDate.diff(startDate, "day");
    let newEndDate = endDate;
    dayDiff < 7 && (newEndDate = newEndDate.add(2, "week"));
    dayDiff > 60 && (newEndDate = startDate.add(3, "week"));

    setDates([startDate.startOf("week"), newEndDate.endOf("week")]);
  },
  m: ([startDate, endDate], setDates) => {
    const newEndDate = endDate.diff(startDate, "month") < 2 ? startDate.add(2, "months") : endDate;
    setDates([startDate.startOf("month"), newEndDate.endOf("month")]);
  },
} as Record<TGranularityOptions, TGranularityChangeHandler>;

const pickerLimits = {
  d: 30,
  w: 120,
  m: 365,
};

const pickerTypeByGranularity = {
  w: "week",
  m: "month",
} as Record<TGranularityOptions, "week" | "month">;


const DateRangeFilter: FC = () => {
  const searchContext = useSearchContext();
  const { granularity, dates, setDates } = searchContext;

  const onSingleDateChange = (newDate: Dayjs) => newDate && setDates([newDate, newDate.add(1, "day")]);

  const onDatesChange = (newDates: [Dayjs, Dayjs]) => {
    const [newStartDate, newEndDate] = newDates;
    if (granularity === "w") {
      setDates([newStartDate.startOf("week"), newEndDate.endOf("week")]);
      return;
    }
    if (granularity === "m") {
      setDates([newStartDate.startOf("month"), newEndDate.endOf("month")]);
      return;
    }
    setDates(newDates);
  };

  // when changing granularity, reset the dates
  useEffect(() => {
    dates && granularityChangeHandlers[granularity]?.(dates, setDates);
  }, [granularity]);

  // should not happen. helps typescript.
  if (!dates) { return null; }


  if (granularity === "h") {
    return (
      <DatePicker
        style={COMMON_WIDTH_STYLE}
        value={dates[0]}
        onChange={onSingleDateChange}
        allowClear={false}
      />
    );
  }

  const numDaysLimiter: DatePickerProps["disabledDate"] = (current, { from }) => {
    if (from) {
      return Math.abs(current.diff(from, "days")) >= pickerLimits[granularity];
    }

    return false;
  };

  return (
    <RangePicker
      style={COMMON_WIDTH_STYLE}
      value={dates}
        // @ts-expect-error seems to be an issue with antd and passing onChange funcs in typescript
      onChange={onDatesChange}
      maxDate={MAX_DATE}
      allowClear={false}
      disabledDate={numDaysLimiter}
      picker={pickerTypeByGranularity[granularity] || "date"}
    />
  );
};

export default DateRangeFilter;
