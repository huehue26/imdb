import Image from "next/image";
import { BsFillStarFill, BsBookmark, BsBookmarkFill } from "react-icons/bs";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useAuth } from "../components/context/AuthContext";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

function Show(props) {
  const { show } = props;
  const route = useRouter();
  const image_path = "https://image.tmdb.org/t/p/original";
  const { currentUser } = useAuth();
  const [marked, setMarked] = useState(false);
  const [change, setChange] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post("/api/get-bookmark", {
        userId: currentUser.uid,
      });
      const bookmark = response.data;
      if (bookmark && bookmark.marks) {
        for (var i = 0; i < bookmark.marks.length; i++) {
          if (bookmark.marks[i] == show.id) {
            setMarked(true);
            break;
          } else {
            setMarked(false);
          }
        }
      }
    };
    if (currentUser) {
      fetchData();
    }
  }, [change]);
  const addBookMarkHandler = async (id) => {
    const response = await axios.post("/api/add-bookmark", {
      id: id,
      userId: currentUser.uid,
    });
    setChange(!change);
    return response.data;
  };

  const removeBookMarkHandler = async (id) => {
    const response = await axios.post("/api/delete-bookmark", {
      id: id,
      userId: currentUser.uid,
    });
    setChange(!change);
    return response.data;
  };

  return (
    <div className={styles.scroll_carousel_items}>
      <div className={styles.image}>
        <a href={`/show/${show.id}`}>
          <div>
            <Image
              src={image_path + show.poster_path}
              className={styles.imgs}
              alt="Poster"
              height="160px"
              width="100px"
              layout="responsive"
              placeholder="blur"
              blurDataURL
            />
          </div>
        </a>
      </div>
      <div className={styles.details}>
        <div className={styles.rating}>
          <div className="flex justify-center items-center">
            <div className="text-yellow-500">
              <BsFillStarFill />{" "}
            </div>
            <div> {show.vote_average}</div>
          </div>
          <div className="flex justify-center items-center">
            {currentUser ? (
              marked ? (
                <button
                  className="flex justify-center items-center text-yellow-500"
                  onClick={() => removeBookMarkHandler(show.id)}
                >
                  <BsBookmarkFill color="yellow" />
                </button>
              ) : (
                <button
                  className="flex justify-center items-center text-gray-100"
                  onClick={() => addBookMarkHandler(show.id)}
                >
                  <BsBookmark />
                </button>
              )
            ) : (
              <button
                className="flex justify-center items-center text-gray-100"
                onClick={() => route.push("/user/login")}
              >
                <BsBookmark />
              </button>
            )}
          </div>
        </div>
        <div className={styles.heading}>
          {show.original_title
            ? show.original_title.length > 30
              ? show.original_title.slice(0, 30) + " ..."
              : show.original_title
            : show.name && show.name.length > 30
            ? show.name.slice(0, 30) + " ..."
            : show.name}
        </div>
      </div>
    </div>
  );
}

export default Show;
