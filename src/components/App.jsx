import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Cast from "./pages/Cast";
import Layout from "./Layout/Layout";


export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<MovieDetails />} />
          {/* <Route path="movies/:movieId/cast" element={<Cast />} /> */}
          <Route path="*" element={<Home />} />
        </Route>
    </Routes>
    </div>
  );
};
