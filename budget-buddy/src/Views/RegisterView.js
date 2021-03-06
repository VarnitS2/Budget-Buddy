import React, { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  Link,
  Collapse,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import useStyles from "../style";

function RegisterView() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [errorFlag, setErrorFlag] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRePasswordChange = (e) => {
    setRePassword(e.target.value);
  };

  const clearFields = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setRePassword("");
  }

  const handleSignUpButtonPressed = () => {
    if (password !== rePassword) {
      setErrorMsg("Passwords don't match");
      setErrorFlag(true);
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    };

    fetch("/api/register", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          window.sessionStorage.setItem('currentUser', email);
          clearFields();
          navigate("/dashboard");
        } else {
          setErrorMsg(data.message);
          setErrorFlag(true);
        }
      });
  };

  return (
    <div className={classes.root}>
      <div className={classes.displayCenter}>
        <div className={classes.displayColumn}>
          <Collapse className={classes.registerView_alertContainer} in={errorFlag}>
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

          <Typography className={classes.registerView_signUpText}>
            Create a new account
          </Typography>

          <div className={classes.displayCenter}>
            <TextField
              className={classes.textFieldItemOne}
              label="Username"
              variant="outlined"
              onChange={handleUsernameChange}
            />
          </div>
          <div className={classes.displayCenter}>
            <TextField
              className={classes.textFieldItemTwo}
              label="Email"
              variant="outlined"
              onChange={handleEmailChange}
            />
          </div>
          <div className={classes.displayCenter}>
            <TextField
              className={classes.textFieldItemTwo}
              label="Password"
              type="password"
              variant="outlined"
              onChange={handlePasswordChange}
            />
          </div>
          <div className={classes.displayCenter}>
            <TextField
              className={classes.textFieldItemTwo}
              label="Re-enter Password"
              type="password"
              variant="outlined"
              onChange={handleRePasswordChange}
            />
          </div>

          <div className={classes.displayCenter}>
            <Button
              className={classes.registerView_signUpButton}
              variant="outlined"
              onClick={handleSignUpButtonPressed}
            >
              Sign Up
            </Button>
          </div>

          <div className={classes.displayCenter}>
            <Typography className={classes.registerView_bottomText}>
              Already have an account? Login
            </Typography>

            <Link
              className={classes.registerView_linkContainer}
              href="/login"
              color="inherit"
              underline="none"
            >
              here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterView;
