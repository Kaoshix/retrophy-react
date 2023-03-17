// Assets
import troph from "../assets/images/trophy.svg";

export const Trophy = ({ trophy, trophyOpacity }) => {
   return (
      <div className={`mx-3 mt-3 ${trophyOpacity}`}>
         <div className="flex">
            <div className="flex justify-center items-center">
               <img src={troph} alt="trophy" className="mr-5" />
            </div>
            <div>
               <h2 className="text-2xl font-bold">{trophy.name}</h2>
               <p>{trophy.description}</p>
            </div>
         </div>
      </div>
   );
};
