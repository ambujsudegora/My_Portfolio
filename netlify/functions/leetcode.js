const HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const fallback = (source, warning) => ({
  statusCode: 200,
  headers: HEADERS,
  body: JSON.stringify({
    rating: 1700,
    solved: 720,
    rank: null,
    contestRating: 1700,
    source,
    warning,
  }),
});

export const handler = async (event) => {
  if (event?.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: HEADERS,
      body: "",
    };
  }

  const username = "AmbujRai";

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({
        query: `
          query getUser($username: String!) {
            matchedUser(username: $username) {
              submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
              profile {
                ranking
              }
            }
            userContestRanking(username: $username) {
              rating
            }
          }
        `,
        variables: { username },
      }),
    });

    if (!response.ok) {
      return fallback("fallback", `GraphQL HTTP error: ${response.status}`);
    }

    const graphql = await response.json();
    
    if (graphql?.errors) {
      return fallback("fallback", `GraphQL response errors: ${JSON.stringify(graphql.errors)}`);
    }

    const acList = graphql?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum ?? [];
    const allSolved = acList.find((x) => x?.difficulty === "All")?.count ?? 720;
    const rank = graphql?.data?.matchedUser?.profile?.ranking ?? null;
    
    const rawRating = graphql?.data?.userContestRanking?.rating;
    const rating = rawRating != null ? Math.round(rawRating) : 1700;

    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify({
        rating,
        solved: allSolved,
        rank,
        contestRating: rating,
        source: "leetcode-graphql",
      }),
    };
  } catch (err) {
    return fallback("fallback", `Fetch failed: ${err?.message || err}`);
  }
};
