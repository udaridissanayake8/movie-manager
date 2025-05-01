import React, { useState } from 'react';
import { SortField, SortOrder } from './types/Movie';
import MovieForm from './components/MovieForm';
import MovieList from './components/MovieList';
import Footer from './components/Footer';
import './App.css';

const sampleMovies = [
  {
    id: '1',
    title: 'Inception',
    genre: 'Sci-Fi',
    releaseYear: 2010,
    rating: 8.8,
    image: 'https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg'
  },
  {
    id: '2',
    title: 'The Godfather',
    genre: 'Crime',
    releaseYear: 1972,
    rating: 9.2,
    image: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg'
  },
  {
    id: '3',
    title: 'Interstellar',
    genre: 'Adventure',
    releaseYear: 2014,
    rating: 8.6,
    image: 'https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg'
  },
  {
    id: '4',
    title: 'Parasite',
    genre: 'Thriller',
    releaseYear: 2019,
    rating: 8.6,
    image: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg'
  },
  {
    id: '5',
    title: 'The Dark Knight',
    genre: 'Action',
    releaseYear: 2008,
    rating: 9.0,
    image: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg'
  },
  {
    id: '6',
    title: 'Forrest Gump',
    genre: 'Drama',
    releaseYear: 1994,
    rating: 8.8,
    image: 'https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg'
  },
  {
    id: '7',
    title: 'Pulp Fiction',
    genre: 'Crime',
    releaseYear: 1994,
    rating: 8.9,
    image: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg'
  },
  {
    id: '8',
    title: 'Spirited Away',
    genre: 'Animation',
    releaseYear: 2001,
    rating: 8.6,
    image: 'https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg'
  },
  {
    id: '9',
    title: 'The Matrix',
    genre: 'Sci-Fi',
    releaseYear: 1999,
    rating: 8.7,
    image: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg'
  },
  {
    id: '10',
    title: 'Gladiator',
    genre: 'Action',
    releaseYear: 2000,
    rating: 8.5,
    image: 'https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg'
  },
  {
    id: '11',
    title: 'Coco',
    genre: 'Animation',
    releaseYear: 2017,
    rating: 8.4,
    image: 'https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg'
  },
  {
    id: '12',
    title: 'Joker',
    genre: 'Crime',
    releaseYear: 2019,
    rating: 8.4,
    image: 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg'
  },
  {
    id: '13',
    title: 'Avengers: Endgame',
    genre: 'Action',
    releaseYear: 2019,
    rating: 8.4,
    image: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg'
  },
  {
    id: '14',
    title: 'The Lion King',
    genre: 'Animation',
    releaseYear: 1994,
    rating: 8.5,
    image: 'https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg'
  },
  {
    id: '15',
    title: 'Whiplash',
    genre: 'Drama',
    releaseYear: 2014,
    rating: 8.5,
    image: 'https://image.tmdb.org/t/p/w500/oPxnRhyAIzJKGUEdSiwTJQBa6zE.jpg'
  }
];

const App = () => {
  const [movies, setMovies] = useState(sampleMovies);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [yearRange, setYearRange] = useState({ start: 1900, end: new Date().getFullYear() });
  const [sortField, setSortField] = useState(SortField.TITLE);
  const [sortOrder, setSortOrder] = useState(SortOrder.ASC);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const filteredMovies = React.useMemo(() => {
    return movies
      .filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter(movie => selectedGenre === 'all' || movie.genre === selectedGenre)
      .filter(movie => movie.releaseYear >= yearRange.start && movie.releaseYear <= yearRange.end)
      .sort((a, b) => {
        const order = sortOrder === SortOrder.ASC ? 1 : -1;
        if (sortField === SortField.TITLE) {
          return a.title.localeCompare(b.title) * order;
        }
        return (a[sortField] > b[sortField] ? 1 : -1) * order;
      });
  }, [movies, searchQuery, selectedGenre, yearRange, sortField, sortOrder]);

  const handleAddMovie = React.useCallback((movieData) => {
    const movie = {
      ...movieData,
      id: Date.now().toString(),
      releaseYear: parseInt(movieData.year),
      rating: parseFloat(movieData.rating)
    };
    setMovies(prevMovies => [...prevMovies, movie]);
    setIsFormVisible(false);
  }, []);

  const handleMovieClick = React.useCallback((movie) => {
    setSelectedMovie(movie);
  }, []);

  const handleCloseForm = React.useCallback(() => {
    setIsFormVisible(false);
  }, []);

  const toggleDarkMode = React.useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const toggleForm = React.useCallback(() => {
    setIsFormVisible(prev => !prev);
  }, []);

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="stars"></div>
      <div className="twinkling"></div>
      
      <header className="header">
        <div className="header-content">
          <h1 className="title">🎬 Movie Master</h1>
          <div className="header-controls">
            <button 
              className="theme-toggle"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <button 
              className="add-movie-btn"
              onClick={toggleForm}
            >
              {isFormVisible ? '✕' : '➕ Add Movie'}
            </button>
          </div>
        </div>
      </header>

      {isFormVisible && (
        <MovieForm
          onSubmit={handleAddMovie}
          onClose={handleCloseForm}
        />
      )}

      <div className="filters-container">
        <div className="filters">
          <div className="filter-group">
            <label htmlFor="search">Search</label>
            <input
              id="search"
              type="text"
              className="filter-input"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label htmlFor="genre">Genre</label>
            <select
              id="genre"
              className="filter-select"
              value={selectedGenre}
              onChange={e => setSelectedGenre(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="Animation">Animation</option>
              <option value="Crime">Crime</option>
              <option value="Drama">Drama</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Thriller">Thriller</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="sort">Sort By</label>
            <select
              id="sort"
              className="filter-select"
              value={sortField}
              onChange={e => setSortField(e.target.value)}
            >
              <option value={SortField.TITLE}>Title</option>
              <option value={SortField.RELEASE_YEAR}>Year</option>
              <option value={SortField.RATING}>Rating</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="order">Order</label>
            <select
              id="order"
              className="filter-select"
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
            >
              <option value={SortOrder.ASC}>Ascending</option>
              <option value={SortOrder.DESC}>Descending</option>
            </select>
          </div>
        </div>
      </div>

      <MovieList
        movies={filteredMovies}
        onMovieClick={handleMovieClick}
      />
      <Footer />
    </div>
  );
};

export default App; 