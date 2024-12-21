import React from "react";

const LeaderboardEntry = ({ entry, onUserSelect }) => {
  const {
    name = "No name available",
    enrollmentNumber = "No enrollment number",
    rank = "No rank available",
    score = "No score available",
    website = "No website available",
  } = entry || {};

  return (
    <li
      style={styles.entryContainer}
      onClick={() => onUserSelect(entry)} // Add a click handler to trigger onUserSelect
    >
      <div style={styles.rankContainer}>
        <div style={styles.rank}>{rank}</div>
      </div>
      <div style={styles.content}>
        <strong style={styles.name}>{name}</strong>
        <span style={styles.enrollment}>({enrollmentNumber})</span>
        <ul style={styles.detailsList}>
          <li style={styles.detailItem}>Score: {score}</li>
          <li style={styles.detailItem}>
            Website:{" "}
            {website !== "No website available" ? (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                {website}
              </a>
            ) : (
              website
            )}
          </li>
        </ul>
      </div>
    </li>
  );
};

const styles = {
  entryContainer: {
    marginBottom: "1.5em",
    padding: "1em",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #f5f5f5, #e0e0e0)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  },
  rankContainer: {
    position: "absolute",
    top: "10px",
    left: "10px",
    background: "linear-gradient(135deg, #FF8C00, #FF4500)",
    padding: "0.4em 1em",
    borderRadius: "5px",
    color: "white",
    fontWeight: "bold",
  },
  rank: {
    fontSize: "1.2em",
    letterSpacing: "1px",
  },
  content: {
    paddingLeft: "1.5em",
    paddingTop: "0.5em",
  },
  name: {
    fontSize: "1.3em",
    fontWeight: "bold",
    color: "#333",
    transition: "color 0.3s ease",
  },
  enrollment: {
    fontSize: "1em",
    color: "#555",
  },
  detailsList: {
    marginTop: "0.5em",
    paddingLeft: "1.5em",
    listStyleType: "disc",
  },
  detailItem: {
    marginBottom: "0.3em",
    fontSize: "1em",
    color: "#333",
  },
  link: {
    color: "#007BFF",
    textDecoration: "none",
    transition: "color 0.3s ease",
  },
};

export default LeaderboardEntry;
