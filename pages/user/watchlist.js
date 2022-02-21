import MainLayout from "../../components/Layouts/MainLayout";
import React, { useState, useEffect } from "react";
import { protectedRoute } from "../../components/context/ProtectedRoute";
import { useAuth } from "../../components/context/AuthContext";
import axios from "axios";
import Show from "../../components/Show";

function Watchlist(props) {
    const { currentUser } = useAuth();
    const bookmarkShows = [];

    useEffect(async () => {
        const fetchShowData = async (id) => {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${props.apiKey}&language=en-US`
            );
            bookmarkShows.push(response.data);
        };
        const response = await axios.post("/api/get-bookmark", {
            userId: currentUser.uid,
        });
        const bookmarks = response.data.marks;
        bookmarks.forEach(async (marks) => await fetchShowData(marks))
    }, []);

    return (
        <MainLayout>
            <div className="min-h-screen bg-neutral-800">
                {bookmarkShows.length ? bookmarkShows.forEach(mark => <Show show={mark} id={mark.id} />) : <div className="flex justify-center items-center text-lg text-gray-100">No data found</div>}
            </div>
        </MainLayout>
    );
}

export default protectedRoute(Watchlist);

export async function getStaticProps(context) {
    const api_key = process.env.TMDB_API_KEY;
    return {
        props: {
            apiKey: api_key,
        },
    };
}
