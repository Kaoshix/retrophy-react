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

   useEffect(() => {
      async function fetchData() {
         await axios.get("http://127.0.0.1:8000/api/games")
            .then(response => setGames(response.data))
            .catch(error => console.log(error))
      }
      fetchData();
   }, []);

   const handleChange = (e) => {
      e.preventDefault();
      setSearchInput(e.target.value);
   };

   return (
      <div className="max-w-screen-2xl m-auto">
         <ul className="text-3xl text-center py-2 border-b-2 border-gray-600 lg:text-left">
            <li>Games</li>
         </ul>

         {/* search bar */}
         <div className="mt-4 text-black relative">
            <div className="w-full">
               <div className="flex bg-slate-100 p-1 rounded-full mb-5">
                  <img src={search} alt="search" className="mx-3" />
                  <input
                     type="search"
                     className="w-full rounded-full bg-transparent px-3 py-1"
                     placeholder="Search"
                     value={searchInput}
                     onChange={handleChange}
                  />
               </div>
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
                  {games ? games.filter(game => game.title.toLowerCase().match(searchInput.toLowerCase())).map((game) => (
                     <div
                        className="text-center mb-5 lg:max-w-[200px] lg:mx-3"
                        key={game.id}
                     >
                        <Game game={game} />
                     </div>
                  ))
                  : <>
                     <div className="h-[355px] w-[280px] bg-slate-800 m-auto mb-5 animate-pulse lg:w-[200px] lg:h-[254px] lg:mx-3"></div>
                     <div className="h-[355px] w-[280px] bg-slate-800 m-auto mb-5 animate-pulse lg:w-[200px] lg:h-[254px] lg:mx-3"></div>
                     <div className="h-[355px] w-[280px] bg-slate-800 m-auto mb-5 animate-pulse lg:w-[200px] lg:h-[254px] lg:mx-3"></div>
                     <div className="h-[355px] w-[280px] bg-slate-800 m-auto mb-5 animate-pulse lg:w-[200px] lg:h-[254px] lg:mx-3"></div>
                     <div className="h-[355px] w-[280px] bg-slate-800 m-auto mb-5 animate-pulse lg:w-[200px] lg:h-[254px] lg:mx-3"></div>
                     <div className="h-[355px] w-[280px] bg-slate-800 m-auto mb-5 animate-pulse lg:w-[200px] lg:h-[254px] lg:mx-3"></div>
                     <div className="h-[355px] w-[280px] bg-slate-800 m-auto mb-5 animate-pulse lg:w-[200px] lg:h-[254px] lg:mx-3"></div>
                     <div className="h-[355px] w-[280px] bg-slate-800 m-auto mb-5 animate-pulse lg:w-[200px] lg:h-[254px] lg:mx-3"></div>
                     <div className="h-[355px] w-[280px] bg-slate-800 m-auto mb-5 animate-pulse lg:w-[200px] lg:h-[254px] lg:mx-3"></div>
                     <div className="h-[355px] w-[280px] bg-slate-800 m-auto mb-5 animate-pulse lg:w-[200px] lg:h-[254px] lg:mx-3"></div>

                     
                  </>
                     
                  }
               </div>
            </div>
         </div>
      </div>
   );
}

export default GamesPage;
