import { useEffect, useState } from "react";
import Movies from "./components/Movies/Movies.js";
import "./App.css";
import Filter from "./components/UI/Filter.js";
import { useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
function App() {
  const [moviesList, setMoviesList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=dc7b15571dbfa3c3bce035e249fdb4d3&language=en-US&page=1"
      );
      const data = await response.json();

      console.log(data);
      setMoviesList(data.results);
    };
    fetchMovies();
  }, []);
  const movieFilterHandler = (filteredMovies) => {
    setActiveGenre(filteredMovies);
  };
  const filteredMoviesHandler = useCallback((data) => {
    setFiltered(data);
  }, []);
  console.log(filtered);
  console.log(activeGenre);
  console.log(moviesList);

  return (
    <div className="App">
      <Filter
        onConfirm={movieFilterHandler}
        movies={moviesList}
        genre={activeGenre}
        onFilter={filteredMoviesHandler}
      />
      <motion.div layout className="popular-movies">
        <AnimatePresence>
          {filtered.map((movie) => {
            return (
              <Movies
                key={movie.id}
                path={movie.backdrop_path}
                title={movie.title}
              />
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
