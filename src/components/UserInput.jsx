import React, { useState } from "react";

const UserInput = ({ onSubmit }) => {
  const [usernames, setUsernames] = useState("");

  const handleInputChange = (e) => {
    setUsernames(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const usernameList = usernames.split(",");
    onSubmit(usernameList);
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
    </div>
  );
};

export default UserInput;
