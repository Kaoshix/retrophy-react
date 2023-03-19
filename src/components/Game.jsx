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

export const Placeholder = () => (
   <div
      className={`bg-slate-800 animate-pulse h-[317px] w-[250px] rounded m-auto my-8 lg:m-3`}
   />
);
