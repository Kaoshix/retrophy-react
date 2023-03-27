// Assets
import troph from "../assets/images/trophy.svg";

export const TrophyMessage = ({ translation, setTranslation, game }) => {
   return (
      <div
         className={`absolute top-[-150px] z-[1000] w-[90vw] rounded-lg border-2 border-black bg-yellow-500 p-1 lg:w-[400px] ${
            translation ? "translate-y-[150px]" : ""
         } duration-500 ease-in-out`}
      >
         <div className="flex p-3">
            <img src={troph} alt="trophy" className="mr-5" />
            <div>
               <h2 className="text-2xl font-bold">{game?.trophy[0]?.name}</h2>
               <p>{game?.trophy[0]?.description}</p>
            </div>
            <div
               className="absolute top-0 right-3 cursor-pointer text-2xl"
               onClick={() => {
                  setTranslation(false);
               }}
            >
               X
            </div>
         </div>
      </div>
   );
};
