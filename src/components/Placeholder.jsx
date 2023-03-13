export const Placeholder = ({ smOptions, lgOptions }) => {
   return (
      <>
         <div
            className={`
            bg-slate-800 m-auto animate-pulse rounded ${smOptions}
            lg:mx-3 ${lgOptions}`}
         ></div>
      </>
   );
};
