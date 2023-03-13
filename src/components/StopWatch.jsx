import React, { useEffect, useState } from "react";
import Timer from "./Timer";
  
function StopWatch({isActive, isPaused}) {
  const [time, setTime] = useState(0);
  
  useEffect(() => {
    let interval = null;
  
    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);
  
  // const handlePauseResume = () => {
  //   setIsPaused(!isPaused);
  // };
  
  return (
    <div className="text-2xl absolute top-1 right-5 z-[1000]">
      <Timer time={time} />
    </div>
  );
}
  
export default StopWatch;