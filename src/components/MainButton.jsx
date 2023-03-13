export const MainButton = ({ children, bgColor }) => {
   return (
      <button className={`m-auto text-3xl rounded-lg duration-150 ease-in-out ${bgColor}`}>
         {children}
      </button>
   );
};
