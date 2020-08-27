import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox({ title, cases, total, active, isRed, darkMode, ...props }) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      } ${darkMode && "infoBox--dark"}`}
    >
      <CardContent>
        <Typography
          className={`infoBox__total ${darkMode && "infoBox__total--dark"}`}
          color="textSecondary"
          gutterBottom
        >
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
          {cases}
        </h2>

        <Typography
          className={`infoBox__total ${darkMode && "infoBox__total--dark"}`}
          color="textSecondary"
        >
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
