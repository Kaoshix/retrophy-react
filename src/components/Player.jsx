import trophy from "../assets/images/trophy.svg";
import avatar from "../assets/images/avatar_default.webp";

export const Player = ({ player }) => {
   return (
      <div
         className="
         ml-4 flex h-[80px] w-[80vw] items-center rounded-full bg-blue-700 
         lg:w-[400px]"
      >
         <img
            src={player.avatarPath === "http://127.0.0.1:8000" ? avatar : player.avatarPath}
            alt="user-icon"
            className="h-[80px] w-[80px] rounded-full"
         />
         <div className="flex grow justify-between">
            <div className="pl-4">{player.nickname}</div>
            <div className="flex pr-4">
               <p className="mr-2">{player.score}</p>
               <img src={trophy} alt="trophy" />
            </div>
         </div>
      </div>
   );
};
