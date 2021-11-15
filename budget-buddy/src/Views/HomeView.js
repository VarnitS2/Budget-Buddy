import React from "react";
import { Button, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import useStyles from "../style";

function HomeView() {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleSignUpButtonPressed = () => {
    navigate("/register");
  };

  return (
    <div className={classes.root}>
      <div className={classes.homeView_topNavBar}>
        <Button
          className={classes.homeView_signUpButton}
          variant="outlined"
          onClick={handleSignUpButtonPressed}
        >
          Sign Up
        </Button>
      </div>

      <div className={classes.homeView_headerColumn}>
        <Typography className={classes.homeView_budgetBuddyHeader}>
          Budget Buddy
        </Typography>

        <Typography className={classes.homeView_budgetBuddyDesc}>
          Your companion on a journey towards smarter spending and budgeting
        </Typography>
      </div>
    </div>
  );
}

export default HomeView;
