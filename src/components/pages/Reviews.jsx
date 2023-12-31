import React from 'react'
import Notiflix from 'notiflix';
import { useState, useEffect } from 'react';
import {getMoviesReviews} from '../services'

export function Reviews({movieId}) {
  const [moviesReviews, setMoviesReviews] = useState(null);

    useEffect(() => {
        getMoviesReviews(movieId)
        .then(response => {
          if (response.data === 0) {
              Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
              return;
          }
          setMoviesReviews(response.data.results);
        })
        .catch(function (error) {
          Notiflix.Notify.failure(
            'Oops! Something went wrong! Try reloading the page!'
          );
        })
    }, [movieId]);


    return (
      <div>
        {moviesReviews && moviesReviews.map((el) => {
          return (
          <ul key={el.id}>
            <h3>Author: {el.author}</h3>
            <p>Character: {el.content}</p>
          </ul>
        )})}
      </div>
    );
}

