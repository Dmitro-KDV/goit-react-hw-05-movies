import axios from "axios";

const url = 'https://api.themoviedb.org/3/trending/movie/day';
const url_details = 'https://api.themoviedb.org/3/movie/';
const url_search = 'https://api.themoviedb.org/3/search/movie';
const api_key = '90bd277c098e46b20c5579e91b38094c';

export function getMovies() {
  return axios.get(url, {
    params: {
      api_key: api_key,
      language: 'en-US',
      page: 1,
    },
  });
}

export function getMoviesDetails(movie_id) {
    return axios.get(`${url_details}${movie_id}`, {
      params: {
        api_key: api_key,
        language: 'en-US',
        page: 1,
      },
    });
  }

  export function getMoviesCast(movie_id) {
    return axios.get(`${url_details}${movie_id}/credits`, {
      params: {
        api_key: api_key,
        language: 'en-US',
      },
    });
  }

  export function getMoviesReviews(movie_id) {
    return axios.get(`${url_details}${movie_id}/reviews`, {
      params: {
        api_key: api_key,
        language: 'en-US',
        page: 1,
      },
    });
  }

  export function getMoviesSearch(searchText) {
    return axios.get(`${url_search}`, {
      params: {
        api_key: api_key,
        query: searchText,
        include_adult: false,
        language: 'en-US',
        page: 1,
      },
    });
  }