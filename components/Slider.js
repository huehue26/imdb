import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../styles/Home.module.css'
import { BsFillStarFill, BsStar } from 'react-icons/bs'
import Image from 'next/image'

const image_path = "https://image.tmdb.org/t/p/original"


function Slider(props) {

    const [shows, setShow] = useState([])
    const api_key = props.apiKey

    useEffect(() => {
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
            <h3 className={styles.category_sub_heading}>{props.heading} </h3>
            <h4 className={styles.category_sub_sub_heading}>{props.subHeading}</h4>
            <div className={styles.items}>
                {shows.map(show =>
                    <div className={styles.scroll_carousel_items} key={show.id}>
                        <div className={styles.image}>
                            <a href={`/show/${show.id}`} >
                                <div >
                                    <Image src={image_path + show.poster_path} className={styles.imgs} alt="Poster" height="160%" width="100%" layout="responsive" placeholder="blur" blurDataURL />
                                </div>
                            </a>
                        </div>
                        <div className={styles.details}>
                            <div className={styles.rating}>
                                <div className="flex justify-center items-center">
                                    <div className="text-yellow-500"><BsFillStarFill /> </div>
                                    <div> {show.vote_average}</div>
                                </div>
                                <div className="flex justify-center items-center">
                                    <button className="flex justify-center items-center">
                                        <BsStar />
                                    </button>
                                </div>
                            </div>
                            <div className={styles.heading}>{show.original_title ? (show.original_title.length > 30 ? show.original_title.slice(0, 30) + " ..." : show.original_title) : (show.name && show.name.length > 30 ? show.name.slice(0, 30) + " ..." : show.name)}</div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}

export default Slider