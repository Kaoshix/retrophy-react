export const Player = ({ player }) => {
    return (
        <tr>
            <td className="text-3xl">1</td>
            <td>
                <div className="w-[400px] h-[80px] bg-blue-700 rounded-full flex items-center ml-4">
                    <img src={player.image} alt="player icon" className="w-[80px] h-[80px] rounded-full" />
                    <div className="flex grow justify-between">
                        <div className="pl-4">{player.name}</div>
                        <div className="pr-4">{player.points} pts</div>
                    </div>
                </div>
            </td>
        </tr>
    )
}