// Assets
import arrowBottom from "../assets/images/arrowBottom.svg";
import options from "../assets/images/options.svg";
import search from "../assets/images/search.svg";

// React - packages
import { useContext } from "react";

// Components
import { Placeholder } from "../components/Placeholder";
import { Game } from "../components/Game";

// Custom hooks
import { GameContext } from "../App";

// Variables - Constants
const placeholderGameSm = "h-[317px] w-[250px] rounded m-auto my-8";
const placeholderGameLg = "lg:my-3";

function GamesPage() {
   const {
      games,
      setGames,
      paginationNext,
      paginationPrevious,
      setPagination,
   } = useContext(GameContext);

   return (
      <div className="max-w-screen-2xl m-auto">
         <ul
            className="
            text-3xl text-center py-2 border-b-2 border-gray-600 
            lg:text-left"
         >
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
               />
            </div>

            <div className="lg:flex">
               {/* filter */}
               <div
                  className="
                  mb-5 filter 
                  lg:mr-6 lg:min-w-[300px]"
               >
                  <div className="p-3 text-lg bg-slate-100 font-bold relative rounded-lg">
                     <h2
                        className="
                        text-center 
                        lg:pr-5"
                     >
                        Search by
                     </h2>
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
                     className="
                     hidden top-5 left-6 cursor-pointer 
                     lg:block lg:absolute"
                     onClick={() => {
                        document
                           .querySelector(".filter")
                           .classList.toggle("lg:hidden");
                     }}
                  />
                  {games ? (
                     games.map((game) => (
                        <div key={game.id} className="text-center">
                           <Game game={game} />
                        </div>
                     ))
                  ) : (
                     <>
                        <Placeholder
                           smOptions={placeholderGameSm}
                           lgOptions={placeholderGameLg}
                        />
                        <Placeholder
                           smOptions={placeholderGameSm}
                           lgOptions={placeholderGameLg}
                        />
                        <Placeholder
                           smOptions={placeholderGameSm}
                           lgOptions={placeholderGameLg}
                        />
                        <Placeholder
                           smOptions={placeholderGameSm}
                           lgOptions={placeholderGameLg}
                        />
                        <Placeholder
                           smOptions={placeholderGameSm}
                           lgOptions={placeholderGameLg}
                        />
                        <Placeholder
                           smOptions={placeholderGameSm}
                           lgOptions={placeholderGameLg}
                        />
                        <Placeholder
                           smOptions={placeholderGameSm}
                           lgOptions={placeholderGameLg}
                        />
                        <Placeholder
                           smOptions={placeholderGameSm}
                           lgOptions={placeholderGameLg}
                        />
                        <Placeholder
                           smOptions={placeholderGameSm}
                           lgOptions={placeholderGameLg}
                        />
                        <Placeholder
                           smOptions={placeholderGameSm}
                           lgOptions={placeholderGameLg}
                        />
                     </>
                  )}
               </div>
            </div>

            <div
               className="
               text-white text-center text-xl flex flex-row justify-center 
               lg:justify-end"
            >
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
