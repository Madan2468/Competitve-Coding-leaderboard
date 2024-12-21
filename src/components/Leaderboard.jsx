import React from "react";
import LeaderboardEntry from "./LeaderboardEntry";

const Leaderboard = ({ data, onUserSelect }) => {
  if (!Array.isArray(data)) {
    return (
      <p style={styles.error}>
        Error: Invalid data format. Please provide an array of leaderboard
        entries.
      </p>
    );
  }

  return (
    <div style={styles.leaderboard}>
      <h2 style={styles.title}>Leaderboard</h2>
      {data.length === 0 ? (
        <p>No data available</p>
      ) : (
        <ul style={styles.list}>
          {data.map((entry, index) => (
            <LeaderboardEntry
              key={entry.id || entry.enrollmentNumber || `entry-${index}`}
              entry={entry}
              onUserSelect={onUserSelect} // Pass the onUserSelect function
            />
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  leaderboard: {
    padding: "2em",
    background: "linear-gradient(135deg, #f0f0f0, #e0e0e0)",
    borderRadius: "15px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    transition: "background 0.3s ease",
  },
  title: {
    fontSize: "2em",
    color: "#333",
    textAlign: "center",
    marginBottom: "1em",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  list: {
    listStyleType: "none",
    padding: "0",
    margin: "0",
  },
  error: {
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
  },
};

export default Leaderboard;
