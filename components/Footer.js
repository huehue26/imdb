import React from "react";
import styles from "../styles/Home.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.outside}>
        <div className={styles.icons}>
          <a href="https://facebook.com/imdb"></a>
          <a href="https://twitter.com/imdb"></a>
          <a href="https://instagram.com/imdb"></a>
          <a href="https://www.linkedin.com/company/imdb-com"></a>
        </div>
        <div className={styles.main}>
          <div className={styles.first}>
            <a href="https://slyb.app.link/SKdyQ6A449">
              <div>Get the IMDb App</div>
            </a>
            <a href="https://slyb.app.link/SKdyQ6A449">
              <div>Help</div>
            </a>
            <a href="https://slyb.app.link/SKdyQ6A449">
              <div>Site Index</div>
            </a>
            <a href="https://slyb.app.link/SKdyQ6A449">
              <div>IMDbPro</div>
            </a>
            <a href="https://slyb.app.link/SKdyQ6A449">
              <div>Box Office Mojo</div>
            </a>
          </div>
          <div className={styles.second}>
            <a href="https://slyb.app.link/SKdyQ6A449">
              <div>Press Room</div>
            </a>
            <a href="https://slyb.app.link/SKdyQ6A449">
              <div>Advertising</div>
            </a>
            <a href="https://slyb.app.link/SKdyQ6A449">
              <div>Jobs</div>
            </a>
            <a href="https://slyb.app.link/SKdyQ6A449">
              <div>Conditions</div>
            </a>
            <a href="https://slyb.app.link/SKdyQ6A449">
              <div>Interest-Based Ad</div>
            </a>
          </div>
          <p className={styles.amazon}>A cool company</p>
          <p className={styles.cc}>© 1990-2021 by IMDb.com Inc.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
