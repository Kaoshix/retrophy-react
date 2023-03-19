// Import React
import { Link } from "react-router-dom";
import { FetchGame } from "../../hooks/useFetchApi";

export default function AdminGameShow() {
   const { game } = FetchGame();
   return (
      <>
         <Link to="/admin/games" className="mb-3 inline-block">
            &lsaquo; Back to Admin games
         </Link>
         {game ? (
            <div className="max-w-screen m-auto rounded-lg bg-white pb-5 text-blue-abyss">
               <h1 className="mb-3 rounded-t-lg bg-blue-800 p-3 text-center text-4xl text-white">Game infos</h1>
               <img src={game.imagePath} alt={game.slug} className="m-auto mb-5 rounded" />
               <div>
                  <div className="m-auto mb-5 border-b-2 text-center">
                     <h3 className="text-3xl">Title</h3>
                     <p>{game.title}</p>
                  </div>

                  <div className="m-auto mb-5 border-b-2 text-center">
                     <h3 className="text-3xl">Description</h3>
                     <p>{game?.description}</p>
                  </div>

                  <div className="m-auto mb-5 border-b-2 text-center">
                     <h3 className="text-3xl">Publisher</h3>
                     <p>{game?.publisher?.name}</p>
                  </div>

                  <div className="m-auto mb-5 border-b-2 text-center">
                     <h3 className="text-3xl">Genre</h3>
                     <p>{game?.genre?.name}</p>
                  </div>

                  <div className="m-auto mb-5 border-b-2 text-center">
                     <h3 className="text-3xl">CreatedAt</h3>
                     <p>{game.createdAt}</p>
                  </div>

                  <div className="m-auto mb-5 border-b-2 text-center">
                     <h3 className="text-3xl">UpdatedAt</h3>
                     <p>{game.updatedAt}</p>
                  </div>
               </div>
            </div>
         ) : (
            <div className="mt-10 flex min-h-screen justify-center">Loading...</div>
         )}
      </>
   );
}
