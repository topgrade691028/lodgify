import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";

export const useDataFetching = (endpoint) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("idle");

  const fetchData = async () => {
    try {
      setStatus("loading");
      const res = await axiosInstance.get(endpoint);
      setData(res.data);
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    if (!endpoint) return;
    fetchData();
  }, []);

  return { data, status, setData };
};
