import * as React from "react";
import TextField from "@mui/material/TextField";
import StaticDateRangePicker from "@mui/lab/StaticDateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";

function DateRangePicker(props) {
  const [dates, setDates] = React.useState([null, null]);

  React.useEffect(() => {
    props.datesChangeCallback(dates);
  }, [dates]);

  return (
    <div style={{ width: "100px" }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDateRangePicker
          displayStaticWrapperAs="mobile"
          value={dates}
          onChange={(newValue) => {
            setDates(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
    </div>
  );
}

export default DateRangePicker;
