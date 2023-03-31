// Assets
import avatar from "../assets/images/avatar_default.webp";

// React - packages
import { useContext } from "react";

// Components
import troph from "../assets/images/trophy.svg";
import { PopupMessage } from "../components/PopupMessage";

// Custom hooks
import { AuthContext } from "../App";
import { Game } from "../components/Game";
import Button from "../components/Button";
import { Link, useLocation } from "react-router-dom";

export default function Profil() {
   const { user } = useContext(AuthContext);
   const location = useLocation();

   return (
      <>
         {location.state && location.state.successMessage && <PopupMessage message={location.state.successMessage} />}
         {user ? (
            <div className="m-auto max-w-screen-2xl rounded p-10">
               <div className="lg:flex">
                  <div className="lg:mr-10">
                     <img
                        src={user.avatarPath === "http://127.0.0.1:8000" ? avatar : user.avatarPath}
                        alt="random"
                        className="m-auto mb-2 h-[80px] w-[80px] rounded-full"
                     />
                     <h1 className="mb-2 text-center text-2xl">{user.nickname}</h1>

                     <Link to="settings" className="mb-5 flex justify-center">
                        <Button color="blue">Settings</Button>
                     </Link>
                  </div>

                  <div className="mb-10 min-h-[200px] grow rounded bg-slate-800 p-3 lg:min-h-[300px]">
                     <h1 className="mb-5 text-center text-xl">Trophies Showcase</h1>
                     {user?.trophy?.length >= 1 ? (
                        user.trophy.map((trophy) => (
                           <div key={trophy.id}>
                              <div className="flex justify-center lg:justify-start">
                                 <img src={troph} alt="trophy" className="mr-2" />
                                 <h2 className="text-2xl font-bold">{trophy.name}</h2>
                              </div>
                              <p className="text-center lg:text-left">{trophy.description}</p>
                           </div>
                        ))
                     ) : (
                        <p>You don't have any trophy</p>
                     )}
                  </div>
               </div>
               <div>
                  <h2 className="mb-5 text-center text-4xl lg:text-left">Favorites</h2>
                  {user?.games?.map((game) => (
                     <Game key={game.id} game={game} />
                  ))}
               </div>
            </div>
         ) : (
            "Loading..."
         )}
      </>
   );
}
