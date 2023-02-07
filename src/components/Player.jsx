export const Player = ({ user }) => {
    return (
        <div>
            <div className="text-3xl">1</div>
            <div>
                <div className="w-[400px] h-[80px] bg-blue-700 rounded-full flex items-center ml-4 mb-7">
                    <img src={user.image} alt="user-icon" className="w-[80px] h-[80px] rounded-full" />
                    <div className="flex grow justify-between">
                        <div className="pl-4">{user.nickName}</div>
                        <div className="pr-4">{user.points} pts</div>
                    </div>
                </div>
            </div>
        </div>
    )
}