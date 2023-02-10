import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function GameDetails() {
  const [game, setGame] = useState(null);
  const { gameId } = useParams();

  useEffect(() => {
    async function fetchGame() {
      const response = await fetch(`http://127.0.0.1:8000/api/games/${gameId}`);
      const gameInfos = await response.json();
      setGame(gameInfos);
    }
    fetchGame();
  }, [gameId]);

  return (
    <>
      {game ? (
        <div className="flex">
          <div className="text-3xl w-[300px] m-auto lg:m-0">
            <img src={game.imagePath} alt={game.slug} />
            <h1 className="text-center mt-5">{game.title}</h1>
            <button className="bg-blue-500 shadow-lg shadow-blue-500/50 py-2 px-6 rounded-lg block m-auto mt-5 w-[300px]">
              <Link to={`/games/run/${game.slug}`}>Play</Link>
            </button>
          </div>
          <div className="hidden lg:flex flex-col justify-between px-5 max-w-[700px] max-h-[381px]">
            <div>
              <h2 className="text-2xl mb-5">Description</h2>
              <p className="text-justify">{game.description}</p>
            </div>
            <div className="flex justify-around">
                <h2>{game.genre.name}</h2>
                <h2>{game.publisher.name}</h2>
            </div>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
}
