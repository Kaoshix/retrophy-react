import classNames from "classnames";

export default function Button({ children, color, shadow, textSize, hoverColor, onClick }) {
   const classes = classNames({
      "bg-blue-500": color === "blue",
      "bg-red-500": color === "red",
      "bg-yellow-500": color === "yellow",
      "bg-green-500": color === "green",
      "bg-cyan-500": color === "cyan",
      [`hover:bg-${color}-700`]: hoverColor,
      [`shadow-lg shadow-${color}-500/50`]: shadow,
      "text-2xl": textSize === "text-size-2xl",
      "text-2xl lg:text-base": textSize === "login-button",
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
