import GamesList from "../datas/GamesList";
import { Game } from "./Game";
import chevron from '../assets/images/chevron.svg';

export const LatestAdd = () => {
    return (
        <div className="mb-12 font-medium">
            <h2 className="text-3xl mb-10 px-4">Latest add</h2>
            <div className="flex">
                {GamesList.map(game => (
                    <Game game={game} key={game.id} />
                ))}

            </div>

            <div className="text-right pt-5 text-xl flex justify-end px-4">
                <a href="">See all games</a>
                <img src={chevron} alt='chevron' className="pt-1 pl-3"/>
            </div>
        </div>
    )
}