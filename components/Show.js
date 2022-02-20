import Image from "next/image"
import { BsFillStarFill, BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import styles from '../styles/Home.module.css'
import axios from "axios"
import { useAuth } from '../components/context/AuthContext'
import React, { useState, useEffect } from 'react'

function Show(props) {
    const { show } = props
    const image_path = "https://image.tmdb.org/t/p/original"
    const { currentUser } = useAuth()
    const [marked, setMarked] = useState(false)
    useEffect(async () => {
        const response = await axios.post("/api/get-bookmark", {
            userId: currentUser.uid,
        });
        const bookmark = response.data
        if (bookmark && bookmark.marks) {
            console.log(bookmark.marks)
            for (var i = 0; i < bookmark.marks.length; i++) {
                if (bookmark.marks[i] == show.id) {
                    setMarked(true)
                    break
                }
            }
        }
    })
    console.log(marked)

    const addBookMarkHandler = async (id) => {
        const response = await axios.post('/api/add-bookmark', {
            id: id,
            userId: currentUser.uid
        })
        return response.data
    }

    const removeBookMarkHandler = async (id) => {
        const response = await axios.post('/api/delete-bookmark', {
            id: id,
            userId: currentUser.uid
        })
        console.log(response.data)
        return response.data
    }

    return (
        <div className={styles.scroll_carousel_items} key={show.id}>
            <div className={styles.image}>
                <a href={`/show/${show.id}`} >
                    <div >
                        <Image src={image_path + show.poster_path} className={styles.imgs} alt="Poster" height="160px" width="100px" layout="responsive" placeholder="blur" blurDataURL />
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
                        {marked ?
                            <button className="flex justify-center items-center text-yellow-500" onClick={() => removeBookMarkHandler(show.id)}>
                                <BsBookmarkFill />
                            </button> :
                            <button className="flex justify-center items-center text-gray-100" onClick={() => addBookMarkHandler(show.id)}>
                                <BsBookmark />
                            </button>
                        }
                    </div>
                </div>
                <div className={styles.heading}>{show.original_title ? (show.original_title.length > 30 ? show.original_title.slice(0, 30) + " ..." : show.original_title) : (show.name && show.name.length > 30 ? show.name.slice(0, 30) + " ..." : show.name)}</div>
            </div>
        </div>
    )
}

export default Show
