import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../styles/Home.module.css'
import { BsFillStarFill, BsStar } from 'react-icons/bs'

function Page(props) {

    const [shows, setShow] = useState([])
    const id = props.query
    const page = props.page

    const api_key = props.apiKey
    const image_path = "https://image.tmdb.org/t/p/original"

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${id}&page=${page}&include_adult=false`)
            .then(res => {
                setShow(res.data.results)
            })
            .catch(err => {
                console.log(err)
            })
    }, [id, page, api_key])
    return (
        <>
            {shows.map(show =>
                <div key={show.id}>
                    <div className={styles.scroll_carousel_items}>
                        <div className={styles.image}>
                            <a href={`/show/${show.id}`} >
                                <img src={image_path + show.poster_path} className="cursor-pointer" alt="Poster" />
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
                            <div className={styles.heading}>{show.original_title ? (show.original_title.length > 30 ? show.original_title.slice(0, 30) + " ..." : show.original_title) : (show.name.length > 30 ? show.name.slice(0, 30) + " ..." : show.name)}</div>
                        </div>
                    </div>
                </div>)
            }
        </>
    )
}

export default Page
