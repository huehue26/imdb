import React from 'react'
import styles from '../styles/Home.module.css'

function Loader() {
    return (
        <>
            <div className={styles.loading_div}>
                <div className={styles.loading}>
                    <span className={styles.dot}></span>
                    <div className={styles.dots}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Loader
