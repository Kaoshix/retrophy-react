import { Link } from "react-router-dom"
import { FetchGames } from "../fetchData/FetchGames"

export const Test = () => {
    return (
        <div className="flex">
        <FetchGames />
            {data ? data.map(game => (
                <Link to={`/games/${game.id}`} key={game.id}><img src={game.imagePath} alt={game.title} /></Link>
            )) : "Loading"}
        </div>
    )
}