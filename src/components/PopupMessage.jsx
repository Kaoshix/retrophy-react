import { useEffect, useState } from "react";

export const PopupMessage = ({ message }) => {
   const [translation, setTranslation] = useState(false);
   useEffect(() => {
      if (message) {
         setTranslation(true);
         setTimeout(() => {
            setTranslation(false);
            window.history.replaceState({}, document.title);
         }, 3000);
      }
   }, [message]);
   return (
      <div
         className={`absolute top-[-150px] left-0 z-[100] w-full rounded bg-green-500 p-8 text-center text-xl ${
            translation ? "translate-y-[150px]" : ""
         } duration-500 ease-in-out`}
      >
         {message}
      </div>
   );
};
