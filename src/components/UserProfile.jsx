import React from "react";

const UserProfile = ({ user }) => {
  if (!user) return null;

  const {
    name = "No name available",
    rank = "No rank available",
    score = "No score available",
    website = "No website available",
  } = user;

  return (
    <div style={styles.profileContainer}>
      <h2 style={styles.profileTitle}>User Profile</h2>
      <div style={styles.profileContent}>
        <strong style={styles.name}>{name}</strong>
        <p style={styles.rank}>Rank: {rank}</p>
        <p style={styles.score}>Score: {score}</p>
        <p style={styles.website}>
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
        </p>
      </div>
    </div>
  );
};

const styles = {
  profileContainer: {
    padding: "2em",
    background: "#f4f4f9",
    borderRadius: "10px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    marginTop: "2em",
  },
  profileTitle: {
    fontSize: "2em",
    textAlign: "center",
    marginBottom: "1em",
  },
  profileContent: {
    padding: "1em",
  },
  name: {
    fontSize: "1.5em",
    fontWeight: "bold",
  },
  rank: {
    fontSize: "1.2em",
    color: "#333",
  },
  score: {
    fontSize: "1.2em",
    color: "#333",
  },
  website: {
    fontSize: "1.2em",
    color: "#333",
  },
  link: {
    color: "#007BFF",
    textDecoration: "none",
  },
};

export default UserProfile;
