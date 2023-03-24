// Assets
import heroBanner from "../assets/images/heroBanner.svg";
import gold from "../assets/images/gold.png";
import silver from "../assets/images/silver.png";
import bronze from "../assets/images/bronze.png";

// React - packages
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import axios from "axios";

// Components
import { Game } from "../components/Game";
import { Genre, Placeholder as GenrePlaceholder } from "../components/Genre";
import { Player } from "../components/Player";
import { Blur } from "../components/Blur";
import Button from "../components/Button";
import { Placeholder } from "../components/Placeholder";
import { PopupMessage } from "../components/PopupMessage";

// Custom hooks
import { FetchGenres } from "../hooks/useGetApi";
import { FetchPlayers } from "../hooks/useGetApi";

// Variables - Constants
const placeholderGame = "h-[317px] w-[250px] m-3 rounded";
const placeholderPlayer = "w-[80vw] h-[80px] mb-10 rounded-full lg:w-[400px] lg:mx-auto";

const HeroBanner = () => {
   return (
      <div
         className="relative m-auto mb-10 max-w-screen-2xl 
         lg:flex lg:flex-row-reverse lg:items-center lg:justify-around"
      >
         <Blur />

         <div className="mb-5 flex justify-center">
            <img src={heroBanner} alt="hero-banner" />
         </div>
         <div className="text-center lg:text-left">
            <h1 className="mb-5 text-4xl lg:text-6xl lg:leading-tight">
               Play <span className="text-blue-700">retro games</span>
               <br /> and earn
               <span className="text-blue-700"> trophies</span>
            </h1>
            <Link to="/games">
               <Button color="blue" fontSize="big" shadow="blue">
                  Play now
               </Button>
            </Link>
         </div>
      </div>
   );
};

const Genres = () => {
   const { genres } = FetchGenres();

   return (
      <div
         className="
         m-auto mb-10
         lg:max-w-screen-2xl "
      >
         <h2
            className="
            mb-5 text-center text-4xl 
            lg:text-left"
         >
            Genres
         </h2>

         <div className="lg:flex lg:justify-between">
            {genres ? (
               genres.map((genre) => <Genre key={genre.id} genre={genre} />)
            ) : (
               <>
                  <GenrePlaceholder />
                  <GenrePlaceholder />
                  <GenrePlaceholder />
                  <GenrePlaceholder />
               </>
            )}
         </div>
      </div>
   );
};

const LatestAdd = () => {
   const [games, setGames] = useState(null);

   useEffect(() => {
      axios.get("http://127.0.0.1:8000/games/latest_add").then((response) => setGames(response.data));
   }, []);

   return (
      <div
         className="
         m-auto mb-10 
         lg:max-w-screen-2xl"
      >
         <h2
            className="
            mb-5 text-center text-4xl 
            lg:text-left"
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
            flex justify-center text-xl 
            lg:justify-end"
         >
            <Link to="/games">See all games &#8250;</Link>
         </div>
      </div>
   );
};

const LeaderBoard = () => {
   const { bestPlayers } = FetchPlayers();

   return (
      <div>
         <h2 className="mb-5 text-center text-3xl">LeaderBoard</h2>
         <div className="m-auto max-w-screen-lg">
            <div>
               {bestPlayers ? (
                  bestPlayers.map((player, index) => (
                     <div key={player.id} className="mb-10 flex items-center justify-center">
                        {index === 0 ? (
                           <img src={gold} alt="gold-medal" />
                        ) : index === 1 ? (
                           <img src={silver} alt="silver-medal" />
                        ) : index === 2 ? (
                           <img src={bronze} alt="bronze-medal" />
                        ) : (
                           <span className="h-[34px] w-[25px]"></span>
                        )}
                        <p className="relative ml-2 flex text-lg">{index + 1}</p>
                        <Player player={player} />
                     </div>
                  ))
               ) : (
                  <div className="flex flex-col items-center justify-center">
                     <Placeholder options={placeholderPlayer} />
                     <Placeholder options={placeholderPlayer} />
                     <Placeholder options={placeholderPlayer} />
                     <Placeholder options={placeholderPlayer} />
                     <Placeholder options={placeholderPlayer} />
                  </div>
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

   return (
      <div>
         {location.state && location.state.successMessage && <PopupMessage message={location.state.successMessage} />}
         <HeroBanner />
         <Genres />
         <LatestAdd />
         <LeaderBoard />
      </div>
   );
}

export default HomePage;
