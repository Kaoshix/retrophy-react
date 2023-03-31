import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import { FetchGame } from "./useGetApi";

export const useTrophy = () => {
   const { user, setUser, isLoadingUser } = useContext(AuthContext);
   const { game } = FetchGame();
   const [time, setTime] = useState(0);
   const [translation, setTranslation] = useState(false);
   const [filteredTrophy, setFilteredTrophy] = useState();

   useEffect(() => {
      setFilteredTrophy(user?.trophy?.filter((trophy) => trophy?.id === game?.trophy[0]?.id));
      if (user && time === 60000 && filteredTrophy?.length < 1) {
         setTranslation(true);

         setTimeout(() => {
            setTranslation(false);
         }, 3000);

         async function setTrophy() {
            await axios
               .post("http://127.0.0.1:8000/api/earn-trophy", {
                  id: game?.trophy[0].id,
               })
               .then((response) => setUser(response.data));
         }
         setTrophy();
      }
   }, [user, game, game?.trophy, time, setUser, filteredTrophy?.length]);

   return {
      time,
      setTime,
      translation,
      setTranslation,
      isLoadingUser,
   };
};
