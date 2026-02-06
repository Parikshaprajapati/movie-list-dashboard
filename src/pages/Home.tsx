import { useEffect, useState } from "react";
import { moviesData } from "../services/movies";  
import MovieCard from "../components/MovieCard";

export interface Movie {
    id: number;
    title: string;
    genre: string;
    rating: number;
}

function Home() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
       setMovies(moviesData);
    }, []);

  return (
    <div>
      <h1>Welcome to the Movie List Dashboard</h1>
      <p>Explore and manage your movie collection with ease.</p>
      {movies.map(movie => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </div>
  );
}

export default Home;