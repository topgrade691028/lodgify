import React, { useState } from "react";
import Task from "../Task";
import { Box, Typography, Collapse } from "@mui/material";
import GroupTaskIcon from "../../assets/icons/group-task.svg";
import MarkedGroupTaskIcon from "../../assets/icons/marked-group-task.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const GroupedTask = ({ group, handleCheckTask, gIndex }) => {
  const isAllChecked = group.tasks.every((task) => task.checked);
  const [isExtended, setIsExtended] = useState(false);
  const handleToggleExtended = () => {
    setIsExtended((prev) => !prev);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      setIsExtended((prev) => !prev);
    } else if (event.key === "ArrowDown") {
      const nextGroupIndex = gIndex + 1;
      const nextGroup = document.querySelector(
        `[data-testid=group-task-${nextGroupIndex}]`
      );
      if (nextGroup) {
        nextGroup.focus();
      }
    } else if (event.key === "ArrowUp") {
      const prevGroupIndex = gIndex - 1;
      const prevGroup = document.querySelector(
        `[data-testid=group-task-${prevGroupIndex}]`
      );
      if (prevGroup) {
        prevGroup.focus();
      }
    }
  };

  return (
    <>
      <Box
        data-testid={`group-task-${gIndex}`}
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
          borderTop: "1px solid #CCCCCC",
          borderWidth: gIndex === 0 ? 0 : 1,
          cursor: "pointer",
        }}
        onKeyDown={handleKeyDown}
        tabIndex="0"
        aria-expanded={isExtended}
        aria-controls={`group-tasks-${gIndex}-content`}
        onClick={handleToggleExtended}
      >
        <img
          src={isAllChecked ? MarkedGroupTaskIcon : GroupTaskIcon}
          alt="group-task-icon"
        />
        <Typography sx={{ color: isAllChecked ? "#02bc9c" : "#333333" }}>
          {group.name}
        </Typography>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Typography
          sx={{ color: "#999999", fontSize: "1rem", lineHeight: 1.5 }}
        >
          {isExtended ? "Hide" : "Show"}
        </Typography>
        <KeyboardArrowDownIcon
          sx={{
            color: "#999999",
            transform: isExtended ? "rotate(-180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        />
      </Box>

      <Collapse
        in={isExtended}
        sx={{
          py: isExtended ? 2 : 0,
          px: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
        data-testid={`group-task-content-${gIndex}`}
      >
        {group.tasks.map((task, tIndex) => (
          <Task
            key={`${tIndex}-${task.description}`}
            task={task}
            handleCheck={() => handleCheckTask(gIndex, tIndex)}
          />
        ))}
      </Collapse>
    </>
  );
};

export default GroupedTask;
