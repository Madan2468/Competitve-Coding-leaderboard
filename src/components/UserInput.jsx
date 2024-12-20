import React, { useState } from "react";

const UserInput = ({ onSubmit }) => {
  const [usernames, setUsernames] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setUsernames(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim spaces and split by commas, ensuring no empty values
    const usernameList = usernames
      .split(",")
      .map((username) => username.trim()) // Trim each username
      .filter((username) => username.length > 0); // Remove empty strings

    // Simple validation to ensure there's at least one username
    if (usernameList.length === 0) {
      setError("Please enter at least one username.");
    } else {
      setError(""); // Reset error if valid input
      onSubmit(usernameList); // Call the parent function with the list
    }
  };

  return (
    <div className="user-input">
      <form onSubmit={handleSubmit}>
        <label htmlFor="usernames">
          Enter Competitive Coding Usernames (comma separated):{" "}
        </label>
        <input
          type="text"
          id="usernames"
          value={usernames}
          onChange={handleInputChange}
          placeholder="Codechef, Codeforces, etc."
        />
        <button type="submit">Fetch Data</button>
      </form>

      {/* Display error message if there is one */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UserInput;
