export const Game = ({ game }) => {
    return (
        <div className="w-1/6 px-4" key={game.id}>
            <a href="">
                <img src={game.image} alt="game" className="w-full game-scale" />
            </a>
        </div>
    )
}