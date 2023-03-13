import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StopWatch from "../components/StopWatch";
import Emulator from "./Emulator";
import { loadBinary } from "./utils";

import troph from "../assets/images/trophy.svg";
import useUser from "../hooks/useUser";
import { PopUpMessage } from "../components/PopUpMessage";

const useFetchGames = () => {
   const { gameId } = useParams();
   const [game, setGame] = useState(null);

   useEffect(() => {
      async function fetchGame() {
         await axios
            .get(`http://127.0.0.1:8000/api/games/${gameId}`)
            .then((response) => {
               setGame(response.data);
            })
            .catch((err) => console.log(err));
      }
      fetchGame();
   }, [gameId]);

   return game;
};

const useRom = () => {
   const [data, setData] = useState(null);
   const [error, setError] = useState('');

   const game = useFetchGames();

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
   const [isActive, setIsActive] = useState(false);
   const [isPaused, setIsPaused] = useState(true);
   const [time, setTime] = useState(0);
   const [message, setMessage] = useState('');

   const { error, data, game } = useRom();
   const { user } = useUser();

   useEffect(() => {
      if (time === 500) {
         setMessage(
            <div className="flex p-3">
               <img src={troph} alt="trophy" className="mr-5" />
               <div>
                  <h2 className="text-2xl font-bold">{game.trophy[0].name}</h2>
                  <p>{game.trophy[0].description}</p>
               </div>
               <div className="absolute top-0 right-3 text-2xl cursor-pointer"
                     onClick={() => setMessage(null)}
               >X</div>
            </div>
         );
         async function setTrophy() {
            await axios
               .post("http://127.0.0.1:8000/api/earn-trophy", {
                  id: game?.trophy[0].id,
                })
               .then((response) => console.log(response.data));
         }
         setTrophy();
      }
   }, [time, game?.trophy]);

   const handleTimerStart = () => {
      setIsActive(true);
      setIsPaused(false);
   };

   return (
      <div className="absolute top-0 left-0 min-h-screen">
         {error ? (
            <div className="absolute top-10 left-10">
               Error while trying to launch the emulator
            </div>
         ) : (
            <div className="screen-container flex justify-center items-center">
               <PopUpMessage message={message}/>

               <Link to="/games" className="absolute top-2 left-5 z-[1000]">
                  &lsaquo; Back to Games list
               </Link>
               <StopWatch
                  isActive={isActive}
                  isPaused={isPaused}
                  time={time}
                  setTime={setTime}
               />
               <div className="trophy-screen duration-300 ease-in-out absolute right-3 top-20 z-[1000]">
                  <div className="bg-yellow-300 h-[45px] w-[100px] absolute top-10 left-[-30px] rounded-lg"></div>
                  <div
                     className="rounded-full bg-yellow-500 h-[45px] w-[45px] absolute top-10 right-0 flex justify-center hover:scale-110 duration-200 cursor-pointer"
                     onClick={() => {
                        document
                           .querySelector(".trophy-screen")
                           .classList.toggle("translate-x-[-500px]");
                     }}
                  >
                     <img src={troph} alt="trophy" className="w-[30px]" />
                  </div>
                  <div
                     className={`absolute top-0 left-5 bg-yellow-800 rounded-lg border-l-[20px] border-yellow-300`}
                     style={{
                        height: `${window.innerHeight - 80}px`,
                        width: `500px`,
                     }}
                  >
                     <h1 className="text-center text-3xl p-3 border-b-2 mx-10">
                        Trophees
                     </h1>

                     {game?.trophy?.map((gameTroph) =>
                        user ? (
                           user?.trophy
                              ?.filter((trophy) => trophy.id === gameTroph.id)
                              .map(() => {
                                 return (
                                    <div
                                       key={gameTroph.id}
                                       className="mt-5 ml-3"
                                    >
                                       <div className="flex">
                                          <img
                                             src={troph}
                                             alt="trophy"
                                             className="mr-5"
                                          />
                                          <div>
                                             <h2 className="text-2xl font-bold">
                                                {gameTroph.name}
                                             </h2>
                                             <p>{gameTroph.description}</p>
                                          </div>
                                       </div>
                                    </div>
                                 );
                              })
                        ) : (
                           <div
                              key={gameTroph.id}
                              className="mt-5 ml-3 opacity-40"
                           >
                              <div className="flex">
                                 <div className="flex justify-center items-center">
                                    <div className="mr-5 h-[25px] w-[25px] rounded-lg bg-slate-300"></div>
                                 </div>
                                 <div>
                                    <h2 className="text-2xl font-bold">
                                       {gameTroph.name}
                                    </h2>
                                    <p>{gameTroph.description}</p>
                                 </div>
                              </div>
                           </div>
                        )
                     )}

                     {!user && (
                        <div className="text-center mt-5">
                           <span className="text-xl">
                              You have to be connected to earn trophees.
                           </span>
                           <br />
                           <Link
                              to="/login"
                              className="inline-block text-2xl py-2 px-6 mt-3 bg-blue-500 shadow-lg hover:bg-cyan-700 duration-200 ease-in-out rounded-lg"
                           >
                              Login
                           </Link>
                        </div>
                     )}
                  </div>
               </div>

               {data ? (
                  <>
                     {!user && (
                        <div className="absolute bottom-2 z-[1000]">
                           Playing as invited mode.{" "}
                           <Link to="/login" className="text-blue-500">
                              Login
                           </Link>
                        </div>
                     )}
                     <button
                        className="inline-block px-10 py-3 rounded-lg text-4xl cursor-pointer bg-blue-500 shadow-lg shadow-blue-500/50 hover:bg-blue-700 duration-150 ease-in-out"
                        onClick={() => {
                           setIsReady(true);
                           handleTimerStart();
                        }}
                     >
                        Start
                     </button>
                     {isReady ? <Emulator romData={data} /> : ""}
                  </>
               ) : (
                  <div className="text-4xl">Loading...</div>
               )}
            </div>
         )}
      </div>
   );
};

export default RunPage;
