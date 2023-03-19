// Assets
import logo from "../assets/images/logo.svg";
import { ReactComponent as Burger } from "../assets/images/burger.svg";
import { ReactComponent as Cross } from "../assets/images/cross.svg";

// React - packages
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";

// Components
import { Placeholder } from "../components/Placeholder";

// Custom hooks
import { AuthContext } from "../App";
import Button from "../components/Button";

// Variables - Constants
const placeholderAvatar = "h-[80px] w-[80px] rounded-full m-auto lg:h-[50px] lg:w-[50px]";

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

   function hideUserButton() {
      if (window.innerWidth < 1024) {
         toggleNav();
         toggleBurger();
      } else {
         document.querySelector(".user-menu")?.classList.add("lg:hidden");
      }
   }

   const { user, isLoadingUser, logout } = useContext(AuthContext);
   const adminRole = user?.roles?.filter((role) => role === "ROLE_ADMIN");

   return (
      <header className="mb-10 flex justify-between lg:m-auto lg:mb-10 lg:max-w-screen-2xl">
         <Link to="/" className="flex items-end">
            <img src={logo} alt={logo} className="mr-3 pb-[7px]" />
            <h1 className="text-2xl">Retrophy</h1>
         </Link>
         <button className="burger-icon absolute top-[37px] right-[20px] lg:hidden" onClick={() => hideUserButton()}>
            <Burger />
         </button>
         <button
            className="cross-icon absolute top-[22px] right-[5px] z-50 hidden lg:hidden"
            onClick={() => hideUserButton()}
         >
            <Cross />
         </button>

         <nav
            className="
            absolute top-0 left-0 z-10 flex h-screen w-screen translate-x-full flex-col items-center justify-center bg-slate-200 text-black opacity-0 duration-300 ease-in-out
            lg:relative lg:h-auto lg:w-auto lg:translate-x-0 lg:flex-row-reverse lg:items-end lg:bg-transparent lg:text-white lg:opacity-100
            "
         >
            <ul className="mb-5 lg:m-0">
               {user?.id ? (
                  <>
                     <li className="relative mb-3 text-center text-2xl lg:mb-0 lg:pb-0 lg:text-lg">
                        <img
                           src={user.avatarPath}
                           alt="user-avatar"
                           className="m-auto h-[80px] w-[80px] rounded-full lg:m-0 lg:h-[50px] lg:w-[50px] lg:hover:cursor-pointer"
                           onClick={() => {
                              document.querySelector(".user-menu").classList.toggle("lg:hidden");
                           }}
                        />
                     </li>
                     <div className="user-menu flex flex-col lg:absolute lg:top-16 lg:right-0 lg:hidden">
                        {adminRole[0] && (
                           <Link to="/admin_dashboard">
                              <Button color="yellow" hoverColor shadow textSize="login-button" onClick={hideUserButton}>
                                 Dashboard
                              </Button>
                           </Link>
                        )}

                        <Link to="/settings" className="m-auto my-3 inline">
                           <Button color="green" hoverColor shadow textSize="login-button" onClick={hideUserButton}>
                              Settings
                           </Button>
                        </Link>

                        <Button
                           color="red"
                           hoverColor
                           shadow
                           textSize="login-button"
                           onClick={() => {
                              logout();
                              history.push("/");
                              document.querySelector(".user-menu").classList.toggle("lg:hidden");
                           }}
                        >
                           Logout
                        </Button>
                     </div>
                  </>
               ) : isLoadingUser ? (
                  <Placeholder options={placeholderAvatar} />
               ) : (
                  <li>
                     <Link to="/login">
                        <Button color="cyan" textSize="login-button" hoverColor onClick={hideUserButton}>
                           Login
                        </Button>
                     </Link>
                  </li>
               )}
            </ul>

            <ul
               className="
               text-center 
               lg:flex"
            >
               <li
                  className="
                    mb-4 text-3xl 
                    lg:mb-0 lg:mr-5 lg:text-lg"
                  onClick={() => hideUserButton()}
               >
                  <Link className="duration-200 ease-in-out hover:text-blue-500" to="/">
                     Home
                  </Link>
               </li>
               <li
                  className="
                    mb-4 text-3xl
                    lg:mb-0 lg:mr-5 lg:text-lg"
                  onClick={() => hideUserButton()}
               >
                  <Link className="duration-200 ease-in-out hover:text-blue-500" to="/games">
                     Games
                  </Link>
               </li>
               <li
                  className="
                    mb-4 text-3xl
                    lg:mb-0 lg:mr-5 lg:text-lg"
                  onClick={() => hideUserButton()}
               >
                  <a className="duration-200 ease-in-out hover:text-blue-500" href="/#">
                     Community
                  </a>
               </li>
            </ul>
         </nav>
      </header>
   );
};
