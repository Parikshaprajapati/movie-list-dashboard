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
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
       setMovies(moviesData);
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filteredMovies = moviesData.filter(movie =>
                movie.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setMovies(filteredMovies);
        } else {
            setMovies(moviesData);
        }
    }, [searchTerm]);

  return (
    <div>
      <h1>Welcome to the Movie List Dashboard</h1>
      <p>Explore and manage your movie collection with ease.</p>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {movies.map(movie => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </div>
  );
}

export default Home;