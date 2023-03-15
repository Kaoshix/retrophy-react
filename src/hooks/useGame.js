import axios from "axios";
import { useEffect, useState } from "react";

export default function useGame() {
   const [games, setGames] = useState("");
   const [pagination, setPagination] = useState("/api/games");
   const [paginationPrevious, setPaginationPrevious] = useState(null);
   const [paginationNext, setPaginationNext] = useState(null);

   useEffect(() => {
      async function fetchData() {
         await axios
            .get(`http://127.0.0.1:8000${pagination}`)
            .then((response) => setGames(response.data["hydra:member"]))
            .then((response) => {
               setPaginationPrevious(
                  response?.data["hydra:view"]["hydra:previous"]
               );
               setPaginationNext(response?.data["hydra:view"]["hydra:next"]);
            })
            .catch((err) => console.log(err));
      }
      fetchData();
   }, [pagination]);

   return {
      games,
      setGames,
      paginationNext,
      paginationPrevious,
      pagination,
      setPagination,
   };
}
