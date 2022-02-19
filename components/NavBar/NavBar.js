import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import { AiOutlineMenu } from 'react-icons/ai'
import { FaSearch } from 'react-icons/fa'
import { useAuth } from "../context/AuthContext";
import DropDown from "./DropDown";

function NavBar() {
    const [navShow, setNavShow] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const route = useRouter();
    const { currentUser, logout } = useAuth()
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    useEffect(() => {
        window.addEventListener("scroll", () => {
            window.scrollY > 200 ? setNavShow(true) : setNavShow(false);
        });
        if (navShow) {
            document.getElementById("nav-bar").style.backgroundImage = "";
            document.getElementById("nav-bar").style.backgroundColor = "black";
        } else {
            document.getElementById("nav-bar").style.backgroundColor = "";
            document.getElementById("nav-bar").style.backgroundImage = "linear-gradient(black, transparent)";
        }
    }, [navShow]);

    // searching on button click
    const searchClickHandler = () => {
        route.push(`/search/query=${searchValue}`);
    };

    // searching on presssing enter
    const searchInputHandler = (e) => {
        if (e.key == "Enter") {
            route.push(`/search/query=${searchValue}`);
        }
    };

    return (
        <div id="nav-bar" className={styles.nav_bar}>
            <Link href="/" passHref>
                <img src="/imdb-logo.png" className={styles.logo} alt="logo" />
            </Link>
            <div className={styles.nav_bar_heading}>
                <button className={styles.btn_1 + styles.menu}>
                    <div className="flex text-white justify-center items-center">
                        <div className="pr-3"> <AiOutlineMenu /></div>
                        <div className=""> Menu</div>
                    </div>
                </button>
                <span id="form">
                    <input className={styles.search} placeholder="Search"
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyPress={searchInputHandler}
                    />
                    <button onClick={searchClickHandler} className="text-yellow-500 pl-1 pt-1">
                        <FaSearch />
                    </button>
                </span>
                <button className={styles.btn_1}>Watchlist</button>
                <button className={styles.btn_1}>
                    {currentUser ? (
                        <DropDown />
                    ) : <Link passHref href='/user/login'>Sign In</Link>
                    }
                </button>
            </div>
        </div >
    );
}

export default NavBar;
