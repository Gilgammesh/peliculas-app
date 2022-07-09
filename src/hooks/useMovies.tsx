import {useState, useEffect} from 'react';
import movieDB from '../api/theMovieDB';
import {MovieDBResponse, Movie} from '../interfaces/movieInterface';

const useMovies = (
  url: 'now_playing' | 'popular' | 'top_rated' | 'upcoming',
) => {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const getMovies = async () => {
      try {
        const response = await movieDB.get<MovieDBResponse>(`/${url}`);
        if (mounted && response.status) {
          setMovies(response.data.results);
        }
        setLoading(false);
      } catch (e) {
        setError(e as string);
        setLoading(false);
      }
    };
    getMovies();
    return () => {
      mounted = false;
    };
  }, [url]);

  return {movies, loading, error};
};

export default useMovies;
