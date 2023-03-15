// Assets
import troph from "../assets/images/trophy.svg";

export const TrophyMessage = ({ translation, setTranslation, game }) => {
   return (
      <div
         className={`w-[90vw] lg:w-[400px] z-[1000] bg-yellow-500 rounded-lg p-1 border-2 border-black absolute top-[-100px] ${translation} duration-500 ease-in-out`}
      >
         <div className="flex p-3">
            <img src={troph} alt="trophy" className="mr-5" />
            <div>
               <h2 className="text-2xl font-bold">{game?.trophy[0].name}</h2>
               <p>{game?.trophy[0].description}</p>
            </div>
            <div
               className="absolute top-0 right-3 text-2xl cursor-pointer"
               onClick={() => {
                  setTranslation("");
               }}
            >
               X
            </div>
         </div>
      </div>
   );
};
