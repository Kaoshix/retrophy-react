import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useGame = () => {
   const [game, setGame] = useState(null);
   const { gameId } = useParams();

   useEffect(() => {
      async function fetchGame() {
         await axios.get(`http://127.0.0.1:8000/api/games/${gameId}`)
            .then(response => setGame(response.data))
            .catch(error => console.log(error));
      }
      fetchGame();
   }, [gameId]);

   return { game, gameId };
};
