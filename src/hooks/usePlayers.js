import axios from "axios";
import { useEffect, useState } from "react";

export const usePlayers = () => {

   const [bestPlayers, setBestPlayers] = useState(null);

   useEffect(() => {
      async function fetchData() {
         await axios.get("http://127.0.0.1:8000/api/best_players")
            .then(response => setBestPlayers(response.data))
            .catch(error => console.log(error));
      }
      fetchData();
   }, []);

   return { bestPlayers }
}