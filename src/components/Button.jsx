import classNames from "classnames";

export default function Button({ children, color, shadow, fontSize, widthSize, onClick }) {
   const classes = classNames({
      "bg-blue-500 hover:bg-blue-700": color === "blue",
      "bg-red-500 hover:bg-red-700": color === "red",
      "bg-yellow-500 hover:bg-yellow-700": color === "yellow",
      "bg-green-500 hover:bg-green-700": color === "green",
      "bg-cyan-500 hover:bg-cyan-700": color === "cyan",
      "bg-rose-500 hover:bg-rose-700": color === "rose",
      "shadow-lg shadow-blue-500/50": shadow === "blue",
      "shadow-lg shadow-red-500/50": shadow === "red",
      "shadow-lg shadow-yellow-500/50": shadow === "yellow",
      "shadow-lg shadow-green-500/50": shadow === "green",
      "shadow-lg shadow-cyan-500/50": shadow === "cyan",
      "text-2xl": fontSize === "big",
      "text-2xl lg:text-base": fontSize === "sm_big-lg_base",
      "w-full": widthSize === "w-full",
   });
   return (
      <button
         className={`inline-block rounded-lg px-5 py-2 text-white duration-150 ease-in-out ${classes}`}
         onClick={onClick}
      >
         {children}
      </button>
   );
}
