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
});

function AddTransactionView() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <Typography className={classes.displayCenter}>Add transaction</Typography>
    </div>
  );
}

export default AddTransactionView;
