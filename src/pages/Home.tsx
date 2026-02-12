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
    const [loader, setLoader] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setMovies(moviesData);
        }, 2000);

        Promise.resolve().then(() => {
            let shouldFetch = Math.random() < 0.5; // Simulate a random condition for fetching data
            if (!shouldFetch) throw new Error("Failed to load movies. Please try again later.");
        }).catch((error) => {
            setError(error.message || "Failed to load movies. Please try again later.");    
        }).finally(() => {setLoader(false); // Stop loader after fetching data or on error 
        }); 

        return () => clearTimeout(timer); // Cleanup on unmount
    }, []);

    const filteredMovies = searchTerm ? movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) : movies;

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

            {error !== "" && <p style={{ color: 'red' }}>{error}</p>}
            {loader && error === "" && <p>Loading movies...</p>}
            {!loader && error === "" && filteredMovies.map(movie => (
                <MovieCard key={movie.id} {...movie} />
            ))}

        </div>
    );
}

export default Home;