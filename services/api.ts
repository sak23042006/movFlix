export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const url = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`;
    const response = await fetch(url, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });

    if (!response) {
      throw new Error("Failed to fetch movie");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
