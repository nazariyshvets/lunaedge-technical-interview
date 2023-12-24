import { ButtonHTMLAttributes } from "react";
import { StarIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  onClick?: () => void;
}

const STYLES = {
  xs: "h-5 p-1",
  sm: "h-6 p-2",
  base: "h-8 p-3",
  lg: "h-10 p-4",
  xl: "h-12 p-5",
};

const Button = ({
  size = "base",
  children,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`flex items-center gap-1 rounded bg-blue-800 text-white transition hover:bg-blue-700 focus:bg-blue-700 focus:outline-2 focus:outline-blue-950 active:bg-blue-700 disabled:bg-blue-100 disabled:text-blue-300 ${STYLES[size]}`}
      onClick={onClick}
    >
      <StarIcon className="h-4" />
      {children}
      <ChevronDownIcon className="h-4" />
    </button>
  );
};

export default Button;
