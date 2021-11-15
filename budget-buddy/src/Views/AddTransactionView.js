import React, { useState, useEffect } from "react";
import { Button, Typography, makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import useStyles from "../style";

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
