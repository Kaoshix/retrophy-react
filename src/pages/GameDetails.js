import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const GameDetails = () => {
    const [item, setItem] = useState(null);
    const {itemId} = useParams();

    useEffect(() => {
        async function fetchItem() {
            const response = await fetch(`http://127.0.0.1:8000/api/games/${itemId}`);
            const gameInfos = await response.json();
            setItem(gameInfos);
        }
        fetchItem();
    }, [itemId]);
    return (
        <div>
            {item ? <img src={item.imagePath} alt=''/> : "Loading..."}
        </div>
    )
}