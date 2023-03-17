export const PopupMessage = ({ message, translation }) => {
   return <div className={`w-full z-[100] text-xl p-8 rounded bg-green-500 text-center absolute top-[-150px] left-0 ${translation} duration-500 ease-in-out`}>{message}</div>;
};
