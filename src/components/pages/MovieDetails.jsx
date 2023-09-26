import React from 'react'
import Notiflix from 'notiflix';
import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import {getMoviesDetails} from '../services';
import {Cast} from './Cast';
import {Reviews} from './Reviews';
import {Inform, Goback} from '../stiled';

const url_details = 'https://image.tmdb.org/t/p/w300';

function MovieDetails() {
    const { movieId } = useParams();
    const [moviesDetails, setMoviesDetails] = useState(null);
    const [cast, setCast] = useState(false);
    const [reviews, setReviews] = useState(false);
    const location = useLocation()

    useEffect(() => {
        getMoviesDetails(movieId)
        .then(response => {
          if (response.data === 0) {
              Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
              return;
          }
          setMoviesDetails(response.data);
          // console.log(response.data)
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

    const openCast = () => {
      setCast(true)
      setReviews(false)
    }

    const openReviews = () => {
      setReviews(true)
      setCast(false)
    }


    let genress = '';
    let today
    if (moviesDetails) {
        // const {poster_path, original_title, release_date, overview, genres, vote_average} = moviesDetails;
        moviesDetails.genres.map((el) => {
                return genress += `${el.name}  `
              })
        today = new Date(moviesDetails.release_date)
    }
    return (
      <div>
        {moviesDetails && 
        <div>
          <div>
            <Link to={location.state}>
              <Goback type="button">Go back</Goback>
            </Link>
          </div>
          <div>
            <img src={`${url_details}${moviesDetails.poster_path}`} alt={moviesDetails.original_title}/>
            <h2>{`${moviesDetails.original_title} (${today.getFullYear()})`}</h2>
            <p>User Score: {`${Math.round(moviesDetails.vote_average*10)} %`}</p>
            <h3>Overview</h3>
            <p>{moviesDetails.overview}</p>
            <h4>Genres</h4>
            <p>{genress}</p>
          </div>
          <div>
            <h5>Additional information</h5>
            <ul>
              <Inform onClick={openCast}>Cast
              </Inform>
            </ul>
            <ul>
              <Inform onClick={openReviews}>Reviews
              </Inform>
            </ul>
              {cast && <Cast movieId={movieId}/>}
              {reviews && <Reviews movieId={movieId}/>}
          </div>
        </div>}
      </div>
    );
}

export default MovieDetails
