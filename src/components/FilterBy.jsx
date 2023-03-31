import { useState } from "react";
import arrowBottom from "../assets/images/arrowBottom.svg";

export const FilterBy = () => {
   const [isOpen, setIsOpen] = useState(false);

   const filterToggle = () => {
      setIsOpen(!isOpen);
   };

   return (
      <div className="relative z-[1]">
         <div className={`relative rounded-lg bg-slate-100 p-3 text-lg font-bold`}>
            <h2
               className="
           text-center 
           "
            >
               Search by
            </h2>
            <img
               src={arrowBottom}
               alt="arrow-bottom"
               className={`absolute top-[18px] right-[10px] rotate-[-90deg] cursor-pointer duration-200 ease-in-out ${
                  isOpen ? "rotate-[0deg]" : ""
               }`}
               onClick={filterToggle}
            />
         </div>
         <div className={`absolute top-10 w-full rounded-b-lg bg-slate-100 p-3 ${isOpen ? "block" : "hidden"}`}>
            {/* <div>
               <h2 className="my-3 border-b border-black text-center">Alphabetical order</h2>
               <div className="flex justify-around">
                  <div className="cursor-pointer rounded border-2 border-blue-500 px-2 py-1 duration-150 hover:bg-blue-500 hover:text-white hover:opacity-50">
                     Ascending
                  </div>
                  <div className="cursor-pointer rounded border-2 border-blue-500 px-2 py-1 duration-150 hover:bg-blue-500 hover:text-white hover:opacity-50">
                     Descending
                  </div>
               </div>
            </div> */}
         </div>
      </div>
   );
};
