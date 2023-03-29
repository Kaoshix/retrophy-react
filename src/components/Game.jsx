import { Link } from "react-router-dom";

export const Game = ({ game }) => {
   return (
      <Link
         className="
         m-3 inline-block w-[250px] text-center duration-200
         lg:hover:scale-105"
         to={`/games/${game.id}`}
      >
         <img src={game.imagePath} alt={game.title} className="relative rounded" />
      </Link>
   );
};

export const Placeholder = () => (
   <div className={`m-auto my-8 h-[317px] w-[250px] animate-pulse rounded bg-slate-800 lg:m-3`} />
);
