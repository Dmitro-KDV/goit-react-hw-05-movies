import Notiflix from 'notiflix';
import { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import {getMoviesSearch} from '../services';

const Movies = () => {
  const [value, setValue] = useState('');
  const [searchText, setSearchText] = useState('');
  const [moviesSearch, setMoviesSearch] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation()
  const searchT = searchParams.get('query') ?? ''
  
  const handleChange = ({ target: { value } }) => {
    setValue(value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchText(value.trim())
    setSearchParams({query: value.trim()});
    // console.log(e.target.elements.search.value)
}

if (!searchText && searchT) {
  setSearchText(searchT)
  setValue(searchT);
}

useEffect(() => {
      getMoviesSearch(searchText)
      .then(response => {
        if (response.data === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return;
        }
        setMoviesSearch(response.data.results);
      })
      .catch(function (error) {
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
      })
}, [searchText]);

  return (
    <div>
      <form className="SearchForm" onSubmit={handleSubmit}>
        <input
          className="SearchForm-input"
          type="text"
          name='search'
          placeholder=""
          onChange={handleChange}
          value={value}
        />
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>
      </form>
      {moviesSearch && moviesSearch.map((el) => {
          return (
          <li key={el.id}>
            <Link to={`${el.id}`} state={location}>{el.title}</Link>
          </li>
        )})}
    </div>
  );
};

export default Movies;
