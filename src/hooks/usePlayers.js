import axios from "axios";
import { useEffect, useState } from "react";

export const usePlayers = () => {

    const [players, setPlayers] = useState(null);
    let filteredPlayers = players?.slice(0, 5);
 
    useEffect(() => {
       async function fetchData() {
          await axios.get("http://127.0.0.1:8000/api/users")
          .then(response => setPlayers(response.data))
          .catch(error => console.log(error));
       }
       fetchData();
    }, []);

    return { filteredPlayers, players }
}