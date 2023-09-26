import React from 'react';
import Notiflix from 'notiflix';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {getMovies} from '../services'

const Home = () => {
  const [trending, setTrending] = useState(null);
  const location = useLocation()

  useEffect(() => {
    getMovies()
      .then(response => {
        if (response.data.results === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return;
        }
        setTrending(response.data.results);
      })
      .catch(function (error) {
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
      })
      .finally(() => {
        // setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Trening today</h2>
      {trending && trending.map((el) => {
          return (
          <li key={el.id}>
            <Link to={`movies/${el.id}`} state={location}>{el.title}</Link>
          </li>
        )})}
    </div>
  );
};

export default Home;
