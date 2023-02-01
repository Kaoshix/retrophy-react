import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const GamesList = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://api/retrophy.fun/api/games');
            const myDatas = await response.json();
            setData(myDatas);
        }
        fetchData();
    }, []);

    return (
        <div className="flex">
            {data ? data.map(game => (
                <Link to={`/games/${game.id}`} key={game.id}><img src={game.imagePath} alt={game.title} /></Link>
            )) : "Loading..."}
        </div>
    )
}