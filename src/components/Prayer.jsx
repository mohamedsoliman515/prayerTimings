/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { memo } from "react";
const Prayer = ({ name, image, time }) => {
  console.log("Prayer re rendere");
  
  return (
    <>
      <Card sx={{ minWidth: "250px", m: "20px" }}>
        <CardMedia sx={{ height: 140, textAlign: "center" }} image={image} />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {name}
          </Typography>
          <Typography
            variant="h1"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            {time}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default memo(Prayer);
