export const fetchCodingData = async (usernames) => {
  // Fetch data from Codeforces
  const fetchDataFromCodeforces = async (username) => {
    try {
      const response = await fetch(`https://codeforces.com/api/user.info?handles=${username}`);
      const data = await response.json();

      if (data.status === 'OK' && data.result.length > 0) {
        const user = data.result[0];
        return {
          name: user.firstName + " " + user.lastName,
          enrollmentNumber: username,  // Replace with actual enrollment numbers
          rank: user.rank || "No rank available",
          score: user.rating || "No rating available",
          website: 'Codeforces'
        };
      } else {
        console.error(`Codeforces API error: User with handle ${username} not found.`);
        return null;
      }
    } catch (error) {
      console.error('Error fetching data from Codeforces:', error);
      return null;
    }
  };

  // Fetch data from Codechef
  const fetchDataFromCodechef = async (username) => {
    const apiKey = 'YOUR_API_KEY_HERE';  // Replace with your actual API key
    try {
      const response = await fetch(`https://api.codechef.com/users/${username}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      const data = await response.json();

      if (data.status === 'OK' && data.result) {
        const user = data.result.user;
        return {
          name: user.first_name + " " + user.last_name,
          enrollmentNumber: username,
          rank: user.rank || "No rank available",
          score: user.rating || "No rating available",
          website: 'Codechef'
        };
      } else {
        console.error(`Codechef API error: ${JSON.stringify(data.result)}`);
        return null;
      }
    } catch (error) {
      console.error('Error fetching data from Codechef:', error);
      return null;
    }
  };

  // Fetch data from HackerRank
  const fetchDataFromHackerRank = async (username) => {
    try {
      const response = await fetch(`https://www.hackerrank.com/rest/hackers/${username}`);
      const data = await response.json();

      if (data && data.model) {
        return {
          name: data.model.name,
          enrollmentNumber: username,
          rank: data.model.rank || "No rank available",
          score: data.model.score || "No score available",
          website: 'HackerRank'
        };
      } else {
        console.error(`HackerRank API error: User with handle ${username} not found.`);
        return null;
      }
    } catch (error) {
      console.error('Error fetching data from HackerRank:', error);
      return null;
    }
  };

  // Fetch data from GitHub
  const fetchDataFromGitHub = async (username) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();

      if (data && data.login) {
        return {
          name: data.name || "No name available",
          enrollmentNumber: username,
          rank: "GitHub Profile",  // No rank available
          score: data.public_repos || 0,  // Using public repos as a proxy for activity
          website: 'GitHub'
        };
      } else {
        console.error(`GitHub API error: User with handle ${username} not found.`);
        return null;
      }
    } catch (error) {
      console.error('Error fetching data from GitHub:', error);
      return null;
    }
  };

  // Fetch data from Coding Ninjas (No API, Workaround)
  const fetchDataFromCodingNinjas = async (username) => {
    console.warn(`Coding Ninjas does not have an API. No data available for ${username}`);
    return null;
  };

  // Fetch data from GeeksforGeeks (No API, Workaround)
  const fetchDataFromGeeksforGeeks = async (username) => {
    console.warn(`GeeksforGeeks does not have an API. No data available for ${username}`);
    return null;
  };

  // Collect all user data
  const allUserData = [];
  for (const username of usernames) {
    const codeforcesData = await fetchDataFromCodeforces(username);
    if (codeforcesData) allUserData.push(codeforcesData);

    const codechefData = await fetchDataFromCodechef(username);
    if (codechefData) allUserData.push(codechefData);

    const hackerRankData = await fetchDataFromHackerRank(username);
    if (hackerRankData) allUserData.push(hackerRankData);

    const githubData = await fetchDataFromGitHub(username);
    if (githubData) allUserData.push(githubData);

    // Optional: You can add Coding Ninjas and GeeksforGeeks if you can find a solution to fetch data
    const codingNinjasData = await fetchDataFromCodingNinjas(username);
    if (codingNinjasData) allUserData.push(codingNinjasData);

    const geeksForGeeksData = await fetchDataFromGeeksforGeeks(username);
    if (geeksForGeeksData) allUserData.push(geeksForGeeksData);
  }

  // Sort the user data by score in descending order
  const sortedUserData = allUserData.sort((a, b) => {
    // Convert score to a number for comparison, handling cases where score is not available
    const scoreA = isNaN(a.score) ? 0 : parseInt(a.score);
    const scoreB = isNaN(b.score) ? 0 : parseInt(b.score);
    return scoreB - scoreA;  // Sort in descending order
  });

  return sortedUserData;
};
