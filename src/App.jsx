import React, { useState, useEffect } from "react";
import "./App.css";
import UserInput from "./components/UserInput";
import Leaderboard from "./components/Leaderboard";
import UserProfile from "./components/UserProfile"; // Import the new component
import { fetchCodingData } from "./utils/fetchData";

const App = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [filteredLeaderboard, setFilteredLeaderboard] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user
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

  const handleUserSelect = (user) => {
    setSelectedUser(user); // Set the selected user
  };

  const handleCloseProfile = () => {
    setSelectedUser(null); // Clear the selected user
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Competitive Coding Leaderboard</h1>
        <h6>Compare platforms and score their performance</h6>
      </header>
      <main className="App-main">
        <UserInput onSubmit={handleFetchLeaderboard} />

        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-spinner">Loading...</div>}

        <Leaderboard
          data={filteredLeaderboard}
          onUserSelect={handleUserSelect}
        />

        {selectedUser && (
          <UserProfile user={selectedUser} onClose={handleCloseProfile} />
        )}
      </main>
    </div>
  );
};

export default App;
