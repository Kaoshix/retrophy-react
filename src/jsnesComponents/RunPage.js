// Assets
import troph from "../assets/images/trophy.svg";
import controller from "../assets/images/nes_controller.png";
import keyboard from "../assets/images/keyboard.png";

// React - packages
import { useContext, useEffect, useState } from "react";
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
import { AuthContext } from "../App";

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
      } catch (error) { }
   }, [game, data]);

   return { data, error, game };
};

const RunPage = () => {
   const [isReady, setIsReady] = useState(false);
   const [isPaused, setIsPaused] = useState(true);

   const { data, game } = useRom();
   const { time, setTime, translation, setTranslation } = useTrophy();
   const { user } = useContext(AuthContext);
   const [filteredTrophy, setFilteredTrophy] = useState();

   const [isTrophyModal, setIsTrophyModal] = useState(false);
   const [isControlModal, setIsControlModal] = useState(false);

   const opac = "opacity-[0.35]";

   useEffect(() => {
      setFilteredTrophy(user?.trophy?.filter((trophy) => trophy?.id === game?.trophy[0]?.id));
   }, [game?.trophy, user?.trophy]);

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
            <div
               className={`absolute right-0 top-20 z-[1000] duration-300 ease-in-out ${
                  isTrophyModal ? "translate-x-[-280px] lg:translate-x-[-450px]" : ""
               }`}
            >
               <div className="absolute top-0 left-[-50px] h-[50px] w-[100px] rounded-full bg-yellow-300"></div>
               <div
                  className="absolute top-1 left-[-45px] z-[1] flex h-[45px] w-[45px] cursor-pointer justify-center duration-200 hover:scale-110"
                  onClick={() => setIsTrophyModal(!isTrophyModal)}
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
                     <>
                        <Trophy trophy={game?.trophy[0]} opac={filteredTrophy} />
                        <Trophy trophy={game?.trophy[1]} opacity={opac} />
                     </>
                  ) : (
                     <>
                        {game?.trophy?.map((gameTrophy) => {
                           return <Trophy key={gameTrophy.id} trophy={gameTrophy} opacity={opac} />;
                        })}
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

            {/* control modal */}
            <div
               className={`absolute top-36 right-0 z-[1000] duration-300 ease-in-out ${
                  isControlModal ? "translate-x-[-280px] lg:translate-x-[-450px]" : ""
               }`}
            >
               <div className="absolute top-0 left-[-50px] h-[50px] w-[100px] rounded-full bg-green-500"></div>
               <div
                  className="absolute top-1 left-[-45px] z-[1] flex h-[45px] w-[45px] cursor-pointer justify-center duration-200 hover:scale-110"
                  onClick={() => setIsControlModal(!isControlModal)}
               >
                  <img src={controller} alt="controller" className="w-[40px]" />
               </div>

               <div
                  className={`absolute top-0 left-0 w-[280px] rounded-lg border-l-[20px] border-green-500 bg-green-800 lg:w-[450px]`}
                  style={{
                     height: `${window.innerHeight - 144}px`,
                  }}
               >
                  <h1 className="mx-10 mb-5 border-b-2 p-3 text-center text-3xl">Controls</h1>
                  <div className="mb-5 flex flex-col items-center justify-center">
                     <img src={keyboard} alt="keyboard" className="w-[80px]" />
                     <h2>Keyboard Controls</h2>
                  </div>

                  <ul className="p-5">
                     <li>Button A : C</li>
                     <li>Button B : X</li>
                     <li>Start : Enter</li>
                     <li>Select : R</li>
                     <li>Up : Up arrow</li>
                     <li>Down : Down arrow</li>
                     <li>Left : Left arrow</li>
                     <li>Right : Right arrow</li>
                  </ul>
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
