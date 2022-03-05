import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import * as language from "./json/language.json";
import { BsFillStarFill, BsStar } from "react-icons/bs";
import { FaChartLine, FaPlayCircle, FaChevronRight } from "react-icons/fa";

const image_base = "https://image.tmdb.org/t/p/original/";

function Info(props) {
  var x = props.data;
  const api_key = props.apiKey;

  const [cast, setCast] = useState([]);
  const [reviews, setReview] = useState([]);
  const [language1, setLanguage1] = useState("");
  const [language2, setLanguage2] = useState("");

  useEffect(() => {
    for (var i = 0; i < language.default.length; i++) {
      if (language.default[i].code == x.original_language) {
        setLanguage1(language.default[i].name);
        setLanguage2(language.default[i].nativeName);
        break;
      }
    }
  }, [x.original_language]);

  const playVideoHandler = () => {
    document.getElementById("thumbnail").style.zIndex = "1";
    document.getElementById("trailer-video").src += "?autoplay=1";
  };

  useEffect(() => {
    window.scroll(0, 0);
    document.getElementById("thumbnail").style.zIndex = "5";
  }, [cast]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${props.data.id}/credits?api_key=${api_key}`
      )
      .then((res) => {
        setCast(res.data.cast);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${props.data.id}/reviews?api_key=${api_key}&language=en-US&page=1`
      )
      .then((res) => {
        setReview(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props]);

  return (
    <div className={styles.info_container}>
      <div className={styles.top}>
        <div className={styles.name}>
          <div className={styles.heading}>
            {x.original_title ? x.original_title : "Title can't be loaded"}
          </div>
          <div className={styles.release}>
            {x.release_date ? x.release_date : "0000-00-00"}
            <span className={styles.spannn}>
              {x.original_language ? language1 : ""} &nbsp;||&nbsp;
              {x.original_language ? language2 : ""}
            </span>
          </div>
        </div>
        <div className={styles.rate}>
          <div className={styles.rating}>
            <div className={styles.heading}>Imdb Rating</div>
            <div className={styles.value}>
              <span className="pr-2 text-yellow-400">
                <BsFillStarFill />
              </span>
              {x.vote_average ? x.vote_average : "0.0"}/
              <span className={styles.spann}>10</span>
            </div>
          </div>
          <div className={styles.your_rating}>
            <div className={styles.heading}>Your Rating</div>
            <div className={styles.value}>
              <span className="text-blue-500">
                <BsStar />
              </span>
            </div>
          </div>
          <div className={styles.popularity}>
            <div className={styles.heading}>Popularity</div>
            <div className={styles.value}>
              <span className="pr-2 text-green-500">
                <FaChartLine />
              </span>
              {x.popularity ? x.popularity : "0000.00"}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mid}>
        <div className={styles.image}>
          <img
            src={`${image_base}${x.poster_path}`}
            className={styles.imggg}
            alt="poster"
          />
        </div>
        <div className={styles.video}>
          <div
            id="thumbnail"
            className={styles.thumbnail}
            onClick={playVideoHandler}
          >
            <div className={styles.image}>
              <img src={image_base + x.backdrop_path} className={styles.imag} />
            </div>
            <div className={styles.overlay}>
              <span className={styles.fas}>
                <FaPlayCircle />
              </span>
              Play Trailer
            </div>
          </div>
          <div className={styles.trailer}>
            <iframe
              width="850"
              height="500"
              src={
                Object.entries(x.videos.results).length
                  ? `https://www.youtube-nocookie.com/embed/${x.videos.results[0].key}`
                  : "https://www.youtube-nocookie.com/embed/MFUEofAr9GA"
              }
              title="YouTube video player"
              frameBorder="0"
              id="trailer-video"
            ></iframe>
          </div>
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.genre}>
          <div className={styles.details}>
            {x.genres ? x.genres.map((s) => <p key={s.name}>{s.name}</p>) : ""}
          </div>
        </div>
        <div className={styles.overview}>
          <div className={styles.heading}>
            <div className="flex items-center">
              <span className="pr-1">Overview</span>
              <span className={styles.fas}>
                <FaChevronRight />
              </span>
            </div>
          </div>
          <div className={styles.details}>{x.overview ? x.overview : ""}</div>
        </div>
        <div className={styles.cast}>
          <div className={styles.heading}>
            <div className="flex items-center">
              <span className="pr-1">Top Cast</span>
              <span className={styles.fas}>
                <FaChevronRight />
              </span>
            </div>
          </div>
          <div className={styles.details}>
            {cast.map((cast) => (
              <div className={styles.card} key={cast.original_name}>
                <div className={styles.image}>
                  <img
                    className={styles.images}
                    src={
                      cast.profile_path
                        ? image_base + cast.profile_path
                        : "https://www.chocolatebayou.org/wp-content/uploads/No-Image-Person-1536x1536.jpeg"
                    }
                    alt="cast-image"
                  />
                </div>
                <div className={styles.position}>
                  {cast.original_name}{" "}
                  <span className="spannnn"> as {cast.character}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <div className={styles.reviews">
                    <div className={styles.heading">
                        Reviews <i className={styles.fas fa-chevron-right"></i>
                    </div>
                    <div id="details">
                        {
                            reviews.total_results ? reviews.results.map(re =>
                                < div className={styles.card" >
                                    <div className={styles.avtar">
                                        <img src={re.author_details.avatar_path ? image_base + re.author_details.avatar_path : "https://www.chocolatebayou.org/wp-content/uploads/No-Image-Person-1536x1536.jpeg"} alt="avtar" />
                                    </div>
                                    <div>
                                        <div className={styles.name">
                                            {re.author_details.username}<span>{re.updated_at}</span>
                                        </div>
                                        <div className={styles.review">
                                            {re.content}
                                        </div>
                                    </div>
                                </div>) : <div className={styles.no-review">No review found </div>
                        }
                    </div>
                </div> */}
      </div>
    </div>
  );
}

export default Info;
