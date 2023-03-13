import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function GameDetails() {
   const [game, setGame] = useState(null);
   const { gameId } = useParams();

   useEffect(() => {
      async function fetchGame() {
         const response = await fetch(
            `http://127.0.0.1:8000/api/games/${gameId}`
         );
         const gameInfos = await response.json();
         setGame(gameInfos);
      }
      fetchGame();
   }, [gameId]);

   return (
      <div className="lg:max-w-screen-2xl m-auto">
         <Link to="/games" className="mb-3 inline-block">
            &lsaquo; Back to games list
         </Link>
         {game ? (
            <div className="flex mb-5">
               <div className="text-3xl w-[300px] m-auto lg:m-0">
                  <img
                     src={game.imagePath}
                     alt={game.slug}
                     className="rounded-lg"
                  />
                  <h1 className="text-center mt-5">{game.title}</h1>
                  <Link
                     to={`/games/run/${gameId}`}
                     className="bg-blue-500 shadow-lg shadow-blue-500/50 py-2 px-6 text-center rounded-lg block m-auto mt-5 w-[150px] hover:bg-blue-700 duration-150 ease-in-out"
                  >
                     Play
                  </Link>
               </div>
               <div className="hidden lg:flex flex-col justify-between px-5 max-w-[700px] h-[381px]">
                  <div>
                     <h2 className="text-2xl mb-5">Description</h2>
                     <p className="text-justify">{game?.description}</p>
                  </div>
                  <div className="flex justify-around">
                     <h2>{game?.genre?.name}</h2>
                     <h2>{game?.publisher?.name}</h2>
                  </div>
               </div>
            </div>
         ) : (
            <div className="flex text-center justify-center lg:justify-start mb-5">
               <div>
                  <div className="max-w-[300px] h-[381px] bg-slate-800 rounded-lg animate-pulse mb-3 lg:ml-0"></div>
                  <div className="w-[300px] h-[50px] bg-slate-800 rounded-lg animate-pulse mb-3 lg:ml-0"></div>
                  <div className="h-[52px] w-[150px] bg-slate-800 animate-pulse rounded-lg m-auto"></div>
               </div>

               <div className="hidden lg:flex flex-col justify-between px-5 max-w-[700px] h-[381px]">
                  <div>
                     <div className="mb-5 h-[40px] w-[150px] bg-slate-800 animate-pulse rounded-lg"></div>
                     <div className="mb-5 h-[180px] bg-slate-800 w-[660px] animate-pulse rounded-lg"></div>
                  </div>
                  <div className="flex justify-around">
                     <div className="h-[50px] bg-slate-800 w-[150px] animate-pulse rounded-lg"></div>
                     <div className="h-[50px] bg-slate-800 w-[150px] animate-pulse rounded-lg"></div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
