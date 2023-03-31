// React - packages
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import { Placeholder } from "../components/Placeholder";

// Custom hooks
import { FetchGame } from "../hooks/useGetApi";
import { AuthContext } from "../App";

// Variables - Constants
const placeholderGame = "max-w-[300px] h-[381px] rounded mb-3 lg:ml-0";
const placeholderGameTitle = "w-[300px] h-[50px] rounded mb-3 lg:ml-0";
const placeholderPlayButton = "h-[60px] w-[150px] rounded-lg m-auto";
const placeholderDescriptionTitle = "h-[40px] w-[150px] rounded mb-5";
const placeholderDescription = "h-[180px] w-[660px] rounded mb-5";
const placeholderGenre = "h-[50px] w-[150px] rounded";
const placeholderPublisher = "h-[50px] w-[150px] rounded";

export default function GameDetails() {
   const { game, gameId } = FetchGame();
   const { user, setUser, isLoadingUser } = useContext(AuthContext);

   const [favorite, setFavorite] = useState();

   useEffect(() => {
      if (user?.games.length > 0) {
         setFavorite(user?.games?.filter((game) => game.id === parseInt(gameId)));
      }
   }, [gameId, user?.games]);

   async function toggleFavorite() {
      await axios
         .post("http://127.0.0.1:8000/user/favorite", {
            game: gameId,
            user: user.id,
         })
         .then((response) => {
            setUser(response.data);
            setFavorite(!favorite);
         })
         .then((err) => console.log(err));
   }

   return (
      <div className="m-auto lg:max-w-screen-2xl">
         <Link to="/games" className="mb-3 inline-block">
            &lsaquo; Back to games list
         </Link>
         {game && !isLoadingUser ? (
            <div className="mb-5 flex">
               <div className="relative m-auto flex w-[300px] flex-col justify-center text-3xl lg:m-0">
                  <img src={game.imagePath} alt={game.slug} className="rounded" />
                  <h1 className="mt-5 mb-5 text-center">{game.title}</h1>
                  <Link to={`/games/run/${gameId}`} className="m-auto mb-1">
                     <Button color="blue" shadow="blue" textSize>
                        Play now
                     </Button>
                  </Link>

                  {user && (
                     <div className="absolute top-0 right-0 flex w-[10%] justify-center rounded bg-slate-200 px-1 pt-1">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="25"
                           height="25"
                           fill={!favorite || favorite.length < 1 ? "black" : "red"}
                           className="bi bi-heart duration-200 hover:scale-110 hover:cursor-pointer"
                           viewBox="0 0 16 16"
                           onClick={() => {
                              toggleFavorite();
                           }}
                        >
                           <path
                              fillRule="evenodd"
                              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                           />
                        </svg>
                     </div>
                  )}
               </div>
               <div className="hidden h-[381px] max-w-[700px] flex-col justify-between px-5 lg:flex">
                  <div>
                     <h2 className="mb-5 text-2xl">Description</h2>
                     <p className="mb-5 text-justify">{game?.description}</p>
                  </div>
                  <div className="flex justify-around">
                     <h2>{game?.genre?.name}</h2>
                     <h2>{game?.publisher?.name}</h2>
                  </div>
               </div>
            </div>
         ) : (
            <div className="mb-5 flex justify-center text-center lg:justify-start">
               <div>
                  <Placeholder options={placeholderGame} />
                  <Placeholder options={placeholderGameTitle} />
                  <Placeholder options={placeholderPlayButton} />
               </div>

               <div className="hidden h-[381px] max-w-[700px] flex-col justify-between px-5 lg:flex">
                  <div>
                     <Placeholder options={placeholderDescriptionTitle} />
                     <Placeholder options={placeholderDescription} />
                  </div>
                  <div className="flex justify-around">
                     <Placeholder options={placeholderGenre} />
                     <Placeholder options={placeholderPublisher} />
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
