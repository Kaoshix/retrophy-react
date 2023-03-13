import trophy from "../assets/images/trophy.svg";

export const Player = ({ player }) => {
   return (
      <div
         className="
         w-[80vw] h-[80px] bg-blue-700 rounded-full flex items-center ml-4 
         lg:w-[400px]"
      >
         <img
            src={player.avatarPath}
            alt="user-icon"
            className="w-[80px] h-[80px] rounded-full"
         />
         <div className="flex grow justify-between">
            <div className="pl-4">{player.nickName}</div>
            <div className="pr-4 flex">
               <p className="mr-2">{player.trophy.length}</p>
               <img src={trophy} alt="trophy" />
            </div>
         </div>
      </div>
   );
};
