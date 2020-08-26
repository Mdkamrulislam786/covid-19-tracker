import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

const InfoBox = ({ title, cases, total }) => {
  return (
    <div>
      <Card className="infoBox">
        <CardContent>
          {/* title */}
          <Typography className="infobox__title" color="textSecondary">
            {title}
          </Typography>

          {/* casses */}
          <h2 className="infoBox__cases">{cases}</h2>
          {/* total */}
          <Typography className="infobox__total" color="textSecondary">
            {total} Total
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoBox;
