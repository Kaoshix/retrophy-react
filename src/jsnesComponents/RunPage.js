// Assets
import troph from "../assets/images/trophy.svg";

// React - packages
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Components
import Emulator from "./Emulator";
import { loadBinary } from "./utils";
import StopWatch from "../components/StopWatch";
import { Trophy } from "../components/Trophy";
import Button from "../components/Button";

// Custom hooks
import { FetchGame } from "../hooks/useGetApi";
import { TrophyMessage } from "../components/TrophyMessage";
import { useTrophy } from "../hooks/useTrophy";

const useRom = () => {
   const [data, setData] = useState(null);
   const [error, setError] = useState("");

   const { game } = FetchGame();

   useEffect(() => {
      try {
         loadBinary(`http://127.0.0.1:8000/nes${game.romPath}`, (err, data) => {
            if (err) {
               setError(`Error loading ROM: ${err.message}`);
            } else {
               setData(data);
            }
         });
      } catch (error) {}
   }, [game, data]);

   return { data, error, game };
};

const RunPage = () => {
   const [isReady, setIsReady] = useState(false);
   const [isPaused, setIsPaused] = useState(true);
   const trophyOpacity = "opacity-[0.35]";

   const { data, game } = useRom();
   const { time, setTime, user, translation, setTranslation } = useTrophy();

   const handleTimerStart = () => {
      setIsPaused(false);
   };

   return (
      <div className="absolute top-0 left-0">
         <div className="screen-container flex items-center justify-center">
            <TrophyMessage translation={translation} setTranslation={setTranslation} game={game} />
            <Link to="/games" className="absolute top-2 left-5 z-[1000]">
               &lsaquo; Back to Games list
            </Link>
            <StopWatch isPaused={isPaused} time={time} setTime={setTime} />
            <div className="trophy-screen absolute right-0 top-20 z-[1000] duration-300 ease-in-out">
               <div className="absolute top-0 left-[-50px] h-[50px] w-[100px] rounded-full bg-yellow-300"></div>
               <div
                  className="absolute top-1 left-[-45px] z-[1] flex h-[45px] w-[45px] cursor-pointer justify-center duration-200 hover:scale-110"
                  onClick={() => {
                     document.querySelector(".trophy-screen").classList.toggle("lg:translate-x-[-450px]");
                     document.querySelector(".trophy-screen").classList.toggle("translate-x-[-280px]");
                  }}
               >
                  <img src={troph} alt="trophy" className="w-[30px]" />
               </div>

               <div
                  className={`absolute top-0 left-0 w-[280px] rounded-lg border-l-[20px] border-yellow-300 bg-yellow-800 lg:w-[450px]`}
                  style={{
                     height: `${window.innerHeight - 80}px`,
                  }}
               >
                  <h1 className="mx-10 border-b-2 p-3 text-center text-3xl">Trophees</h1>

                  {user ? (
                     game?.trophy.map((gameTrophy) =>
                        user.trophy.length < 1 ? (
                           <Trophy key={gameTrophy.id} trophy={gameTrophy} trophyOpacity={trophyOpacity} />
                        ) : (
                           user.trophy.map((userTrophy) => {
                              if (userTrophy.id === gameTrophy.id) {
                                 return <Trophy key={gameTrophy.id} trophy={gameTrophy} />;
                              } else {
                                 return (
                                    <Trophy key={gameTrophy.id} trophy={gameTrophy} trophyOpacity={trophyOpacity} />
                                 );
                              }
                           })
                        )
                     )
                  ) : (
                     <>
                        {game?.trophy.map((gameTrophy) => (
                           <Trophy key={gameTrophy.id} trophy={gameTrophy} trophyOpacity={trophyOpacity} />
                        ))}
                        <div className="mt-8 text-center">
                           <p className="mx-5 text-xl">You have to be connected to earn trophees.</p>
                           <br />
                           <Link to="/login">
                              <Button color="blue" fontSize="big">
                                 Login
                              </Button>
                           </Link>
                        </div>
                     </>
                  )}
               </div>
            </div>

            {data ? (
               <>
                  <Button
                     color="blue"
                     shadow="blue"
                     fontSize="big"
                     onClick={() => {
                        setIsReady(true);
                        handleTimerStart();
                     }}
                  >
                     Start
                  </Button>
                  {!user && (
                     <div className="absolute bottom-1 z-[1]">
                        Playing as invited mode.{" "}
                        <Link to="/login" className="text-blue-500">
                           Login
                        </Link>
                     </div>
                  )}
                  {isReady ? <Emulator romData={data} /> : ""}
               </>
            ) : (
               <div className="text-4xl">Loading...</div>
            )}
         </div>
      </div>
   );
};

export default RunPage;
