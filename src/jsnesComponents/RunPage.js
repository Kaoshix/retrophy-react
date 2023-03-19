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

// Custom hooks
import { useGame } from "../hooks/useGame";
import { TrophyMessage } from "../components/TrophyMessage";
import { useTrophy } from "../hooks/useTrophy";

const useRom = () => {
   const [data, setData] = useState(null);
   const [error, setError] = useState("");

   const { game } = useGame();

   useEffect(() => {
      try {
         loadBinary(`http://127.0.0.1:8000/nes${game.romPath}`, (err, data) => {
            if (err) {
               setError(`Error loading ROM: ${err.message}`);
            } else {
               setData(data);
            }
         });
      } catch (error) { }
   }, [game, data]);

   return { data, error, game };
};

const RunPage = () => {
   const [isReady, setIsReady] = useState(false);
   const [isActive, setIsActive] = useState(false);
   const [isPaused, setIsPaused] = useState(true);
   const trophyOpacity = "opacity-[0.35]";

   const { data, game } = useRom();
   const { time, setTime, user, translation, setTranslation } = useTrophy();

   const handleTimerStart = () => {
      setIsActive(true);
      setIsPaused(false);
   };

   return (
      <div className="absolute top-0 left-0">
         <div className="screen-container flex justify-center items-center">
            <TrophyMessage
               translation={translation}
               setTranslation={setTranslation}
               game={game}
            />
            <Link to="/games" className="absolute top-2 left-5 z-[1000]">
               &lsaquo; Back to Games list
            </Link>
            <StopWatch
               isActive={isActive}
               isPaused={isPaused}
               time={time}
               setTime={setTime}
            />
            <div className="trophy-screen duration-300 ease-in-out absolute right-0 top-20 z-[1000]">
               <div className="bg-yellow-300 h-[50px] w-[100px] absolute top-0 left-[-50px] rounded-full"></div>
               <div
                  className="h-[45px] w-[45px] absolute top-1 left-[-45px] z-[1] flex justify-center hover:scale-110 duration-200 cursor-pointer"
                  onClick={() => {
                     document
                        .querySelector(".trophy-screen")
                        .classList.toggle("lg:translate-x-[-450px]");
                     document
                        .querySelector(".trophy-screen")
                        .classList.toggle("translate-x-[-280px]");
                  }}
               >
                  <img src={troph} alt="trophy" className="w-[30px]" />
               </div>

               <div
                  className={`w-[280px] lg:w-[450px] absolute top-0 left-0 bg-yellow-800 rounded-lg border-l-[20px] border-yellow-300`}
                  style={{
                     height: `${window.innerHeight - 80}px`,
                  }}
               >
                  <h1 className="text-center text-3xl p-3 border-b-2 mx-10">
                     Trophees
                  </h1>

                  {user
                     ? game?.trophy.map((gameTrophy) =>
                        user.trophy.length < 1 ? (
                           <Trophy
                              key={gameTrophy.id}
                              trophy={gameTrophy}
                              trophyOpacity={trophyOpacity}
                           />
                        ) : (
                           user.trophy.map((userTrophy) => {
                              if (userTrophy.id === gameTrophy.id) {
                                 return (
                                    <Trophy
                                       key={gameTrophy.id}
                                       trophy={gameTrophy}
                                    />
                                 );
                              } else {
                                 return (
                                    <Trophy
                                       key={gameTrophy.id}
                                       trophy={gameTrophy}
                                       trophyOpacity={trophyOpacity}
                                    />
                                 );
                              }
                           })
                        )
                     )
                     : game?.trophy.map((gameTrophy) => (
                        <Trophy
                           key={gameTrophy.id}
                           trophy={gameTrophy}
                           trophyOpacity={trophyOpacity}
                        />
                     ))}

                  {!user && (
                     <div className="text-center mt-8">
                        <p className="text-xl mx-5">
                           You have to be connected to earn trophees.
                        </p>
                        <br />
                        <Link
                           to="/login"
                           className="text-2xl py-2 px-6 bg-blue-500 shadow-lg hover:bg-cyan-700 duration-200 ease-in-out rounded-lg"
                        >
                           Login
                        </Link>
                     </div>
                  )}
               </div>
            </div>

            {data ? (
               <>
                  <button
                     className="inline-block px-10 py-3 rounded-lg text-4xl cursor-pointer bg-blue-500 shadow-lg shadow-blue-500/50 hover:bg-blue-700 duration-150 ease-in-out"
                     onClick={() => {
                        setIsReady(true);
                        handleTimerStart();
                     }}
                  >
                     Start
                  </button>
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
