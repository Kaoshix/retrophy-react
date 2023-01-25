import { useEffect, useState } from "react";

export default function AdminGames() {

    const [games, setGames] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://127.0.0.1:8000/api/games');
            const myDatas = await response.json();
            setGames(myDatas);
        }
        fetchData();
    }, []);
    return (
        <>
            {games ?
                <div className="flex mt-5">
                    <nav className="min-h-screen bg-red-500 p-5">
                        <h1 className="text-4xl">Games</h1>
                    </nav>
                    <table className="max-w-7xl bg-green-500 p-5">
                        <thead>
                            <tr className="flex justify-between">
                                <th>Game title</th>
                                <th>Game cover</th>
                                <th>Actions</th>
                            </tr>

                            {games.map(game => (
                                <tr key={game.id} className="flex justify-between">
                                    <td>{game.title}</td>
                                    <td><img src={game.imagePath} alt={game.slug} /></td>
                                    <td>
                                        <a href="{{ path('app_admin_game_show', {'id': game.id}) }}">show</a>
                                        <a href="{{ path('app_admin_game_edit', {'id': game.id}) }}">edit</a>
                                    </td>
                                </tr>
                            ))}
                        </thead>
                    </table>
                </div>
                : "Loading..."
            }
        </>
    )
}