export const Button = ({ children, options, onClick }) => {
   return (
      <button
         className={`px-6 py-3 rounded-lg duration-150 ease-in-out ${options}`}
         onClick={onClick}
      >
         {children}
      </button>
   );
};
