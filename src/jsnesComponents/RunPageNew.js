import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StopWatch from "../components/StopWatch";
import Emulator from "./Emulator";
import { loadBinary } from "./utils";

const useFetchGames = () => {
   const [fetchedData, setFetchedData] = useState([]);

   useEffect(() => {
      async function fetchGames() {
         await axios
            .get("http://127.0.0.1:8000/api/games")
            .then((response) => {
               setFetchedData(response.data["hydra:member"]);
            })
            .catch((err) => console.log(err));
      }
      fetchGames();
   }, []);
   return fetchedData;
};

const useRom = (slug) => {
   const [data, setData] = useState('');
   const [error, setError] = useState('');

   const games = useFetchGames();

   useEffect(() => {
      if (games.length > 0 && !data) {
         const romInfo = games?.find((rom) => rom.slug === slug);

         try {
            loadBinary(
               `http://127.0.0.1:8000/nes${romInfo.romPath}`,
               (err, data) => {
                  if (err) {
                     setError(`Error loading ROM: ${err.message}`);
                  } else {
                     setData(data);
                  }
               }
            );
         } catch (error) {}
      }
   }, [games, data, slug]);

   return { data, error };
};

const RunPageNew = (props) => {
   const [isReady, setIsReady] = useState(false);
   const [isActive, setIsActive] = useState(false);
   const [isPaused, setIsPaused] = useState(true);

   const request = useRom(props.match.params.slug);
   const { error, data } = request;

   const handleTimerStart = () => {
      setIsActive(true);
      setIsPaused(false);
   };

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

               {data ? (
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
                     {isReady ? <Emulator romData={data} /> : ""}
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
