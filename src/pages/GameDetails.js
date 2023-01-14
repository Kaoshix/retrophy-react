import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const GameDetails = () => {
    const [game, setGame] = useState(null);
    const { gameId } = useParams();


    useEffect(() => {
        async function fetchItem() {
            const response = await fetch(`http://127.0.0.1:8000/api/games/${gameId}`);
            const gameInfos = await response.json();
            setGame(gameInfos);
        }
        fetchItem();
    }, [gameId]);
    return (
        <div>
            {game ?
                <div className="text-2xl">
                    <img src={game.imagePath} alt='' className="mr-5" />
                    <h1>{game.title}</h1>
                    <button className="bg-blue-500 shadow-lg shadow-blue-500/50 py-2 px-6 rounded-lg"><Link to={`/games/run/${game.slug}`}>Play</Link></button>
                </div>
                : "Loading..."}

        </div>
    )
}