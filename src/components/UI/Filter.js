import React, { useEffect } from "react";

const Filter = (props) => {
    const {genre, onFilter, movies} = props;
    console.log(movies);
    console.log(genre);
    useEffect(() => {
        if (+genre === 0) {
            onFilter(movies)
            return;
        }
        const filteredItems = movies.filter((movie) => movie.genre_ids.includes(+genre))
        console.log(filteredItems);
        onFilter(filteredItems);
    }, [genre, onFilter, movies])
    const clickHandler = (e) => {
        props.onConfirm(e.target.dataset.genre)
    }
  return (
    <div className="filter-container">
      <button className={+genre === 0 ? 'active' : ''} data-genre={+0} onClick={clickHandler}>همه</button>
      <button className={+genre === 35 ? 'active' : ''} data-genre={+35} onClick={clickHandler}>کمدی</button>
      <button className={+genre === 28 ? 'active' : ''} data-genre={+28} onClick={clickHandler}>اکشن</button>
    </div>
  );
};

export default Filter;
