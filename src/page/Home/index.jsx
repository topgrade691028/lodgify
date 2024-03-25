import React, { useMemo } from "react";
import { Typography, Box } from "@mui/material";
import GroupedTask from "../../components/GroupedTask";
import { useDataFetching } from "../../hooks/useDataFetching";
import LinearProgressBar from "../../components/LinearProgressBar";
import { ENDPOINT } from "../../constants/common";

const Home = () => {
  const { data, setData, status } = useDataFetching(ENDPOINT);
  const calculateProgress = useMemo(() => {
    let totalValue = 0;
    let inProgressValue = 0;

    data.forEach((group) => {
      group.tasks.forEach((task) => {
        totalValue += task.value;
        if (task.checked) {
          inProgressValue += task.value;
        }
      });
    });

    return totalValue !== 0
      ? Math.round((inProgressValue / totalValue) * 100)
      : 0;
  }, [data]);

  const handleCheckTask = (gIndex, tIndex) => {
    const updatedData = [...data];
    updatedData[gIndex].tasks[tIndex].checked =
      !updatedData[gIndex].tasks[tIndex].checked;
    setData(updatedData);
  };

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: "#eeeeee",
        minHeight: "100vh",
        py: "40px",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          maxWidth: 820,
          mx: "auto",
          my: 5,
          border: "solid 1px #CCCCCC",
          borderRadius: 1,
          p: 2,
          backgroundColor: "white",
        }}
      >
        <Box sx={{ px: 3, py: 4 }}>
          <Typography
            component="h2"
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 700,
              fontSize: 24,
              lineHeight: "32px",
            }}
          >
            Lodgify Grouped Tasks
          </Typography>

          <LinearProgressBar value={calculateProgress} />
        </Box>
        <Box
          component="section"
          aria-labelledby="grouped-tasks-heading"
          sx={{
            border: "solid 1px #CCCCCC",
            borderRadius: 1,
          }}
        >
          {data?.length !== 0 ? (
            data.map((group, index) => (
              <GroupedTask
                key={`${index}-${group.name}`}
                group={group}
                handleCheckTask={handleCheckTask}
                gIndex={index}
              />
            ))
          ) : (
            <Typography
              sx={{
                color: "#999999",
                fontStyle: "italic",
                textAlign: "center",
                py: 1,
              }}
            >
              {status === "loading"
                ? "Loading..."
                : status === "error"
                ? "Something went Wrong"
                : "No Tasks"}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
