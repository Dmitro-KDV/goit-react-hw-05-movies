import React from 'react';
import Notiflix from 'notiflix';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {getMoviesSearch} from '../services';

const Movies = () => {
  const [searchText, setSearchText] = useState('');
  const [moviesSearch, setMoviesSearch] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = ({ target: { value } }) => {
    setSearchText(value.trim());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchText) {
      getMoviesSearch(searchText)
      .then(response => {
        if (response.data === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return;
        }
        setMoviesSearch(response.data.results);
        setSearchParams({query: searchText});
        // console.log(response.data.results)
      })
      .catch(function (error) {
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
      })
      .finally(() => {
        // setIsLoading(false);
      });
    }
  };

  return (
    <div>
      <form className="SearchForm" onSubmit={handleSubmit}>
        <input
          className="SearchForm-input"
          type="text"
          placeholder=""
          onChange={handleChange}
          value={searchText}
        />
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>
      </form>
      {moviesSearch && moviesSearch.map((el) => {
          return (
          <li key={el.id}>
            <Link to={`${el.id}`}>{el.title}</Link>
          </li>
        )})}
    </div>
  );
};

export default Movies;
