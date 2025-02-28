import axios from 'axios';
import Chart from 'chart.js/auto';

// Base score and normalization constants
const BASE_SCORE = 10;
const NORMALIZATION_FACTOR = 100;

// Platform-specific normalization factors
const MAX_PROBLEMS = 3000; // Max problems solved on LeetCode (Approx)
const MAX_RATING = 3500; // Max rating on Codeforces/CodeChef (Approx)
const MAX_STARS = 7; // Max stars on CodeChef
const MAX_REPOS = 2000; // Max repos on GitHub (Approx)

// Helper function for safe API fetching
const safeFetch = async (url, options = {}) => {
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error.response?.data || error.message);
    return null;
  }
};

// Scoring Functions
const calculateLeetCodeScore = (solvedQuestions) => {
  return ((solvedQuestions / MAX_PROBLEMS) * BASE_SCORE * NORMALIZATION_FACTOR);
};

const calculateCodeforcesScore = (rating) => {
  return ((rating / MAX_RATING) * BASE_SCORE * NORMALIZATION_FACTOR);
};

const calculateCodechefScore = (rating, stars) => {
  return (((rating / MAX_RATING) + (stars / MAX_STARS)) * BASE_SCORE * NORMALIZATION_FACTOR);
};

const calculateGitHubScore = (publicRepos) => {
  return ((publicRepos / MAX_REPOS) * BASE_SCORE * NORMALIZATION_FACTOR);
};

// Fetch Functions
const fetchDataFromLeetCode = async (username) => {
  const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
  const data = await safeFetch(url);
  if (data) {
    const score = calculateLeetCodeScore(data.totalSolved || 0);
    return {
      name: data.username || "Anonymous",
      enrollmentNumber: username,
      solvedQuestions: data.totalSolved || 0,
      rank: data.ranking || "Rank not available",
      score,
      website: 'LeetCode',
    };
  }
  return null;
};

const fetchDataFromCodeforces = async (username) => {
  if (!username || typeof username !== 'string') {
    console.error("Invalid username for Codeforces.");
    return null;
  }

  const url = `https://codeforces.com/api/user.info?handles=${username}`;
  const data = await safeFetch(url);
  if (data?.status === 'OK' && data.result.length > 0) {
    const user = data.result[0];
    const score = calculateCodeforcesScore(user.rating || 0);
    return {
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || "Anonymous",
      enrollmentNumber: username,
      rank: user.rank || "No rank available",
      score,
      website: 'Codeforces',
    };
  }
  
  // Handle 400 Bad Request or other errors
  console.error(`Error fetching Codeforces data for ${username}: ${data?.comment || 'Unknown error'}`);
  return null;
};

const fetchDataFromCodechef = async (username) => {
  const url = `https://codechef-api.vercel.app/handle/${username}`;
  const data = await safeFetch(url);
  if (data?.status === 'success' && data.data) {
    const score = calculateCodechefScore(data.data.rating || 0, data.data.stars || 0);
    return {
      name: data.data.name || "Anonymous",
      enrollmentNumber: username,
      profileUrl: data.data.profile || "Profile not available",
      score,
      website: 'CodeChef',
    };
  }
  return null;
};

const fetchDataFromGitHub = async (username) => {
  const url = `https://api.github.com/users/${username}`;
  const data = await safeFetch(url);
  if (data?.login) {
    const score = calculateGitHubScore(data.public_repos || 0);
    return {
      name: data.name || "No name available",
      enrollmentNumber: username,
      score,
      website: 'GitHub',
    };
  }
  return null;
};

// Render Leaderboard
const renderLeaderboardChart = (userData) => {
  const ctx = document.getElementById('leaderboardChart').getContext('2d');
  const labels = userData.map(user => user.name);
  const scores = userData.map(user => user.score);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Leaderboard Score',
        data: scores,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

// Fetch coding data for all platforms
export const fetchCodingData = async (usernames) => {
  const allUserData = [];
  const uniqueUsernames = new Set(usernames); // Ensure unique usernames

  for (const username of uniqueUsernames) {
    if (!username) {
      console.error("Username is missing.");
      continue;
    }

    const fetchers = [
      fetchDataFromLeetCode,
      fetchDataFromCodeforces,
      fetchDataFromCodechef,
      fetchDataFromGitHub,
    ];

    for (const fetcher of fetchers) {
      const data = await fetcher(username);
      if (data) allUserData.push(data);
    }
  }

  // Sort the user data by score in descending order
  const sortedUserData = allUserData.sort((a, b) => b.score - a.score);

  // Ensure data is displayed or chart is rendered if the element exists
  if (document.getElementById('leaderboardChart')) {
    renderLeaderboardChart(sortedUserData);
  }

  return sortedUserData;
};
