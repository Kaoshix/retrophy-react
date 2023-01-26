import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function AdminGameShow() {

    const [game, setGame] = useState(null);
    const { gameId } = useParams();

    useEffect(() => {
        async function fetchItem() {
            const response = await fetch(`http://127.0.0.1:8000/api/games/${gameId}`);
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
                                <th>Image</th>
                                <td>{game.imagePath}</td>
                            </tr>

                            <tr>
                                <th>CreatedAt</th>
                                <td>{game.createdAt}</td>
                            </tr>

                            <tr>
                                <th>UpdatedAt</th>
                                <td>{game.updatedAt}</td>
                            </tr>

                            <tr>
                                <th>Rom</th>
                                <td>{game.romPath}</td>
                            </tr>

                            <tr>
                                <th>Publisher</th>
                                <td>{game.publisher.name}</td>
                            </tr>


                            <tr>
                                <th>Genre</th>
                                <td>{game.genre.name}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                : 'Loading...'}
        </div>
    )

}