import React, { useState, useEffect } from "react";
import "./App.css";
import UserInput from "./components/UserInput";
import Leaderboard from "./components/Leaderboard";
import { fetchCodingData } from "./utils/fetchData";

const App = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [filteredLeaderboard, setFilteredLeaderboard] = useState([]);

  useEffect(() => {
    // Fetch data whenever leaderboard changes
    setFilteredLeaderboard(
      leaderboard.filter((student) =>
        student.enrollmentNumber.includes(enrollmentNumber)
      )
    );
  }, [leaderboard, enrollmentNumber]);

  const handleFetchLeaderboard = async (usernames) => {
    const data = await fetchCodingData(usernames);
    setLeaderboard(data);
  };

  return (
    <div className="App">
      <h1>JIIT Competitive Coding Leaderboard</h1>
      <UserInput onSubmit={handleFetchLeaderboard} />
      <Leaderboard data={filteredLeaderboard} />
    </div>
  );
};

export default App;
