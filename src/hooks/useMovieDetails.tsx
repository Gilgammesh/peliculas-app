import {useState, useEffect} from 'react';
import movieDB from '../api/theMovieDB';
import {
  MovieCast,
  MovieCredits,
  MovieDetail,
} from '../interfaces/movieInterface';

const useMovieDetails = (id: number) => {
  const [details, setDetails] = useState<MovieDetail | null>(null);
  const [cast, setCast] = useState<MovieCast[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const getMovieDetail = async () => {
      try {
        const detailsPromise = movieDB.get<MovieDetail>(`/${id}`);
        const creditsPromise = movieDB.get<MovieCredits>(`/${id}/credits`);
        const [detailsResponse, creditsResponse] = await Promise.all([
          detailsPromise,
          creditsPromise,
        ]);
        if (mounted && detailsResponse.status && creditsResponse.status) {
          setDetails(detailsResponse.data);
          setCast(creditsResponse.data.cast);
        }
        setLoading(false);
      } catch (e) {
        setError(e as string);
        setLoading(false);
      }
    };
    getMovieDetail();
    return () => {
      mounted = false;
    };
  }, [id]);

  return {details, cast, loading, error};
};

export default useMovieDetails;
