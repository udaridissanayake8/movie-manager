import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, onMovieClick }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div 
          key={movie.id} 
          onClick={() => onMovieClick(movie)}
          className="movie-list-item"
        >
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
};

export default MovieList; 