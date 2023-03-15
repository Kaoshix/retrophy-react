export const Button = ({ children, options }) => {
   return (
      <button
         className={`px-6 py-3 rounded-lg duration-150 ease-in-out ${options}`}
      >
         {children}
      </button>
   );
};
