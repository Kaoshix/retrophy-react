// Import React
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Export main function
export default function AdminGameShow() {

    // Declare game state to store the game to show
    const [game, setGame] = useState(null);

    // Declare gameId to match with the route
    const { gameId } = useParams();

    // Function to delete a game
    async function handleDeleteGame() {
        await fetch(`https://api.retrophy.fun/api/games/${gameId}`, {
            method: "DELETE",
        });
        window.location.href = "/admin/games";
    }

    // Fetch the game to show
    useEffect(() => {
        async function fetchItem() {
            const response = await fetch(`https://api.retrophy.fun/api/games/${gameId}`);
            const gameInfos = await response.json();
            setGame(gameInfos);
        }
        fetchItem();
    }, [gameId]);
    return (
        <div>
            <Link to='/admin/games'>Back to list</Link>
            {game ?
                <div className="flex">
                    <img src={game.imagePath} alt={game.slug} />
                    <table>
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <td>{game.id}</td>
                            </tr>
                            <tr>
                                <th>Title</th>
                                <td>{game.title}</td>
                            </tr>

                            <tr>
                                <th>Description</th>
                                <td>{game.description}</td>
                            </tr>

                            <tr>
                                <th>Publisher</th>
                                <td>{game.publisher.name}</td>
                            </tr>

                            <tr>
                                <th>Genre</th>
                                <td>{game.genre.name}</td>
                            </tr>

                            <tr>
                                <th>CreatedAt</th>
                                <td>{game.createdAt}</td>
                            </tr>

                            <tr>
                                <th>UpdatedAt</th>
                                <td>{game.updatedAt}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                : 'Loading...'}

            <button onClick={handleDeleteGame}>Delete</button>
        </div>
    )

}