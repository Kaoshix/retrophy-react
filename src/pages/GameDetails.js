// React - packages
import { Link } from "react-router-dom";
import Button from "../components/Button";
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
const playButton = "w-[150px] text-3xl bg-blue-500 shadow-lg shadow-blue-500/50 hover:bg-blue-700 block m-auto mt-5";

export default function GameDetails() {
   const { game, gameId } = useGame();

   return (
      <div className="m-auto lg:max-w-screen-2xl">
         <Link to="/games" className="mb-3 inline-block">
            &lsaquo; Back to games list
         </Link>
         {game ? (
            <div className="mb-5 flex">
               <div className="m-auto w-[300px] text-3xl lg:m-0">
                  <img src={game.imagePath} alt={game.slug} className="rounded" />
                  <h1 className="mt-5 text-center">{game.title}</h1>
                  <Link to={`/games/run/${gameId}`}>
                     <Button options={playButton}>Play</Button>
                  </Link>
               </div>
               <div className="hidden h-[381px] max-w-[700px] flex-col justify-between px-5 lg:flex">
                  <div>
                     <h2 className="mb-5 text-2xl">Description</h2>
                     <p className="text-justify">{game?.description}</p>
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
