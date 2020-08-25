import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";


const InfoBox = ({ title, cases, total }) => {
  return (
    <div>
      <Card>
        <CardContent>
          {/* title */}
          <Typography className="infobox_title" color="textSecondary">
            {title}
          </Typography>

          {/* casses */}
          <h2 className="infobox_cases">{cases}</h2>
          {/* total */}
          <Typography className="infobox_total" color="textSecondary">
            {total} Total
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoBox;
