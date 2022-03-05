import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineMenu } from "react-icons/ai";
import { FaSearch, FaClipboardList } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const [navShow, setNavShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const route = useRouter();
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 200 ? setNavShow(true) : setNavShow(false);
    });
    if (navShow) {
      document.getElementById("nav-bar").style.backgroundImage = "";
      document.getElementById("nav-bar").style.backgroundColor = "black";
    } else {
      document.getElementById("nav-bar").style.backgroundColor = "";
      document.getElementById("nav-bar").style.backgroundImage =
        "linear-gradient(black, transparent)";
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
    <div
      id="nav-bar"
      className="flex justify-center items-center p-2 fixed z-10 w-screen"
    >
      <Link href="/" passHref>
        <img src="/imdb-logo.png" alt="logo" className="h-8 cursor-pointer" />
      </Link>
      <div className="pl-4 pr-4 flex justify-center items-center">
        {/* <div className="flex text-white justify-center items-center pr-4">
          <div className="pr-3">
            {" "}
            <AiOutlineMenu />
          </div>
          <div className="text-lg"> Menu</div>
        </div> */}
        <div className="w-128 flex justify-center items-center bg-white">
          <input
            placeholder="Search"
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={searchInputHandler}
            className="w-128 pl-3 text-sm h-7 focus:outline-none"
          />
          <div
            onClick={searchClickHandler}
            className="text-yellow-500 pl-1 pr-2 pt-1"
          >
            <FaSearch />
          </div>
        </div>
        {currentUser ? (
          <div className="pl-4 text-lg text-white hover:text-yellow-500 cursor-pointer flex justify-center items-center ">
            <FaClipboardList className="pr-2" />
            <Link passHref href="/user/watchlist">
              WatchList
            </Link>
          </div>
        ) : (
          ""
        )}
        <div className="pl-4 text-lg text-white hover:text-yellow-500  cursor-pointer">
          {currentUser ? (
            <div
              className="flex justify-center items-center"
              onClick={() => logout()}
            >
              <ImExit className="pr-2" size={25} />
              Logout
            </div>
          ) : (
            <Link passHref href="/user/login">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
