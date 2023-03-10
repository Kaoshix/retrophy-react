import { useState } from "react";

export const Genre = ({ genre }) => {
   const [isHovered, setIsHovered] = useState(false);

   return (
      <div
         className="max-w-[500px] h-[220px] m-auto flex items-center relative mb-32
                    lg:w-[25vw] lg:h-[150px] lg:mx-3 lg:mb-0"
         style={{
            backgroundImage: `url(${genre.backgroundImagePath})`,
            backgroundSize: "cover",
         }}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
         <h2 className="ml-2 font-bold text-4xl lg:text-3xl">{genre.name}</h2>
         <img
            src={genre.overflowImagePath}
            alt={genre.name}
            className={`absolute bottom-0 right-5 w-[250px] lg:w-[180px] origin-bottom duration-300 ${
               isHovered ? "scale-110" : ""
            }`}
         />
      </div>
   );
};
