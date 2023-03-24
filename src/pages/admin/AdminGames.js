// React - packages
import axios from "axios";
import { Link, useHistory, useLocation } from "react-router-dom";

// Components
import Button from "../../components/Button";
import { PopupMessage } from "../../components/PopupMessage";

// Custom hooks
import { FetchGames } from "../../hooks/useGetApi";

export default function AdminGames() {
   const { games } = FetchGames();
   let gameId = "";
   const location = useLocation();
   const history = useHistory();

   // Function to delete a game
   async function handleDeleteGame() {
      await axios
         .delete(`http://127.0.0.1:8000/api/games/${gameId}`, {
            method: "DELETE",
         })
         .then(() =>
            history.push({
               state: { successMessage: "Delete game successful" },
            })
         );
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
         <PopupMessage message={location?.state?.successMessage} />
         {games ? (
            <div className="flex flex-col rounded-lg bg-white">
               <h1 className="mb-3 rounded-t-lg bg-blue-800 p-3 text-center text-4xl text-white">Games</h1>

               <Link to="/admin/game/create" className="m-auto mb-5">
                  <Button color="green" fontSize="big">
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
                                 <Button color="blue">Edit</Button>
                              </Link>
                              <Link to={`/admin/games/${game.id}`}>
                                 <Button color="yellow">Show</Button>
                              </Link>
                              <Button
                                 color="red"
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
