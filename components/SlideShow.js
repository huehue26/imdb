import React, { useState, useEffect } from 'react'
import Loader from './Loader'
import axios from 'axios'
import styles from '../styles/Home.module.css'
import { FaPlay } from 'react-icons/fa'
import { BsInfoLg } from 'react-icons/bs'

const image_base = "https://image.tmdb.org/t/p/original/"

function SlideShow(props) {
    const api_key = props.apiKey

    const [show_image, setShow] = useState("")
    const [show_image_next_1, setShow_1] = useState("")
    const [show_image_next_2, setShow_2] = useState("")
    const [show_image_next_3, setShow_3] = useState("")
    const [show_details, setDetails] = useState([])
    const [load, setLoad] = useState(true)
    const [idSlideshow, setIdSlideshow] = useState("576845")
    const [loaded, setDataLoaded] = useState(false)
    const [shows, setShows] = useState([])
    const [imageLoaded, setImageLoaded] = useState(false)

    let current_show = 0

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`)
            .then(res => {
                let result_shows = res.data.results
                // shuffling the shows order
                for (let i = 0; i < 10; i++) {
                    let x = Math.floor(Math.random() * 20)
                    let y = Math.floor(Math.random() * 20)
                    let z = result_shows[x]
                    result_shows[x] = result_shows[y]
                    result_shows[y] = z
                }
                for (var i = 0; i < result_shows.length; i++) {
                    shows.push(result_shows[i])
                }
                setDataLoaded(true)

                let image_url = ""
                image_url = shows[current_show].backdrop_path
                setShow(image_base + image_url)
                setIdSlideshow(shows[current_show].id)
                setShow_1(image_base + shows[(current_show + 1) % 20].backdrop_path)
                setShow_2(image_base + shows[(current_show + 2) % 20].backdrop_path)
                setShow_3(image_base + shows[(current_show + 3) % 20].backdrop_path)
                setDetails(shows[current_show])
                current_show = current_show + 1
                current_show = current_show % 20
                setLoad(false)

                const interval = setInterval(() => {
                    let image_url = ""
                    image_url = shows[current_show].backdrop_path
                    setShow(image_base + image_url)
                    setIdSlideshow(shows[current_show].id)
                    setShow_1(image_base + shows[(current_show + 1) % 20].backdrop_path)
                    setShow_2(image_base + shows[(current_show + 2) % 20].backdrop_path)
                    setShow_3(image_base + shows[(current_show + 3) % 20].backdrop_path)
                    setDetails(shows[current_show])
                    current_show = current_show + 1
                    current_show = current_show % 20
                }, 15000)
                return (() => {
                    clearInterval(interval)
                })
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <div className={styles.slideshow}>
            {load ? <Loader /> : ""}
            {
                !load ?
                    <img src={show_image} alt="slideshow_image" className={styles.image} onLoad={() => {
                        setImageLoaded(true)
                    }} />
                    : ""
            }
            {
                !load && imageLoaded ?
                    <div className={styles.details}>
                        <p className={styles.title}>
                            {show_details.original_title}
                        </p>
                        <p className={styles.discription}>
                            {show_details.overview}
                        </p>
                        <a href={`/show/${idSlideshow}`} >
                            <button className={styles.trailer}>
                                <div className="flex justify-center items-center">
                                    <div className="pr-1"><FaPlay /></div>
                                    <div> Trailer</div>
                                </div>
                            </button>
                        </a>
                        <a href={`/show/${idSlideshow}`} >
                            <button className={styles.watchlist}>
                                <div className="flex justify-center items-center">
                                    <div> More Info</div>
                                    <div className="pl-1"><BsInfoLg /> </div>
                                </div>
                            </button>
                        </a>
                    </div>
                    : ""
            }
            {
                !load && imageLoaded ?
                    <div className={styles.next_shows}>
                        <div>
                            <img src={show_image_next_1} alt="slideshow_next_image" className={styles.image_next} />
                        </div>
                        <div>
                            <img src={show_image_next_2} alt="slideshow_next_image" className={styles.image_next} />
                        </div>
                        <div>
                            <img src={show_image_next_3} alt="slideshow_next_image" className={styles.image_next} />
                        </div>
                    </div >
                    : ""
            }
        </div >
    )
}

export default SlideShow
