import { Link } from "react-router-dom";

export const Game = ({ game }) => {
    return (
        <Link to={`/games/${game.id}`} className='inline-block hover:scale-105 duration-200'>
            <img src={game.imagePath} alt={game.title} className="rounded-lg" />
        </Link>
    );
};
