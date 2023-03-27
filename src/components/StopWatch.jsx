import React, { useEffect } from "react";
import Timer from "./Timer";

function StopWatch({ isPaused, time, setTime }) {
   useEffect(() => {
      let interval = null;

      if (isPaused === false) {
         interval = setInterval(() => {
            setTime((time) => time + 10);
         }, 10);
      } else {
         clearInterval(interval);
      }
      return () => {
         clearInterval(interval);
      };
   }, [isPaused, setTime]);

   // const handlePauseResume = () => {
   //   setIsPaused(!isPaused);
   // };
   return (
      <div className="absolute top-1 right-5 z-[1000] text-2xl">
         <Timer time={time} />
      </div>
   );
}

export default StopWatch;
