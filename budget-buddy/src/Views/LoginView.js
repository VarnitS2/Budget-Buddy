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

function LoginView() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorFlag, setErrorFlag] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const clearFields = () => {
    setEmail("");
    setPassword("");
  }

  const handleLoginButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    fetch("/api/login", requestOptions)
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
  }

  return (
    <div className={classes.root}>
      <div className={classes.displayCenter}>
        <div className={classes.displayColumn}>
          <Collapse className={classes.loginView_alertContainer} in={errorFlag}>
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

          <Typography className={classes.loginView_loginText}>
            Login to your account
          </Typography>

          <div className={classes.displayCenter}>
            <TextField
              className={classes.textFieldItemOne}
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
            <Button
              className={classes.loginView_loginButton}
              variant="outlined"
              onClick={handleLoginButtonPressed}
            >
              Login
            </Button>
          </div>

          <div className={classes.displayCenter}>
            <Typography className={classes.loginView_bottomText}>
              Don't have an account? Sign up
            </Typography>

            <Link
              className={classes.loginView_linkContainer}
              href="/register"
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

export default LoginView;
