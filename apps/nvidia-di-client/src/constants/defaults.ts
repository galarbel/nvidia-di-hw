import dayjs from "dayjs";

const defaultDaysToSubtract = 7;

export const DEFAULT_START_DATE = dayjs().subtract(defaultDaysToSubtract, "days");
export const DEFAULT_END_DATE = dayjs();
