import trophy from "../assets/images/trophy.svg";

export const Player = ({ user }) => {
  return (

    <div className="w-[80vw] md:w-[60vw] lg:w-[400px] h-[80px] bg-blue-700 rounded-full flex items-center ml-4">
      <img
        src={user.avatarPath}
        alt="user-icon"
        className="w-[80px] h-[80px] rounded-full"
      />
      <div className="flex grow justify-between">
        <div className="pl-4">{user.nickName}</div>
        <div className="pr-4 flex">
          <p className="mr-2">{user.trophy.length}</p>
          <img src={trophy} alt='trophy' />
        </div>
      </div>
    </div>
  );
};
