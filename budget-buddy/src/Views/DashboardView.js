import React, { useState, useEffect } from "react";
import { Button, Typography, makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    fontFamily: "BlinkMacSystemFont",
  },
  displayCenter: {
    display: "flex",
    justifyContent: "center",
  },
  dashboard: {
    marginTop: "20px",
    fontSize: "60px",
  },
  buttons: {
    borderRadius: "100px",
    marginLeft: "10px",
  },
});

function DashboardView() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState("");
  const [transactions, setTransactions] = useState([]);

  const [noTransactionsFlag, setNoTransactionsFlag] = useState(true);

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

  useEffect(() => {
    if (window.sessionStorage.getItem("currentUser") === null) {
      navigate("/login");
    } else {
      setCurrentUser(window.sessionStorage.getItem("currentUser"));

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: currentUser,
        }),
      };

      fetch("/api/user/get-transactions", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            setNoTransactionsFlag(false);
            setTransactions(data.data);
          } else {
            setNoTransactionsFlag(true);
          }
        });
    }
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.displayCenter}>
        <Typography className={classes.dashboard}>Dashboard</Typography>
      </div>

      <div className={classes.displayCenter}>
        <Button
          className={classes.buttons}
          variant="outlined"
          onClick={handleAddTransactionButtonPressed}
        >
          Add transaction
        </Button>

        <Button
          className={classes.buttons}
          variant="outlined"
          onClick={handleUserSettingsButtonPressed}
        >
          User Settings
        </Button>

        <Button
          className={classes.buttons}
          variant="outlined"
          onClick={handleSignOutButtonPressed}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}

export default DashboardView;
