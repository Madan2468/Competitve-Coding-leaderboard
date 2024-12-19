import React from "react";

const LeaderboardEntry = ({ entry }) => {
  return (
    <li>
      <strong>{entry.name}</strong> ({entry.enrollmentNumber})
      <ul>
        <li>Rank: {entry.rank}</li>
        <li>Score: {entry.score}</li>
        <li>Website: {entry.website}</li>
      </ul>
    </li>
  );
};

export default LeaderboardEntry;
