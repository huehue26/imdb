import React, { useState, useEffect } from "react";
import axios from "axios";
import Show from "./Show";

function Page(props) {
  const [shows, setShow] = useState([]);
  const id = props.query;
  const page = props.page;

  const api_key = props.apiKey;
  const image_path = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${id}&page=${page}&include_adult=false`
      )
      .then((res) => {
        setShow(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, page, api_key]);
  return (
    <>
      {shows.map((show) => (
        <Show show={show} key={show.id} />
      ))}
    </>
  );
}

export default Page;
