import React from 'react'
import Notiflix from 'notiflix';
import { useState, useEffect } from 'react';
import {getMoviesCast} from '../services'

const url_details = 'https://image.tmdb.org/t/p/w200';

export function Cast({movieId}) {
  const [moviesCast, setMoviesCast] = useState(null);

    useEffect(() => {
        getMoviesCast(movieId)
        .then(response => {
          if (response.data === 0) {
              Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
              return;
          }
          setMoviesCast(response.data.cast);
        })
        .catch(function (error) {
          Notiflix.Notify.failure(
            'Oops! Something went wrong! Try reloading the page!'
          );
        })
    }, [movieId]);


    return (
      <div>
        {moviesCast && moviesCast.map((el) => {
          return (
          <ul key={el.id}>
            <img src={`${url_details}${el.profile_path}`} alt={el.name}/>
            <p>{el.name}</p>
            <p>Character: {el.character}</p>
          </ul>
        )})}
      </div>
    );
}

