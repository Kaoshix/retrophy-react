import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminGames() {
   const [games, setGames] = useState(null);
   let gameId = '';

   // Function to delete a game
   async function handleDeleteGame() {
        await fetch(`http://127.0.0.1:8000/api/games/${gameId}`, {
           method: "DELETE",
        });
        window.location.href = "/admin/games";
    
   }

   useEffect(() => {
      async function fetchData() {
         const response = await fetch("http://127.0.0.1:8000/api/games");
         const myDatas = await response.json();
         setGames(myDatas);
      }
      fetchData();
   }, []);
   return (
      <>
         <Link to="/admin_dashboard" className="mb-3">
            &lsaquo; Back to dashboard
         </Link>
         {games ? (
            <div className="flex bg-white text-black flex flex-col rounded-lg mb-10">
               <nav className="p-3 bg-blue-800 text-white text-center rounded-t-lg">
                  <h1 className="text-4xl">Games</h1>
                  <Link
                     to="/admin/game/create"
                     className="text-3xl bg-green-500 px-10 rounded-full"
                  >
                     +
                  </Link>
               </nav>
               <table>
                  <thead>
                     <tr className="flex justify-between">
                        <th className="hidden">Game title</th>
                        <th className="hidden">Game cover</th>
                        <th className="hidden">Actions</th>
                     </tr>

                     {games.map((game) => (
                        <tr key={game.id} className="flex flex-col m-3">
                           <td className="text-center text-2xl m-2">
                              {game.title}
                           </td>
                           <td>
                              <img
                                 src={game.imagePath}
                                 alt={game.slug}
                                 className="m-auto rounded-lg"
                              />
                           </td>
                           <td className="m-auto mt-4">
                              <Link
                                 to={`/admin/games/${game.id}`}
                                 className="bg-yellow-400 px-5 py-2 mx-2 rounded-lg"
                              >
                                 Show
                              </Link>
                              <Link
                                 to={`/admin/games/${game.id}/edit`}
                                 className="bg-blue-500 px-5 py-2 mx-2 rounded-lg"
                              >
                                 Edit
                              </Link>
                              <button
                                 className="bg-red-500 px-5 py-2 mx-2 rounded-lg"
                                 onClick={() => {
                                    gameId = `${game.id}`;
                                    handleDeleteGame();
                                 }
                                 }
                              >
                                 Delete
                              </button>
                           </td>
                        </tr>
                     ))}
                  </thead>
               </table>
            </div>
         ) : (
            "Loading..."
         )}
      </>
   );
}
