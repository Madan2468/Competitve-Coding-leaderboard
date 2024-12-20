export const fetchCodingData = async (usernames) => {
  // Helper to safely fetch and parse JSON with improved error handling
  const safeFetch = async (url, options = {}) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        console.error(`Error: HTTP ${response.status} for ${url}`);
        return null;
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      if (error.message.includes("Failed to fetch")) {
        console.warn("CORS issue detected, check if the API supports cross-origin requests.");
      }
      return null;
    }
  };

  // Fetch data from Codeforces with error handling for CORS issues
  const fetchDataFromCodeforces = async (username) => {
    if (!username) {
      console.error("Codeforces username is missing.");
      return null;
    }
    const url = `https://codeforces.com/api/user.info?handles=${username}`;
    const data = await safeFetch(url);
    if (data?.status === 'OK' && data.result.length > 0) {
      const user = data.result[0];
      return {
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || "Anonymous",
        enrollmentNumber: username,
        rank: user.rank || "No rank available",
        score: user.rating || "No rating available",
        website: 'Codeforces',
        leaderboardStats: {
          countryRank: user.countryRank || "Country rank not available",
          contestParticipation: user.contestCount || "Participation data not available",
        },
      };
    } else {
      console.error(`Error fetching Codeforces data for ${username}`);
      return null;
    }
  };

  // Fetch data from Codechef with error handling
  const fetchDataFromCodechef = async (username) => {
    try {
      const url = `https://codechef-api.vercel.app/handle/${username}`;
      console.log(`Fetching CodeChef data for username: ${username}`);
      const data = await safeFetch(url);

      if (data?.success && data?.status === 200) {
        return {
          name: data.name || "Anonymous",
          enrollmentNumber: username,
          profileUrl: data.profile || "Profile not available",
          currentRating: data.currentRating || "Rating not available",
          highestRating: data.highestRating || "Highest rating not available",
          globalRank: data.globalRank || "Global rank not available",
          countryRank: data.countryRank || "Country rank not available",
          stars: data.stars || "Stars not available",
          countryName: data.countryName || "Country not specified",
          countryFlag: data.countryFlag || "Flag not available",
          heatMap: Array.isArray(data.heatMap) ? data.heatMap : [],
          ratingData: Array.isArray(data.ratingData) ? data.ratingData : [],
          leaderboardStats: {
            globalRank: data.globalRank || "Global rank not available",
            countryRank: data.countryRank || "Country rank not available",
          },
        };
      } else {
        console.error(`CodeChef API error: Invalid response or request failed. Response: ${JSON.stringify(data)}`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching data from CodeChef API for user "${username}":`, error);
      return null;
    }
  };

  // Fetch data from GitHub with error handling
  const fetchDataFromGitHub = async (username) => {
    const url = `https://api.github.com/users/${username}`;
    const data = await safeFetch(url);
    if (data?.login) {
      return {
        name: data.name || "No name available",
        enrollmentNumber: username,
        rank: "GitHub Profile",
        score: data.public_repos || 0,
        website: 'GitHub',
        leaderboardStats: {
          followers: data.followers || "Followers not available",
          publicRepos: data.public_repos || 0,
        },
      };
    }
    return null;
  };

  // Fetch data from Geeks for Geeks with error handling for CORS
  const fetchDataFromGeeksForGeeks = async (username) => {
    const url = `https://geeks-for-geeks-api.vercel.app/${username}`;
    const data = await safeFetch(url);

    if (data?.info?.userName) {
      return {
        name: data.info.userName || "Anonymous",
        enrollmentNumber: username,
        instituteRank: data.info.instituteRank || "Rank not available",
        currentStreak: data.info.currentStreak || "Streak not available",
        maxStreak: data.info.maxStreak || "Max streak not available",
        solvedStats: {
          school: data.solvedStats.school || { count: 0, questions: [] },
          basic: data.solvedStats.basic || { count: 0, questions: [] },
          easy: data.solvedStats.easy || { count: 0, questions: [] },
          medium: data.solvedStats.medium || { count: 0, questions: [] },
          hard: data.solvedStats.hard || { count: 0, questions: [] },
        },
        website: 'Geeks for Geeks',
        leaderboardStats: {
          solvedSchool: data.solvedStats.school.count || 0,
          solvedEasy: data.solvedStats.easy.count || 0,
          solvedMedium: data.solvedStats.medium.count || 0,
        },
      };
    } else {
      console.error(`Error fetching Geeks for Geeks data for ${username}`);
      return null;
    }
  };

  // Fetch data from HackerRank (using the provided response structure)
  const fetchDataFromHackerRank = async (username) => {
    try {
      const url = `https://www.hackerrank.com/rest/hackers/${username}`;
      const data = await safeFetch(url);

      if (data?.status === 'success' && data?.model) {
        const user = data.model;
        return {
          name: user.name || "Anonymous",
          enrollmentNumber: username,
          rank: user.rank || "Rank not available",
          language: user.language || "Language not available",
          avatar: user.avatar || "https://d1ce3iv5vajdy.cloudfront.net/hackerrank/assets/gravatar.jpg", // Default avatar
          website: user.website || "Website not available",
          country: user.country || "Country not specified",
          leaderboardStats: {
            rank: user.rank || "Rank not available",
            followers: user.followers || "Followers not available",
          },
        };
      } else {
        console.error(`Error fetching HackerRank data for ${username}`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching data from HackerRank for user "${username}":`, error);
      return null;
    }
  };

  // Collect all user data
  const allUserData = [];
  const uniqueUsernames = new Set(usernames); // Ensure unique usernames

  for (const username of uniqueUsernames) {
    if (!username) {
      console.error("Username is missing.");
      continue;
    }

    const fetchers = [
      fetchDataFromCodeforces,
      fetchDataFromCodechef,
      fetchDataFromGitHub,
      fetchDataFromGeeksForGeeks,
      fetchDataFromHackerRank,
    ];

    for (const fetcher of fetchers) {
      const data = await fetcher(username);
      if (data) allUserData.push(data);
    }
  }

  // Sort the user data by score in descending order
  const sortedUserData = allUserData.sort((a, b) => {
    const scoreA = isNaN(parseInt(a.score)) ? 0 : parseInt(a.score);
    const scoreB = isNaN(parseInt(b.score)) ? 0 : parseInt(b.score);

    return scoreB - scoreA;
  });

  // Now, we will render the leaderboard chart using Chart.js
  const renderLeaderboardChart = (userData) => {
    const ctx = document.getElementById('leaderboardChart').getContext('2d');
    const labels = userData.map(user => user.name);
    const scores = userData.map(user => parseInt(user.score) || 0);

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

  // Render the chart
  renderLeaderboardChart(sortedUserData);

  return sortedUserData;
};
