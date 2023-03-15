// React - packages
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Placeholder } from "../components/Placeholder";

// Custom hooks
import { useGame } from "../hooks/useGame";

// Variables - Constants
const placeholderGame = "max-w-[300px] h-[381px] rounded mb-3 lg:ml-0";
const placeholderGameTitle = "w-[300px] h-[50px] rounded mb-3 lg:ml-0";
const placeholderPlayButton = "h-[60px] w-[150px] rounded-lg m-auto";
const placeholderDescriptionTitle = "h-[40px] w-[150px] rounded mb-5";
const placeholderDescription = "h-[180px] w-[660px] rounded mb-5";
const placeholderGenre = "h-[50px] w-[150px] rounded";
const placeholderPublisher = "h-[50px] w-[150px] rounded";
const playButton =
   "w-[150px] text-3xl bg-blue-500 shadow-lg shadow-blue-500/50 hover:bg-blue-700 block m-auto mt-5";

export default function GameDetails() {
   const { game, gameId } = useGame();

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
                     className="rounded"
                  />
                  <h1 className="text-center mt-5">{game.title}</h1>
                  <Link to={`/games/run/${gameId}`}>
                     <Button options={playButton}>Play</Button>
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
                  <Placeholder options={placeholderGame} />
                  <Placeholder options={placeholderGameTitle} />
                  <Placeholder options={placeholderPlayButton} />
               </div>

               <div className="hidden lg:flex flex-col justify-between px-5 max-w-[700px] h-[381px]">
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
