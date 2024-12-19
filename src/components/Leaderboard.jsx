import React from "react";
import LeaderboardEntry from "./LeaderboardEntry";

const Leaderboard = ({ data }) => {
  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      {data.length === 0 ? (
        <p>No data available</p>
      ) : (
        <ul>
          {data.map((entry, index) => (
            <LeaderboardEntry key={index} entry={entry} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;
