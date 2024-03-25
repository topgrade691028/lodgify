import React from "react";
import { FormControlLabel, Checkbox, Box } from "@mui/material";

const Task = ({ task, handleCheck }) => {
  return (
    <Box sx={{ p: 2 }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={task.checked}
            onChange={handleCheck}
            sx={{
              color: "#999999",
              "&.Mui-checked": {
                color: "primary.main",
              },
              boxSizing: "30px",
              "& .MuiSvgIcon-root": { fontSize: 16 },
            }}
          />
        }
        label={task.description}
      />
    </Box>
  );
};

export default Task;
