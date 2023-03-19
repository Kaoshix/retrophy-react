import { useState } from "react";
import arrowBottom from "../assets/images/arrowBottom.svg";

export const FilterBy = () => {
   const [isOpen, setIsOpen] = useState(false);

   const handleClick = () => {
      setIsOpen(!isOpen);
   };

   return (
      <div className={`relative rounded-lg bg-slate-100 p-3 text-lg font-bold`}>
         <h2
            className="
           text-center 
           lg:pr-5"
         >
            Search by
         </h2>
         <img
            src={arrowBottom}
            alt="arrow-bottom"
            className={`absolute top-[18px] right-[10px] rotate-[-90deg] cursor-pointer duration-200 ease-in-out ${
               isOpen ? "rotate-[0deg]" : ""
            }`}
            onClick={handleClick}
         />
      </div>
   );
};
