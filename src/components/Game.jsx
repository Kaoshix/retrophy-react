import { Link } from "react-router-dom"

export const Game = ({ game }) => {
    return (
        <div className='hover:scale-105 duration-200 md:mx-2 lg:mx-2 pb-5'>
            <Link to={`/games/${game.id}`}><img src={game.imagePath} alt={game.title} className='m-auto' /></Link>
        </div>

    )
}