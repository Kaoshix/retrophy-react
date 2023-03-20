// React - packages
import { Link } from "react-router-dom";

// Components
import Button from "../../components/Button";
import { FetchGames } from "../../hooks/useGetApi";

export default function AdminGames() {
   const { games } = FetchGames();
   let gameId = "";

   // Function to delete a game
   async function handleDeleteGame() {
      await fetch(`http://127.0.0.1:8000/api/games/${gameId}`, {
         method: "DELETE",
      });
      window.location.href = "/admin/games";
   }

   function deleteAlert() {
      if (window.confirm("Delete this item?")) {
         handleDeleteGame();
      }
   }

   return (
      <>
         <Link to="/admin_dashboard" className="mb-3 inline-block">
            &lsaquo; Back to dashboard
         </Link>
         {games ? (
            <div className="flex flex-col rounded-lg bg-white">
               <h1 className="mb-3 rounded-t-lg bg-blue-800 p-3 text-center text-4xl text-white">Games</h1>

               <Link to="/admin/game/create" className="m-auto mb-5">
                  <Button color="green" textSize="text-size-2xl">
                     New game
                  </Button>
               </Link>
               <table>
                  <thead>
                     {games.map((game) => (
                        <tr key={game.id} className="mb-5 flex flex-col">
                           <td className="text-center text-2xl text-black">{game.title}</td>
                           <td className="mb-1">
                              <img src={game.imagePath} alt={game.slug} className="m-auto rounded" />
                           </td>
                           <td className="m-auto flex w-[300px] justify-between">
                              <Link to={`/admin/games/${game.id}/edit`}>
                                 <Button color="blue" hoverColor>
                                    Edit
                                 </Button>
                              </Link>
                              <Link to={`/admin/games/${game.id}`}>
                                 <Button color="yellow" hoverColor>
                                    Show
                                 </Button>
                              </Link>
                              <Button
                                 color="red"
                                 hoverColor
                                 onClick={() => {
                                    gameId = `${game.id}`;
                                    deleteAlert();
                                 }}
                              >
                                 Delete
                              </Button>
                           </td>
                        </tr>
                     ))}
                  </thead>
               </table>
            </div>
         ) : (
            <div className="mt-10 flex min-h-screen justify-center">Loading...</div>
         )}
      </>
   );
}
