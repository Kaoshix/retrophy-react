import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import arrowBottom from "../assets/images/arrowBottom.svg";
import options from "../assets/images/options.svg";
import search from "../assets/images/search.svg";
import { Game } from "../components/Game";

function GamesPage() {
   const [games, setGames] = useState(null);
   const [searchInput, setSearchInput] = useState("");
   const [paginationPrevious, setPaginationPrevious] = useState(null);
   const [paginationNext, setPaginationNext] = useState(null);

   const [pagination, setPagination] = useState("/api/games");

   useEffect(() => {
      async function fetchData() {
         await axios
            .get(`http://127.0.0.1:8000${pagination}`)
            .then((response) => {
               setGames(response.data["hydra:member"]);
               setPaginationPrevious(
                  response.data["hydra:view"]["hydra:previous"]
               );
               setPaginationNext(response.data["hydra:view"]["hydra:next"]);
            })
            .catch((error) => console.log(error));
      }
      fetchData();
   }, [pagination]);

   const handleChange = (e) => {
      e.preventDefault();
      setSearchInput(e.target.value);
   };

   return (
      <div className="max-w-screen-2xl m-auto">
         <ul className="text-3xl text-center py-2 border-b-2 border-gray-600 lg:text-left">
            <li>Games</li>
         </ul>

         <div className="mt-4 text-black relative">
            {/* search bar */}
            <div className="w-full flex bg-slate-100 p-1 rounded-full mb-5">
               <img src={search} alt="search" className="mx-3" />
               <input
                  type="search"
                  className="w-full rounded-full bg-transparent px-3 py-1"
                  placeholder="Search"
                  value={searchInput}
                  onChange={handleChange}
               />
            </div>

            <div className="lg:flex">
               {/* filter */}
               <div className="mb-5 filter lg:mr-6 lg:min-w-[300px]">
                  <div className="p-3 text-lg bg-slate-100 font-bold relative rounded-lg">
                     <h2 className="text-center lg:pr-5">Search by</h2>
                     <img
                        src={arrowBottom}
                        alt="arrow-bottom"
                        className="cursor-pointer absolute top-[18px] right-[10px] filter-arrow rotate-[-90deg] duration-200 ease-in-out"
                        onClick={() => {
                           document
                              .querySelector(".filter-arrow")
                              .classList.toggle("rotate-[-90deg]");
                        }}
                     />
                  </div>
               </div>

               {/* games list */}
               <div className="lg:flex lg:flex-wrap lg:pl-16 lg:border-l-2 lg:border-gray-600 lg:relative">
                  <img
                     src={options}
                     alt="options"
                     className="hidden lg:block lg:absolute top-5 left-6 cursor-pointer"
                     onClick={() => {
                        document
                           .querySelector(".filter")
                           .classList.toggle("lg:hidden");
                     }}
                  />
                  {games ? (
                     games
                        .filter((game) =>
                           game.title
                              .toLowerCase()
                              .match(searchInput.toLowerCase())
                        )
                        .map((game) => (
                           <div
                              className="text-center max-w-[300px] m-auto lg:m-0 lg:max-w-[250px] rounded-lg hover:scale-105 duration-200 p-3"
                              key={game.id}
                           >
                              <Game game={game} />
                           </div>
                        ))
                  ) : (
                     <>
                        <div className="rounded-lg h-[381px] w-[300px] bg-slate-800 m-auto mb-10 animate-pulse lg:w-[226px] lg:h-[287px] lg:mx-3 lg:mb-5"></div>
                        <div className="rounded-lg h-[381px] w-[300px] bg-slate-800 m-auto mb-10 animate-pulse lg:w-[226px] lg:h-[287px] lg:mx-3 lg:mb-5"></div>
                        <div className="rounded-lg h-[381px] w-[300px] bg-slate-800 m-auto mb-10 animate-pulse lg:w-[226px] lg:h-[287px] lg:mx-3 lg:mb-5"></div>
                        <div className="rounded-lg h-[381px] w-[300px] bg-slate-800 m-auto mb-10 animate-pulse lg:w-[226px] lg:h-[287px] lg:mx-3 lg:mb-5"></div>
                        <div className="rounded-lg h-[381px] w-[300px] bg-slate-800 m-auto mb-10 animate-pulse lg:w-[226px] lg:h-[287px] lg:mx-3 lg:mb-5"></div>
                        <div className="rounded-lg h-[381px] w-[300px] bg-slate-800 m-auto mb-10 animate-pulse lg:w-[226px] lg:h-[287px] lg:mx-3 lg:mb-5"></div>
                        <div className="rounded-lg h-[381px] w-[300px] bg-slate-800 m-auto mb-10 animate-pulse lg:w-[226px] lg:h-[287px] lg:mx-3 lg:mb-5"></div>
                        <div className="rounded-lg h-[381px] w-[300px] bg-slate-800 m-auto mb-10 animate-pulse lg:w-[226px] lg:h-[287px] lg:mx-3 lg:mb-5"></div>
                        <div className="rounded-lg h-[381px] w-[300px] bg-slate-800 m-auto mb-10 animate-pulse lg:w-[226px] lg:h-[287px] lg:mx-3 lg:mb-5"></div>
                        <div className="rounded-lg h-[381px] w-[300px] bg-slate-800 m-auto mb-10 animate-pulse lg:w-[226px] lg:h-[287px] lg:mx-3 lg:mb-5"></div>
                     </>
                  )}
               </div>
            </div>

            <div className="text-white text-center text-xl flex flex-row justify-center lg:justify-end">
               {paginationPrevious ? (
                  <div
                     className="cursor-pointer hover:text-slate-500 duration-150 px-3 py-1 border border-slate-700 rounded mr-5"
                     onClick={() => {
                        setPagination(paginationPrevious);
                        setGames(null);
                     }}
                  >
                     &#8249; Prev
                  </div>
               ) : (
                  ""
               )}

               {paginationNext ? (
                  <div
                     className="cursor-pointer hover:text-slate-500 duration-150 px-3 py-1 border border-slate-700 rounded"
                     onClick={() => {
                        setPagination(paginationNext);
                        setGames(null);
                     }}
                  >
                     Next &#8250;
                  </div>
               ) : (
                  ""
               )}
            </div>
         </div>
      </div>
   );
}

export default GamesPage;
