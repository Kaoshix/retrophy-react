import logo from "../assets/images/logo.svg";

import { Link } from "react-router-dom";
import { Fragment } from "react";

import { useContext } from "react";
import { AuthContext } from "../App";
import { useState } from "react";

export const Header = () => {
   const [isScrollEnabled, setIsScrollEnabled] = useState(true);
   function toggleNav() {
      document.querySelector("nav").classList.toggle("translate-x-full");
      document.querySelector("nav").classList.toggle("opacity-0");
   }

   function toggleBurger() {
      document.querySelector(".burger-icon").classList.toggle("hidden");
      document.querySelector(".cross-icon").classList.toggle("hidden");

      setIsScrollEnabled(!isScrollEnabled);

      if (isScrollEnabled) {
         document.body.style.height = "100vh";
         document.body.style.overflow = "hidden";
      } else {
         document.body.style.height = "auto";
         document.body.style.overflowY = "visible";
      }
   }

   const { user, loading } = useContext(AuthContext);
   const isLoggedIn = !!user?.id;

   return (
      <header className="flex justify-between items-end mb-10">
         <Link to="/" className="flex items-end ml-3">
            <img src={logo} alt={logo} className="pr-3 pb-[7px]" />
            <h1 className="text-2xl">Retrophy</h1>
         </Link>
         <button
            className="burger-icon lg:hidden"
            onClick={() => {
               toggleNav();
               toggleBurger();
            }}
         >
            <svg
               viewBox="0 0 100 80"
               width="40"
               height="40"
               className="pt-[7px]"
            >
               <rect width="100" height="10" rx="8" fill="white"></rect>
               <rect y="30" width="100" height="10" rx="8" fill="white"></rect>
               <rect y="60" width="100" height="10" rx="8" fill="white"></rect>
            </svg>
         </button>

         <button
            className="cross-icon absolute top-6 right-1 z-50 hidden lg:hidden"
            onClick={() => {
               toggleNav();
               toggleBurger();
            }}
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               width="70"
               height="70"
               fill="black"
               className="bi bi-x"
               viewBox="0 0 16 16"
            >
               <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
         </button>

         <nav
            className="
            translate-x-full opacity-0 duration-500 ease-in-out bg-slate-200 text-black absolute top-0 left-0 w-screen h-screen z-10 flex flex-col items-center justify-center
            lg:block lg:translate-x-0 lg:opacity-100 lg:bg-blue-abyss lg:text-white lg:relative lg:w-auto lg:h-auto lg:flex lg:items-end
            "
         >
            <ul className="mb-5">
               {!!user?.id ? (
                  <Fragment>
                     {user ? (
                        <Fragment>
                           <li className="text-2xl text-center lg:text-lg lg:pb-0 relative">
                              <img
                                 src={user.avatarPath}
                                 alt="user-avatar"
                                 className="h-[100px] w-[100px] rounded-full block m-auto"
                              />
                           </li>
                        </Fragment>
                     ) : (
                        "Loading..."
                     )}
                  </Fragment>
               ) : null}
               {loading
                  ? "..." // ici probleme
                  : !isLoggedIn && (
                       <Link
                          to="/login"
                          className="inline-block text-center text-white text-3xl py-2 px-6 bg-cyan-500 shadow-lg shadow-cyan-500/50 hover:bg-cyan-700 duration-200 ease-in-out rounded-lg 
                                                lg:text-lg"
                          onClick={() => {
                             if (window.innerWidth < 1024) {
                                toggleNav();
                                toggleBurger();
                             }
                          }}
                       >
                          Login
                       </Link>
                    )}
            </ul>
            <ul className="text-center lg:flex lg:items-center">
               <li
                  className="
                    text-3xl mb-4 
                    lg:text-lg lg:pb-0 lg:mr-5"
                  onClick={() => {
                     if (window.innerWidth < 1024) {
                        toggleNav();
                        toggleBurger();
                     }
                  }}
               >
                  <Link
                     className="hover:text-blue-500 duration-200 ease-in-out"
                     to="/"
                  >
                     Home
                  </Link>
               </li>
               <li
                  className="
                    text-3xl mb-4
                    lg:text-lg lg:pb-0 lg:mr-5"
                  onClick={() => {
                     if (window.innerWidth < 1024) {
                        toggleNav();
                        toggleBurger();
                     }
                  }}
               >
                  <Link
                     className="hover:text-blue-500 duration-200 ease-in-out"
                     to="/games"
                  >
                     Games
                  </Link>
               </li>
               <li
                  className="
                    text-3xl mb-4
                    lg:text-lg lg:pb-0 lg:mr-5"
                  onClick={() => {
                     if (window.innerWidth < 1024) {
                        toggleNav();
                        toggleBurger();
                     }
                  }}
               >
                  <a
                     className="hover:text-blue-500 duration-200 ease-in-out"
                     href="/#"
                  >
                     Community
                  </a>
               </li>
            </ul>
         </nav>
      </header>
   );
};
