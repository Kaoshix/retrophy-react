import { useState } from "react";

export const Genre = ({ genre }) => {
   const [isHovered, setIsHovered] = useState(false);

   return (
      <div
         className="
         relative m-auto mt-14 flex h-[150px] max-w-[350px] items-center
         rounded lg:mx-3 lg:mt-0 lg:w-[25vw]"
         style={{
            backgroundImage: `url(${genre.backgroundImagePath})`,
            backgroundSize: "cover",
         }}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
         <h2
            className="
            z-[1] ml-2 text-4xl 
            font-bold lg:text-3xl"
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

export const Placeholder = () => {
   return (
      <div className="m-auto mt-20 h-[150px] max-w-[350px] animate-pulse rounded bg-slate-800 lg:mx-3 lg:mt-0 lg:h-[150px] lg:w-[25vw]" />
   );
};
