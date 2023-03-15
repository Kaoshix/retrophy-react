import { Link } from "react-router-dom";

export const Game = ({ game }) => {
   return (
      <Link
         className="
         inline-block w-[250px] duration-200 m-3 text-center
         lg:hover:scale-105"
         to={`/games/${game.id}`}
      >
         <img src={game.imagePath} alt={game.title} className="rounded" />
      </Link>
   );
};
