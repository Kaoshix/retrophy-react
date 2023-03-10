import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StopWatch from "../components/StopWatch";
import Emulator from "./Emulator";
import { loadBinary } from "./utils";

const RunPageNew = (props) => {
   const [romData, setRomData] = useState(null);
   const [error, setError] = useState('');
   const [fetchedData, setFetchedData] = useState(null);
   const [isReady, setIsReady] = useState(false);

   const [isActive, setIsActive] = useState(false);
   const [isPaused, setIsPaused] = useState(true);

   const handleTimerStart = () => {
      setIsActive(true);
      setIsPaused(false);
   };

   const load = () => {
      if (fetchedData) {
         if (props.match.params.slug) {
            const slug = props.match.params.slug;
            const romInfo = fetchedData.find((rom) => rom.slug === slug);

            if (!romInfo) {
               setError(`No such ROM: ${slug}`);
               return;
            }

            loadBinary(
               `http://127.0.0.1:8000/nes${romInfo.romPath}`,
               (err, data) => {
                  if (err) {
                     setError(`Error loading ROM: ${err.message}`);
                  } else {
                     setRomData(data);
                  }
               }
            );
         }
      }

   };

   useEffect(() => {
         async function fetchGames() {
            await axios
               .get("http://127.0.0.1:8000/api/games")
               .then((response) => {
                  setFetchedData(response.data);
               })
               .catch((err) => setError(err));
         }
         if (!fetchedData) {
            fetchGames();
         }

         if (!romData) {
            load();
         }
   });

   return (
      <>
         {error ? (
            <div className="absolute top-10 left-10">
               Error while trying to launch the emulator
            </div>
         ) : (
            <div className="screen-container">
               <Link to="/games">&lsaquo; Back to Games list</Link>
               <StopWatch isActive={isActive} isPaused={isPaused} />

               {romData && fetchedData ? (
                  <>
                     <div
                        className="flex justify-center items-center mt-20 text-4xl cursor-pointer"
                        onClick={() => {
                           setIsReady(true);
                           handleTimerStart();
                        }}
                     >
                        Play
                     </div>
                     {isReady ? <Emulator romData={romData} /> : ""}
                  </>
               ) : (
                  <div className="flex justify-center items-center mt-20 text-4xl">
                     Loading...
                  </div>
               )}
            </div>
         )}
      </>
   );
};

export default RunPageNew;
