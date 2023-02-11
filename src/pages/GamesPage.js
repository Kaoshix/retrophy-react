import { useEffect } from "react";
import { useState } from "react";
import arrowBottom from "../assets/images/arrowBottom.svg";
import options from "../assets/images/options.svg";
import search from "../assets/images/search.svg";
import { Game } from "../components/Game";

function GamesPage() {
  const [games, setGames] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://127.0.0.1:8000/api/games");
      const myDatas = await response.json();
      setGames(myDatas);
    }
    fetchData();
  }, []);
  return (
    <div className="px-4 mt-20">
      <ul className="text-3xl text-center lg:text-left py-2 border-b-2 border-gray-600">
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
            />
          </div>
        </div>

        <div className="lg:flex">
          {/* filter */}
          <div className="bg-slate-100 rounded-lg mb-5 filter lg:w-[30vw] lg:max-h-[50px] lg:mr-20">
            <div className="flex justify-between p-3 text-lg font-bold">
              <h2 className="text-center grow">Search by</h2>
              <img src={arrowBottom} alt="arrow-bottom" onClick={() => {
                document.querySelector('.scroll_filter').classList.toggle('hidden')
                document.querySelector('.filter').classList.toggle('lg:max-h-[50px]')
              }} />
            </div>
            <div className="scroll_filter hidden">
              <div className="border-b-2 border-black mx-4 pb-1">
                <h3 className="text-center font-bold pb-2">Notes</h3>
                <div className="flex justify-around">
                  <button className="bg-red-300 py-1 px-3 rounded-full">
                    Ascending
                  </button>
                  <button>Descending</button>
                </div>
              </div>

              <div className="border-b-2 border-black mx-4 pb-1">
                <h3 className="text-center font-bold pb-2 pt-3">Most played</h3>
                <div className="flex justify-around">
                  <button className="bg-red-300 py-1 px-3 rounded-full">
                    Ascending
                  </button>
                  <button>Descending</button>
                </div>
              </div>

              <div className="mx-4 pb-4">
                <h3 className="text-center font-bold pb-2 pt-3">Difficulty</h3>
                <div className="flex justify-around">
                  <button>Ascending</button>
                  <button className="bg-red-300 py-1 px-3 rounded-full">
                    Descending
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* games list */}
          <div className="lg:flex lg:pl-20 lg:border-l-2 lg:border-gray-600 lg:relative">
            <img
              src={options}
              alt="options"
              className="hidden lg:block lg:absolute top-5 left-6"
              onClick={() => {
                document.querySelector('.filter').classList.toggle('lg:hidden')
              }}
            />
            {games?.map((game) => (
              <div className="lg:max-w-[200px]" key={game.id}>
                <Game game={game} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamesPage;
