import Head from "next/head";
import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { useAuth } from "../../components/context/AuthContext";
import { useRouter } from "next/router";
import { publicRoute } from "../../components/context/ProtectedRoute";
import Link from "next/link";

function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const { currentUser, signup } = useAuth();
  const [err, setErr] = useState("");
  const route = useRouter();

  const signupHandler = async () => {
    const response = await signup(userEmail, userPass);
    if (response === "success" && currentUser) {
      route.push("/");
    } else if (response === "error") {
      setErr("User already exists");
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-zinc-900  flex justify-center items-center">
      <Head>
        <title>Imdb | Login</title>
      </Head>
      <div className="h-3/5 w-96 rounded-2xl mt-1/2 mx-auto bg-zinc-800 flex justify-center items-center">
        <div className="pl-8">
          <div className="text-4xl font-bold pb-10 flex justify-center items-center text-yellow-500">
            Sign Up
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
              onClick={signupHandler}
            >
              SignUp
            </button>
          </div>
          <div className="text-gray-300 flex justify-center items-center pt-4">
            Already have a account ?{" "}
            <Link href="/user/login" className="text-yellow-500 pl-2">
              LogIn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default publicRoute(Login);
