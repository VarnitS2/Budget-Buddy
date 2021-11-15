import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Collapse,
  TextField,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import useStyles from "../style";

function UserSettingsView() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState("");
  const [deleteAccountFlag, setDeleteAccountFlag] = useState(false);
  const [password, setPassword] = useState("");

  const [errorFlag, setErrorFlag] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (window.sessionStorage.getItem("currentUser") === null) {
      navigate("/login");
    } else {
      setCurrentUser(window.sessionStorage.getItem("currentUser"));
    }
  }, []);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleBackButtonPressed = () => {
    navigate("/dashboard");
  };

  const handleDeleteAccountButtonPressed = () => {
    if (deleteAccountFlag) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: currentUser,
          password: password,
        }),
      };

      fetch("/api/user/delete", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            navigate("/");
          } else {
            setErrorMsg(data.message);
            setErrorFlag(true);
          }
        });
    } else {
      setDeleteAccountFlag(true);
    }
  };

  return (
    <div className={classes.root}>
      <Button
        className={classes.userSettingsView_backButton}
        variant="outlined"
        onClick={handleBackButtonPressed}
      >
        Back
      </Button>
      <div className={classes.displayCenter}>
        <Typography className={classes.userSettingsView_settings}>Settings</Typography>
      </div>

      <div className={classes.displayCenter}>
        <Typography className={classes.userSettingsView_currentUserText}>
          Currently logged in as: {currentUser}
        </Typography>
      </div>

      <div className={classes.displayCenter}>
        <Collapse className={classes.userSettingsView_alertContainer} in={errorFlag}>
          <Alert
            severity="error"
            onClose={() => {
              setErrorMsg("");
              setErrorFlag(false);
            }}
          >
            {errorMsg}
          </Alert>
        </Collapse>
      </div>

      <div className={classes.displayCenter}>
        <Collapse className={classes.userSettingsView_passwordContainer} in={deleteAccountFlag}>
          <Typography>Type in your password:</Typography>
          <TextField
            className={classes.userSettingsView_passwordText}
            label="Password"
            type="password"
            variant="outlined"
            onChange={handlePasswordChange}
          />
        </Collapse>
      </div>

      <div className={classes.displayCenter}>
        <Button
          className={classes.userSettingsView_deleteAccountButton}
          variant="outlined"
          onClick={handleDeleteAccountButtonPressed}
        >
          {deleteAccountFlag ? "Confirm" : "Delete Account"}
        </Button>
      </div>
    </div>
  );
}

export default UserSettingsView;
