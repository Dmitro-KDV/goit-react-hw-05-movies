import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import Home from "./pages/Home";
// import Movies from "./pages/Movies";
// import MovieDetails from "./pages/MovieDetails";
import Layout from "./Layout/Layout";
const Movies = lazy(() => import('./pages/Movies'))
const MovieDetails = lazy(() => import('./pages/MovieDetails'))

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<MovieDetails />} />
          <Route path="*" element={<Home />} />
        </Route>
    </Routes>
    </div>
  );
};
