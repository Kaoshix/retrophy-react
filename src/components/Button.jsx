import classNames from "classnames";

export default function Button({ children, color, shadow, textSize, hoverStyle, onClick }) {
   const classes = classNames({
      "bg-blue-500": color === "blue",
      "bg-red-500": color === "red",
      "bg-yellow-500": color === "yellow",
      "bg-green-500": color === "green",
      [`shadow-lg shadow-${color}-500/50`]: shadow,
      "text-3xl": textSize === "text-big",
      "hover:bg-blue-700": hoverStyle === "blue-hover",
   });
   return (
      <button className={`rounded-lg px-5 py-2 duration-150 ease-in-out ${classes}`} onClick={onClick}>
         {children}
      </button>
   );
}
