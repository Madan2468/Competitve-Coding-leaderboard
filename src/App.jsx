import React, { useState, useEffect } from "react";
import "./App.css";
import UserInput from "./components/UserInput";
import Leaderboard from "./components/Leaderboard";
import { fetchCodingData } from "./utils/fetchData";

const App = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [filteredLeaderboard, setFilteredLeaderboard] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (leaderboard.length > 0) {
      setFilteredLeaderboard(
        leaderboard.filter((student) =>
          student.enrollmentNumber?.includes(enrollmentNumber)
        )
      );
    }
  }, [leaderboard, enrollmentNumber]);

  const handleFetchLeaderboard = async (usernames) => {
    setLoading(true);
    try {
      setError(null);
      const data = await fetchCodingData(usernames);
      if (Array.isArray(data)) {
        setLeaderboard(data);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
      setError("Failed to fetch leaderboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>JIIT Competitive Coding Leaderboard</h1>
      </header>
      <main className="App-main">
        <UserInput onSubmit={handleFetchLeaderboard} />

        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-spinner">Loading...</div>}

        <Leaderboard data={filteredLeaderboard} />
      </main>
    </div>
  );
};

export default App;
