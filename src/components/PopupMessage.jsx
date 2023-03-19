import { useEffect } from "react";
import { useState } from "react";

export const PopupMessage = ({ confirmationMessage, setConfirmationMessage }) => {
   const [translation, setTranslation] = useState(false);

   useEffect(() => {
      if (confirmationMessage) {
         setTranslation(true);

         setTimeout(() => {
            setTranslation(false);
            setConfirmationMessage("");
         }, 2000);
      }
   }, [confirmationMessage, setConfirmationMessage]);
   return (
      <div
         className={`absolute top-[-150px] left-0 z-[100] w-full rounded bg-green-500 p-8 text-center text-xl ${
            translation ? "translate-y-[150px]" : ""
         } duration-500 ease-in-out`}
      >
         {confirmationMessage}
      </div>
   );
};
