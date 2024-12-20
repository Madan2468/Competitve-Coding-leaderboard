import React, { useState, useEffect } from "react";
import Leaderboard from "./Leaderboard";
import { fetchLeaderboardData } from "./fetchData"; // A mock function to fetch data

const ParentComponent = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLeaderboardData(); // Fetching data from some API
        setLeaderboardData(data);
      } catch (error) {
        console.error("Error fetching leaderboard data", error);
      }
    };
    fetchData();
  }, []);

  return <Leaderboard data={leaderboardData} />;
};

export default ParentComponent;
