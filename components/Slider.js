import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../styles/Home.module.css'
import Show from './Show'

function Slider(props) {

    const [shows, setShow] = useState([])
    const api_key = props.apiKey

    useEffect(async () => {
        var api_link = ""
        switch (props.category) {
            case "trending":
                api_link = `https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`
                break;
            case "rated":
                api_link = `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}`
                break;
            case "actionMovies":
                api_link = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=28`
                break;
            case "upcoming":
                api_link = `https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2021-11-01&primary_release_date.lte=2022-11-30&api_key=${api_key}`
                break;
            case "recommended":
                api_link = `https://api.themoviedb.org/3/movie/${props.movie_id}/recommendations?api_key=${api_key}&language=en-US&page=1`
                break;
            default:
                api_link = ""
                break;
        }
        if (api_link) {
            axios.get(api_link)
                .then(res => {
                    setShow(res.data.results)
                })
                .catch(error => {
                    setShow(["Something went wrong"])
                })
        }
    }, [props, api_key])

    return (
        <div className={styles.category}>
            {shows.length ?
                <div>
                    <h3 className={styles.category_sub_heading}>{props.heading} </h3>
                    <h4 className={styles.category_sub_sub_heading}>{props.subHeading}</h4>
                    <div className={styles.items}>
                        {shows.map(show =>
                            <Show show={show} key={show.id} />)
                        }
                    </div>
                </div>
                : ""}
        </div>
    )
}

export default Slider