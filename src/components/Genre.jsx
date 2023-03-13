import { useState } from "react";

export const Genre = ({ genre }) => {
   const [isHovered, setIsHovered] = useState(false);

   return (
      <div
         className="
         max-w-[350px] h-[150px] m-auto flex items-center relative mt-20
         lg:w-[25vw] lg:mx-3 lg:mt-0 rounded"
         style={{
            backgroundImage: `url(${genre.backgroundImagePath})`,
            backgroundSize: "cover",
         }}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
         <h2
            className="
            ml-2 font-bold text-4xl 
            lg:text-3xl"
         >
            {genre.name}
         </h2>
         <img
            src={genre.overflowImagePath}
            alt={genre.name}
            className={`absolute bottom-0 right-1 h-[200px] origin-bottom duration-200 ${
               isHovered ? "lg:scale-110" : ""
            }`}
         />
      </div>
   );
};
