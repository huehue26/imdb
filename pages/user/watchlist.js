import MainLayout from "../../components/Layouts/MainLayout";
import React, { useState, useEffect } from "react";
import { protectedRoute } from "../../components/context/ProtectedRoute";
import { useAuth } from "../../components/context/AuthContext";
import axios from "axios";
import Show from "../../components/Show";
import styles from "../../styles/Home.module.css";

function Watchlist(props) {
  const { currentUser } = useAuth();
  const [bookmarkShows, setBookmarkShows] = useState([]);
  const allBookmarkedShows = [];

  useEffect(async () => {
    if (bookmarkShows.length == 0) {
      const fetchShowData = async (id) => {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${props.apiKey}&language=en-US`
        );
        allBookmarkedShows.push(response.data);
        setBookmarkShows(allBookmarkedShows);
      };
      const response = await axios.post("/api/get-bookmark", {
        userId: currentUser.uid,
      });
      const bookmarks = response.data.marks;
      bookmarks.forEach(async (marks) => await fetchShowData(marks));
    }
  }, []);

  return (
    <MainLayout>
      <div className="min-h-screen bg-neutral-800">
        <div className={styles.search_items}>
          {bookmarkShows.map((mark) => {
            return <Show show={mark} key={mark.id} />;
          })}
        </div>
      </div>
    </MainLayout>
  );
}

export default protectedRoute(Watchlist);

export async function getStaticProps() {
  const api_key = process.env.TMDB_API_KEY;
  return {
    props: {
      apiKey: api_key,
    },
  };
}
