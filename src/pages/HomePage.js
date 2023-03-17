// Assets
import heroBanner from "../assets/images/heroBanner.svg";
import gold from "../assets/images/gold.png";
import silver from "../assets/images/silver.png";
import bronze from "../assets/images/bronze.png";

// React - packages
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";

// Components
import { Game } from "../components/Game";
import { Genre } from "../components/Genre";
import { Player } from "../components/Player";
import { Blur } from "../components/Blur";
import { Button } from "../components/Button";
import { Placeholder } from "../components/Placeholder";
import { PopupMessage } from "../components/PopupMessage";

// Custom hooks
import { GameContext } from "../App";
import { useGenre } from "../hooks/useGenre";
import { usePlayers } from "../hooks/usePlayers";

// Variables - Constants
const playButton =
   "text-3xl bg-blue-500 shadow-lg shadow-blue-500/50 hover:bg-blue-700";
const placeholderGenre =
   "max-w-[350px] h-[150px] m-auto mt-20 rounded lg:w-[25vw] lg:h-[150px] lg:mt-0 lg:mx-3";
const placeholderGame = "h-[317px] w-[250px] m-3 rounded";
const placeholderPlayer =
   "w-[80vw] h-[80px] mb-10 rounded-full lg:w-[400px] lg:mx-auto";

const HeroBanner = () => {
   return (
      <div
         className="
         max-w-screen-2xl m-auto relative mb-10 
         lg:flex lg:flex-row-reverse lg:justify-around lg:items-center"
      >
         <Blur />

         <div className="flex justify-center mb-5">
            <img src={heroBanner} alt="hero-banner" />
         </div>
         <div
            className="
            text-center 
            lg:text-left"
         >
            <h1
               className="
               text-4xl mb-5 
               lg:text-6xl lg:leading-tight"
            >
               Play <span className="text-blue-700">retro games</span>
               <br /> and earn
               <span className="text-blue-700"> trophies</span>
            </h1>
            <Link to="/games">
               <Button options={playButton}>Play now</Button>
            </Link>
         </div>
      </div>
   );
};

const Genres = () => {
   const { genres } = useGenre();

   return (
      <div
         className="
         mb-10 m-auto
         lg:max-w-screen-2xl "
      >
         <h2
            className="
            mb-5 text-4xl text-center 
            lg:text-left"
         >
            Genres
         </h2>

         <div className="lg:flex lg:justify-between">
            {genres ? (
               genres.map((genre) => <Genre key={genre.id} genre={genre} />)
            ) : (
               <>
                  <Placeholder options={placeholderGenre} />
                  <Placeholder options={placeholderGenre} />
                  <Placeholder options={placeholderGenre} />
                  <Placeholder options={placeholderGenre} />
               </>
            )}
         </div>
      </div>
   );
};

const LatestAdd = () => {
   const { games } = useContext(GameContext);

   return (
      <div
         className="
         mb-10 m-auto 
         lg:max-w-screen-2xl"
      >
         <h2
            className="
            text-4xl text-center mb-5 
            lg:text-left lg:text-left"
         >
            Latest add
         </h2>

         <ScrollingCarousel className="flex">
            <div className="flex">
               {games ? (
                  games.map((game) => {
                     return <Game game={game} key={game.id} />;
                  })
               ) : (
                  <>
                     <Placeholder options={placeholderGame} />
                     <Placeholder options={placeholderGame} />
                     <Placeholder options={placeholderGame} />
                     <Placeholder options={placeholderGame} />
                     <Placeholder options={placeholderGame} />
                     <Placeholder options={placeholderGame} />
                     <Placeholder options={placeholderGame} />
                     <Placeholder options={placeholderGame} />
                     <Placeholder options={placeholderGame} />
                     <Placeholder options={placeholderGame} />
                  </>
               )}
            </div>
         </ScrollingCarousel>

         <div
            className="
            text-xl flex justify-center 
            lg:justify-end"
         >
            <Link to="/games">See all games &#8250;</Link>
         </div>
      </div>
   );
};

const LeaderBoard = () => {
   const { bestPlayers } = usePlayers();

   return (
      <div>
         <h2 className="text-3xl text-center mb-5">LeaderBoard</h2>
         <div className="max-w-screen-lg m-auto">
            <div>
               {bestPlayers ? (
                  bestPlayers.map((player, index) => (
                     <div
                        key={player.id}
                        className="flex items-center justify-center mb-10"
                     >
                        {index === 0 ? (
                           <img src={gold} alt="gold-medal" />
                        ) : index === 1 ? (
                           <img src={silver} alt="silver-medal" />
                        ) : index === 2 ? (
                           <img src={bronze} alt="bronze-medal" />
                        ) : (
                           <span className="w-[25px] h-[34px]"></span>
                        )}
                        <p className="text-lg flex relative ml-2">
                           {index + 1}
                        </p>
                        <Player player={player} />
                     </div>
                  ))
               ) : (
                  <>
                     <Placeholder options={placeholderPlayer} />
                     <Placeholder options={placeholderPlayer} />
                     <Placeholder options={placeholderPlayer} />
                     <Placeholder options={placeholderPlayer} />
                     <Placeholder options={placeholderPlayer} />
                  </>
               )}
            </div>
         </div>
      </div>
   );
};

// ##################################################################### //
// ############################ Export Home ############################ //
// ##################################################################### //
function HomePage() {
   const location = useLocation();
   const [translation, setTranslation] = useState('');

   useEffect(() => {
      setTranslation("translate-y-[150px]");

      setTimeout(() => {
         setTranslation("");
         window.history.replaceState({}, document.title)
      }, 4000);
   }, []);

   return (
      <div>
         {location.state && location.state.registrationSuccessMessage && (
            <PopupMessage message={location.state.registrationSuccessMessage} translation={translation} />
         )}
         <HeroBanner />
         <Genres />
         <LatestAdd />
         <LeaderBoard />
      </div>
   );
}

export default HomePage;
