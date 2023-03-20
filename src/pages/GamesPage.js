// Assets
import options from "../assets/images/options.svg";
import searchIcon from "../assets/images/search.svg";
import { FilterBy } from "../components/FilterBy";

// Components
import { Game, Placeholder as GamePlaceholder } from "../components/Game";

// Custom hooks
import { FetchGames } from "../hooks/useGetApi";

function GamesPage() {
   const { games, setPagination, paginationNext, paginationPrevious, isLoadingGame, setIsLoadingGame } = FetchGames();

   return (
      <div className="m-auto max-w-screen-2xl">
         <ul
            className="
            border-b-2 border-gray-600 py-2 text-center text-3xl 
            lg:text-left"
         >
            <li>Games</li>
         </ul>

         <div className="relative mt-4 text-black">
            {/* search bar */}
            <div className="mb-5 flex w-full rounded-full bg-slate-100 p-1">
               <img src={searchIcon} alt="search" className="mx-3" />

               <input
                  type="search"
                  className="w-full rounded-full bg-transparent px-3 py-1"
                  placeholder="Search"
                  onChange={(e) => {
                     setPagination(`/games/search?title=${e.target.value}`);
                     if (e.target.value.length === 0) setPagination("/api/games");
                  }}
               />
            </div>

            <div className="lg:flex">
               {/* filter */}
               <div className="mb-5 lg:mr-6 lg:min-w-[300px]">
                  <FilterBy />
               </div>
               {/* games list */}
               <div className="lg:relative lg:flex lg:flex-wrap lg:border-l-2 lg:border-gray-600 lg:pl-16">
                  <img
                     src={options}
                     alt="options"
                     className="
                     top-5 left-6 hidden cursor-pointer 
                     lg:absolute lg:block"
                     onClick={() => {
                        document.querySelector(".filter").classList.toggle("lg:hidden");
                     }}
                  />

                  {isLoadingGame
                     ? [...Array(5)].map(() => <GamePlaceholder />)
                     : games?.map((game) => (
                          <div key={game.id} className="text-center">
                             <Game game={game} />
                          </div>
                       ))}
               </div>
            </div>

            <div
               className="
               flex flex-row justify-center text-center text-xl text-white 
               lg:justify-end"
            >
               {paginationPrevious ? (
                  <div
                     className="mr-5 cursor-pointer rounded border border-slate-700 px-3 py-1 duration-150 hover:text-slate-500"
                     onClick={() => {
                        setPagination(paginationPrevious);
                        setIsLoadingGame(true);
                     }}
                  >
                     &#8249; Prev
                  </div>
               ) : (
                  ""
               )}

               {paginationNext ? (
                  <div
                     className="cursor-pointer rounded border border-slate-700 px-3 py-1 duration-150 hover:text-slate-500"
                     onClick={() => {
                        setPagination(paginationNext);
                        setIsLoadingGame(true);
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
