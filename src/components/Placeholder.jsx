export const Placeholder = ({ smOptions, lgOptions }) => {
   return (
      <>
         <div
            className={`
            bg-slate-800 m-auto animate-pulse ${smOptions}
            lg:mx-3 ${lgOptions}`}
         ></div>
      </>
   );
};
