import React, { useState, useEffect } from "react";
import { Button, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import useStyles from "../style";
import DateRangePicker from "../components/DateRangePicker";
import BalanceLineChart from "../components/BalanceLineChart";
import BalanceProgressBar from "../components/BalanceProgressBar";

function DashboardView() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState("");
  const [dates, setDates] = useState([null, null]);
  const [lineChartData, setLineChartData] = useState([]);
  const [paycheckPercent, setPaycheckPercent] = useState(100);

  useEffect(async () => {
    if (window.sessionStorage.getItem("currentUser") === null) {
      navigate("/login");
    } else {
      setCurrentUser(window.sessionStorage.getItem("currentUser"));

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: window.sessionStorage.getItem("currentUser"),
          start_date: "2020-12-31T",
          end_date: "2021-12-31T",
        }),
      };

      await fetch("/api/user/transaction/dates", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setLineChartData(data.message);
        });

      const requestOptionsTwo = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: window.sessionStorage.getItem("currentUser"),
        }),
      };

      await fetch("api/user/paycheck/percent", requestOptionsTwo)
        .then((response) => response.json())
        .then((data) => {
          setPaycheckPercent(data.message);
        });
    }
  }, []);

  const handleAddTransactionButtonPressed = () => {
    navigate("/add-transaction");
  };

  const handleUserSettingsButtonPressed = () => {
    navigate("/user-settings");
  };

  const handleSignOutButtonPressed = () => {
    window.sessionStorage.removeItem("currentUser");
    navigate("/");
  };

  const datesChangeCallback = (newDates) => {
    setDates(newDates);
  };

  const handleFetchDatesButtonPressed = async () => {
    if (dates[0] === null || dates[1] === null) {
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: currentUser,
        start_date: dates[0],
        end_date: dates[1],
      }),
    };

    await fetch("/api/user/transaction/dates", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setLineChartData(data.message);
      });
  };

  return (
    <div>
      <div className={classes.pad}>
        <div className={classes.dashboardView_topNavBar}>
          <div>
            <Button
              className={classes.dashboardView_buttons__addTransaction}
              variant="outlined"
              onClick={handleAddTransactionButtonPressed}
            >
              Add transaction
            </Button>
          </div>

          <Typography className={classes.dashboardView_title}>
            DASHBOARD
          </Typography>

          <div>
            <Button
              className={classes.dashboardView_buttons__userSettings}
              variant="outlined"
              onClick={handleUserSettingsButtonPressed}
            >
              User Settings
            </Button>

            <Button
              className={classes.dashboardView_buttons__signOut}
              variant="outlined"
              onClick={handleSignOutButtonPressed}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className={classes.dashboardView_midRowContainer}>
        <div className={classes.dashboardView_transactionsContainer}>
          <BalanceLineChart data={lineChartData} />
        </div>

        <div className={classes.dashboardView_dateRangeContainer}>
          <Typography className={classes.dashboardView_dateRangeTitle}>
            FETCH TRANSACTIONS BETWEEN A DATE RANGE
          </Typography>

          <div className={classes.dashboardView_dateRangeInner}>
            <div className={classes.dashboardView_dateRangeInnerInner}>
              <DateRangePicker datesChangeCallback={datesChangeCallback} />
            </div>
          </div>

          <Button
            className={classes.dashboardView_dateRangeFetchButton}
            variant="outlined"
            onClick={handleFetchDatesButtonPressed}
          >
            FETCH
          </Button>
        </div>
      </div>

      <div className={classes.pad}>
        <div className={classes.dashboardView_bottomRowContainer}>
          <div className={classes.displayColumn}>
            <BalanceProgressBar percent={paycheckPercent} />

            <Typography className={classes.dashboardView_lastPaycheckText}>
              LAST PAYCHECK
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardView;
