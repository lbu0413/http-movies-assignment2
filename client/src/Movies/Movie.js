import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import { Route } from 'react-router-dom'
import UpdateMovie from './UpdateMovie'

function Movie({ addToSavedList, movieList, setMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory()
  const { id } = useParams()

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
        console.log(res)
        const newMovieList = movieList.filter((movie) => {
          return `${movie.id}` !== id
        })
        setMovieList(newMovieList)
        push(`/`)
    })
    .catch(err => console.log(err))
}


  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button
        onClick={() => {
          push(`/update-movie/${id}`)
        }}>
          Update</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Movie;
