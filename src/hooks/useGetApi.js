import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const FetchGames = () => {
   const [games, setGames] = useState("");
   const [pagination, setPagination] = useState("/api/games");
   const [paginationPrevious, setPaginationPrevious] = useState(null);
   const [paginationNext, setPaginationNext] = useState(null);
   const [isLoadingGame, setIsLoadingGame] = useState(true);

   useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
         setIsLoadingGame(true);
         async function fetchData() {
            await axios
               .get(`http://127.0.0.1:8000${pagination}`)
               .then((response) => {
                  response?.data["hydra:member"] ? setGames(response?.data["hydra:member"]) : setGames(response.data);

                  response?.data["hydra:view"]
                     ? setPaginationPrevious(response?.data["hydra:view"]["hydra:previous"])
                     : setPaginationPrevious(null);

                  response?.data["hydra:view"]
                     ? setPaginationNext(response?.data["hydra:view"]["hydra:next"])
                     : setPaginationNext(null);
                  setIsLoadingGame(false);
               })
               .catch((err) => console.log(err));
         }
         fetchData();
      }, 500);

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
};

export const FetchGame = () => {
   const [game, setGame] = useState(null);
   const { gameId } = useParams();

   useEffect(() => {
      async function FetchGame() {
         await axios
            .get(`http://127.0.0.1:8000/api/games/${gameId}`)
            .then((response) => setGame(response.data))
            .catch((error) => console.log(error));
      }
      FetchGame();
   }, [gameId]);

   return { game, gameId };
};

export const FetchGenres = () => {
   const [genres, setGenres] = useState(null);

   useEffect(() => {
      async function fetchData() {
         await axios
            .get("http://127.0.0.1:8000/api/genres")
            .then((response) => setGenres(response.data))
            .catch((error) => console.log(error));
      }
      fetchData();
   }, []);

   return { genres };
};

export const FetchPublishers = () => {
   const [publishers, setPublishers] = useState("");

   useEffect(() => {
      async function fetchPublishers() {
         await axios
            .get("http://127.0.0.1:8000/api/publishers")
            .then((response) => setPublishers(response.data))
            .catch((error) => console.log(error));
      }

      fetchPublishers();
   }, []);
   return { publishers };
};

export const FetchPlayers = () => {
   const [players, setPlayers] = useState(null);

   useEffect(() => {
      async function fetchData() {
         await axios
            .get("http://127.0.0.1:8000/api/users")
            .then((response) => setPlayers(response.data))
            .catch((error) => console.log(error));
      }
      fetchData();
   }, []);

   return { players };
};

export const FetchBestPlayers = () => {
   const [bestPlayers, setBestPlayers] = useState(null);

   useEffect(() => {
      async function fetchData() {
         await axios
            .get("http://127.0.0.1:8000/players/best")
            .then((response) => setBestPlayers(response.data))
            .catch((error) => console.log(error));
      }
      fetchData();
   }, []);

   return { bestPlayers };
};
