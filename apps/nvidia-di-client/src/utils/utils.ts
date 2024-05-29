import dayjs from "dayjs";

export const stringArrayToSelectOptions = (strArr: string[]) => strArr.map((item) => ({ value: item, label: item }));

// ChatGPT. did not optimize.
export const getWeekDates = (year: number, weekNumber: number) => {
  const firstDayOfYear = new Date(year, 0, 1); // January 1st of the year
  const dayOfWeek = firstDayOfYear.getDay(); // Day of the week (0 = Sunday, 1 = Monday, etc.)

  // Calculate the offset to the first Monday
  const firstMonday = new Date(year, 0, 1 + (dayOfWeek === 0 ? 1 : 7 - dayOfWeek + 1));

  // Calculate the start and end dates of the desired week
  const weekStart = new Date(firstMonday);
  weekStart.setDate(weekStart.getDate() + (weekNumber - 1) * 7);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6); // Add 6 days to get the end of the week

  return {
    startDate: dayjs(weekStart).format("YYYY-MM-DD"),
    endDate: dayjs(weekEnd).format("YYYY-MM-DD"),
  };
};
