import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetchGames() {
   const [games, setGames] = useState("");
   const [pagination, setPagination] = useState("/api/games");
   const [paginationPrevious, setPaginationPrevious] = useState(null);
   const [paginationNext, setPaginationNext] = useState(null);
   const [isLoadingGame, setIsLoadingGame] = useState(true);

   useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
         async function fetchData() {
            await axios
               .get(`http://127.0.0.1:8000${pagination}`)
               .then((response) => {
                  response?.data["hydra:member"]
                     ? setGames(response?.data["hydra:member"])
                     : setGames(response.data);

                  response?.data["hydra:view"]
                     ? setPaginationPrevious(
                          response?.data["hydra:view"]["hydra:previous"]
                       )
                     : setPaginationPrevious(null);

                  response?.data["hydra:view"]
                     ? setPaginationNext(
                          response?.data["hydra:view"]["hydra:next"]
                       )
                     : setPaginationNext(null);
                  setIsLoadingGame(false);
               })
               .catch((err) => console.log(err));
         }
         fetchData();
      }, 300);

      return () => clearTimeout(delayDebounceFn);
   }, [pagination]);

   return {
      games,
      setGames,
      paginationNext,
      paginationPrevious,
      pagination,
      setPagination,
      isLoadingGame,
      setIsLoadingGame,
   };
}
