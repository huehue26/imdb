import Head from "next/head";
import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { useAuth } from "../../components/context/AuthContext";
import { useRouter } from "next/router";
import { publicRoute } from "../../components/context/ProtectedRoute";

function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const {
    currentUser,
    login,
    googleLogin,
    facebookLogin,
    githubLogin,
  } = useAuth();
  const [err, setErr] = useState("");
  const route = useRouter();

  const loginHandler = async () => {
    const response = await login(userEmail, userPass);
    if (response === "success" && currentUser) {
      route.push("/");
    } else if (response === "error") {
      setErr("Email and password doesn't match");
    }
  };

  const googleLoginHandler = async () => {
    const response = await googleLogin();
    if (response === "success" && currentUser) {
      route.push("/");
    } else if (response === "error") {
      setErr("Email and password doesn't match");
    }
  };

  const facebookLoginHandler = async () => {
    const response = await facebookLogin();
    if (response === "success" && currentUser) {
      route.push("/");
    } else if (response === "error") {
      setErr("Email and password doesn't match");
    }
  };

  const githubLoginHandler = async () => {
    const response = await githubLogin();
    if (response === "success" && currentUser) {
      route.push("/");
    } else if (response === "error") {
      setErr("Email and password doesn't match");
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-zinc-900  flex justify-center items-center">
      <Head>
        <title>Imdb | Login</title>
      </Head>
      <div className="h-2/3 w-96 rounded-2xl mt-1/2 mx-auto bg-zinc-800 flex justify-center items-center">
        <div className="pl-8">
          <div className="text-4xl font-bold pb-10 flex justify-center items-center text-yellow-500">
            Log In
          </div>
          <div className="border-b-2 w-64 pb-2 mt-9 flex items-center text-yellow-500">
            <HiOutlineMail />
            <input
              type="email"
              className="text-sm focus:outline-none pl-2 font-light bg-transparent text-gray-300"
              placeholder="Your Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div className="border-b-2 w-64 pb-2 mt-9 flex items-center text-yellow-500">
            <RiLockPasswordLine />
            <input
              type="password"
              className="text-sm focus:outline-none pl-2 font-light bg-transparent text-gray-300"
              placeholder="Password"
              value={userPass}
              onChange={(e) => setUserPass(e.target.value)}
            />
          </div>
          {err ? <div className="text-red-600 text-sm pt-2">{err}</div> : ""}
          <div className="flex justify-center items-center">
            <button
              className="bg-yellow-500 text-gray-100 h-30 w-36 mt-9 p-3 rounded-lg hover:bg-yellow-600"
              onClick={loginHandler}
            >
              Log In
            </button>
          </div>
          <div className="text-gray-300 flex justify-center items-center pt-2">
            Don't have a account?{" "}
            <a href="/user/signup" className="text-yellow-500 pl-2">
              SignUp
            </a>
          </div>
          <div className="flex items-center justify-center pt-5">
            <div className="w-5/12 h-px bg-gray-300"></div>
            <div className="px-2 text-gray-200">OR</div>
            <div className="w-5/12 h-px bg-gray-300"></div>
          </div>
          <div className="flex justify-center items-center cursor-pointer">
            <div
              className="text-sky-600 flex justify-center items-center p-4"
              onClick={facebookLoginHandler}
            >
              <FaFacebook size={40} />
            </div>
            <div
              className="flex justify-center items-center p-4 cursor-pointer"
              onClick={googleLoginHandler}
            >
              <FcGoogle size={40} />
            </div>
            <div
              className="text-gray-200 flex justify-center items-center p-4 cursor-pointer"
              onClick={githubLoginHandler}
            >
              <BsGithub size={40} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default publicRoute(Login);
