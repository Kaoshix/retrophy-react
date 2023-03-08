// Import React
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function AdminGameShow() {
   const [game, setGame] = useState(null);
   const { gameId } = useParams();

   useEffect(() => {
      async function fetchItem() {
         const response = await fetch(
            `http://127.0.0.1:8000/api/games/${gameId}`
         );
         const gameInfos = await response.json();
         setGame(gameInfos);
      }
      fetchItem();
   }, [gameId]);
   return (
      <>
         <Link to="/admin/games" className="mb-3 inline-block">
            &lsaquo; Back to Admin games
         </Link>
         {game ? (
            <div className="max-w-screen mb-5 bg-white text-blue-abyss p-3 pb-5 rounded-3xl m-auto">
               <h1 className="text-3xl text-center mb-2">Game infos</h1>
               <img
                  src={game.imagePath}
                  alt={game.slug}
                  className="m-auto rounded-lg"
               />
               <div className="mt-3">
                  <div className="border-b-2 m-auto mb-5 text-center">
                     <h3 className="text-3xl">Title</h3>
                     <p>{game.title}</p>
                  </div>

                  <div className="border-b-2 m-auto mb-5 text-center">
                     <h3 className="text-3xl">Description</h3>
                     <p>{game?.description}</p>
                  </div>

                  <div className="border-b-2 m-auto mb-5 text-center">
                     <h3 className="text-3xl">Publisher</h3>
                     <p>{game?.publisher?.name}</p>
                  </div>

                  <div className="border-b-2 m-auto mb-5 text-center">
                     <h3 className="text-3xl">Genre</h3>
                     <p>{game?.genre?.name}</p>
                  </div>

                  <div className="border-b-2 m-auto mb-5 text-center">
                     <h3 className="text-3xl">CreatedAt</h3>
                     <p>{game.createdAt}</p>
                  </div>

                  <div className="border-b-2 m-auto mb-5 text-center">
                     <h3 className="text-3xl">UpdatedAt</h3>
                     <p>{game.updatedAt}</p>
                  </div>
               </div>
            </div>
         ) : (
            <div className="min-h-screen flex justify-center mt-10">Loading...</div>
         )}
      </>
   );
}
