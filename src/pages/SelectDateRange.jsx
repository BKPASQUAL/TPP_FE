import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";

function SelectDateRange() {
  return (
    <div className="datarange-main">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateRangeCalendar />
      </LocalizationProvider>
      zvdczcdscs
    </div>
  );
}

export default SelectDateRange;
