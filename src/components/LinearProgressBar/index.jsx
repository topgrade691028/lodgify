import React from "react";
import { Box, Typography } from "@mui/material";
const LinearProgressBar = ({ value }) => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#e6fdf9",
        height: 24,
        borderRadius: "24px",
        transition: "all 0.1s",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label="Whole Tasks Progress"
      aria-busy="true"
      aria-describedby="whole-tasks-progress"
    >
      <Box
        sx={{
          transition: "all 0.25s",
          width: `${value}%`,
          backgroundColor: "primary.main",
          opacity: "100%",
          height: "100%",
          borderRadius: "24px",
          pr: value === 0 ? 0 : 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: 16,
            lineHeight: "20px",
            textAlign: "right",
            width: "100%",
            color: value === 0 ? "primary.main" : "white",
            fontWeight: 500,
            ml: 2,
          }}
        >
          {value}%
        </Typography>
      </Box>
    </Box>
  );
};

export default LinearProgressBar;
