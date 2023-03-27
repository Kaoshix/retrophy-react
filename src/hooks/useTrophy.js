import axios from "axios";
import { useEffect, useState } from "react";
import { FetchGame } from "./useGetApi";
import useUser from "./useUser";

export const useTrophy = () => {
   const { user, setUser, isLoadingUser } = useUser();
   const { game } = FetchGame();
   const [time, setTime] = useState(0);
   const [translation, setTranslation] = useState(false);

   useEffect(() => {
      if (user && !user?.trophy[0] && time === 10000) {
         setTranslation(true);

         setTimeout(() => {
            setTranslation(false);
         }, 3000);

         async function setTrophy() {
            await axios.post("http://127.0.0.1:8000/api/earn-trophy", {
               id: game?.trophy[0].id,
            });
            const response = await axios.get("http://127.0.0.1:8000/api/me");
            setUser(response.data);
         }
         setTrophy();
      }
   }, [user, game?.trophy, time, setUser]);

   return {
      time,
      setTime,
      user,
      translation,
      setTranslation,
      isLoadingUser,
   };
};
