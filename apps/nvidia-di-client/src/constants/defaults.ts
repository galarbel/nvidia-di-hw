import dayjs from "dayjs";

const DATE_WITH_DATA_IN_DB = "2023-04-01";
const DEFAULT_DAYS_TO_SHOW = 7;

export const DEFAULT_START_DATE = dayjs(DATE_WITH_DATA_IN_DB);
export const DEFAULT_END_DATE = DEFAULT_START_DATE.add(DEFAULT_DAYS_TO_SHOW, "days");
