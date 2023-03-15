// Assets
import logo from "../assets/images/logo.svg";
import { ReactComponent as Burger } from "../assets/images/burger.svg";
import { ReactComponent as Cross } from "../assets/images/cross.svg";

// React - packages
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";

// Custom hooks
import { AuthContext } from "../App";

export const Header = () => {
   const [isScrollEnabled, setIsScrollEnabled] = useState(true);
   const history = useHistory();

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

   const { user, loading, logout, isLoggedIn } = useContext(AuthContext);

   return (
      <header
         className="
                  flex justify-between items-end mb-10 
                  lg:max-w-screen-2xl lg:m-auto lg:mb-10 
                  "
      >
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
            <Burger />
         </button>

         <button
            className="cross-icon absolute top-6 right-1 z-50 hidden lg:hidden"
            onClick={() => {
               toggleNav();
               toggleBurger();
            }}
         >
            <Cross />
         </button>

         <nav
            className="
            translate-x-full opacity-0 duration-300 ease-in-out bg-slate-200 text-black absolute top-0 left-0 w-screen h-screen flex flex-col items-center justify-center z-10
            lg:translate-x-0 lg:opacity-100 lg:flex-row-reverse lg:items-end lg:bg-transparent lg:text-white lg:relative lg:w-auto lg:h-auto
            "
         >
            <ul>
               {!!user?.id ? (
                  <>
                     {user ? (
                        <>
                           <li className="text-2xl text-center mb-10 lg:mb-0 lg:text-lg lg:pb-0 relative">
                              <div>
                                 <img
                                    src={user.avatarPath}
                                    alt="user-avatar"
                                    className="h-[80px] w-[80px] lg:h-[50px] lg:w-[50px] rounded-full m-auto mb-2 mt-5 lg:m-0 lg:hover:cursor-pointer"
                                    onClick={() => {
                                       if (window.innerWidth < 1024) {
                                          toggleNav();
                                          toggleBurger();
                                       } else {
                                          document
                                             .querySelector(".user-menu")
                                             .classList.toggle("lg:hidden");
                                       }
                                    }}
                                 />
                              </div>
                              <div className="flex lg:hidden flex-col lg:ease-in-out user-menu lg:absolute lg:top-16 lg:right-0">
                                 {user.roles.map((role) =>
                                    role === "ROLE_ADMIN" ? (
                                       <Link
                                          key={role}
                                          to="/admin_dashboard"
                                          className="text-white text-xl py-2 px-6 bg-blue-500 shadow-lg shadow-blue-500/50 hover:bg-blue-700 duration-200 ease-in-out rounded-lg"
                                          onClick={() => {
                                             if (window.innerWidth < 1024) {
                                                toggleNav();
                                                toggleBurger();
                                             } else {
                                                document
                                                   .querySelector(".user-menu")
                                                   .classList.toggle(
                                                      "lg:hidden"
                                                   );
                                             }
                                          }}
                                       >
                                          Dashboard
                                       </Link>
                                    ) : null
                                 )}
                                 <Link
                                    to="/settings"
                                    className=" my-3 inline-block text-center text-white text-xl py-2 px-6 bg-green-500 shadow-lg shadow-green-500/50 hover:bg-green-700 duration-200 ease-in-out rounded-lg 
                                                lg:text-lg"
                                    onClick={() => {
                                       if (window.innerWidth < 1024) {
                                          toggleNav();
                                          toggleBurger();
                                       } else {
                                          document
                                             .querySelector(".user-menu")
                                             .classList.toggle("lg:hidden");
                                       }
                                    }}
                                 >
                                    Settings
                                 </Link>
                                 <button
                                    className="inline-block text-center text-white text-xl py-2 px-6 bg-red-500 shadow-lg shadow-red-500/50 hover:bg-red-700 duration-200 ease-in-out rounded-lg 
                                                lg:text-lg"
                                    onClick={() => {
                                       logout();
                                       history.push("/");
                                       if (window.innerWidth < 1024) {
                                          document
                                             .querySelector(".user-menu")
                                             .classList.toggle("lg:hidden");
                                       }
                                    }}
                                 >
                                    Logout
                                 </button>
                              </div>
                           </li>
                        </>
                     ) : (
                        "Loading..."
                     )}
                  </>
               ) : null}
               {loading ? (
                  <li className="h-[80px] w-[80px] lg:h-[50px] lg:w-[50px] rounded-full m-auto bg-slate-500"></li>
               ) : (
                  !isLoggedIn && (
                     <li>
                        <Link
                           to="/login"
                           className="inline-block text-center text-white text-3xl py-2 px-6 mb-5 bg-cyan-500 shadow-lg shadow-cyan-500/50 hover:bg-cyan-700 duration-200 ease-in-out rounded-lg 
                                 lg:text-lg lg:mb-0"
                           onClick={() => {
                              if (window.innerWidth < 1024) {
                                 toggleNav();
                                 toggleBurger();
                              }
                           }}
                        >
                           Login
                        </Link>
                     </li>
                  )
               )}
            </ul>
            <ul className="text-center lg:flex">
               <li
                  className="
                    text-3xl mb-4 
                    lg:text-lg lg:mb-0 lg:mr-5"
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
                    lg:text-lg lg:mb-0 lg:mr-5"
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
                    lg:text-lg lg:mb-0 lg:mr-5"
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
