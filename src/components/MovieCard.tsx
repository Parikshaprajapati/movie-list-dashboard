import type { Movie } from "../pages/Home";

function MovieCard( movie: Movie ) {
    return (
        <div>
            <h2>{movie.title}</h2>
            <p>Genre: {movie.genre}</p>
            <p>Rating: {movie.rating}</p>
        </div>
    );  

}

export default MovieCard;