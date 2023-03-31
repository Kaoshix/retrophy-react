// Assets
import avatar from "../assets/images/avatar_default.webp";
import banner from "../assets/images/banner.png";

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
            <div className="relative m-auto max-w-screen-2xl rounded">
               <div
                  className="mb-5 h-[200px] w-full"
                  style={{ backgroundImage: `url(${banner})`, backgroundSize: "cover" }}
               ></div>
               <div className="lg:flex">
                  <div className="lg:mr-10 lg:px-20">
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

                  <div className="mb-10 min-h-[200px] grow rounded border border-slate-600 p-3 lg:min-h-[300px]">
                     <h1 className="mb-5 text-center text-3xl">Trophies Showcase</h1>
                     {user?.trophy?.length >= 1 ? (
                        user.trophy.map((trophy) => (
                           <div key={trophy.id} className="mb-10">
                              <h1 className="mb-2 border-b-2 border-slate-600 text-center text-4xl text-slate-300 lg:text-left">
                                 {trophy.game.title}
                              </h1>
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
               <div className="max-w-full">
                  <h2 className="mb-5 text-center text-4xl lg:text-left">Favorites</h2>
                  <div className="flex flex-col items-center justify-center lg:flex-row lg:flex-wrap lg:justify-start">
                     {user?.games?.map((game) => (
                        <div key={game.id}>
                           <Game game={game} />
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         ) : (
            "Loading..."
         )}
      </>
   );
}
