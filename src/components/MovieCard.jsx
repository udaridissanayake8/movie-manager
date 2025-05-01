import React from 'react';

const MovieCard = ({ movie }) => {
  const getRatingColor = (rating) => {
    if (rating >= 8) return '#4CAF50';
    if (rating >= 6) return '#FFC107';
    return '#F44336';
  };

  return (
    <div className="movie-card">
      {movie.image && (
        <img
          src={movie.image}
          alt={movie.title + ' poster'}
          className="movie-card-image"
          onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/300x450?text=No+Image'; }}
          style={{ width: '100%', height: '250px', objectFit: 'cover', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
        />
      )}
      <div className="movie-card-content">
        <div className="movie-header">
          <h3>{movie.title}</h3>
          <div 
            className="rating-badge"
            style={{ backgroundColor: getRatingColor(movie.rating) }}
          >
            {movie.rating}/10
          </div>
        </div>
        <div className="movie-details">
          <p className="genre-tag">{movie.genre}</p>
          <p className="year">{movie.releaseYear}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard; 