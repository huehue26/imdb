import Image from "next/image"
import { BsFillStarFill, BsBookmark } from 'react-icons/bs'
import styles from '../styles/Home.module.css'

function Show(props) {
    const { show } = props
    const image_path = "https://image.tmdb.org/t/p/original"

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
                        <button className="flex justify-center items-center text-gray-100">
                            <BsBookmark />
                        </button>
                    </div>
                </div>
                <div className={styles.heading}>{show.original_title ? (show.original_title.length > 30 ? show.original_title.slice(0, 30) + " ..." : show.original_title) : (show.name && show.name.length > 30 ? show.name.slice(0, 30) + " ..." : show.name)}</div>
            </div>
        </div>
    )
}

export default Show
