import { EyeIcon } from "@heroicons/react/20/solid";
import { useState, useRef, InputHTMLAttributes, ReactNode } from "react";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  icon: ReactNode;
  error?: boolean;
  onChange: (value: string) => void;
}

const Input = ({
  icon,
  value,
  placeholder = "Placeholder",
  error,
  disabled,
  onChange,
  ...rest
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={`flex h-10 w-[400px] cursor-text items-center gap-2 rounded-lg border border-gray-400 bg-white px-[18px] py-3 outline outline-2 outline-transparent transition-all hover:outline-purple-700 ${
        isFocused ? "outline-purple-700" : ""
      } ${
        disabled
          ? "pointer-events-none cursor-default bg-blue-100 text-blue-200 outline-blue-200 hover:outline-blue-200"
          : error
            ? "outline-red-400 hover:outline-red-400"
            : ""
      }`}
      onClick={() => !disabled && inputRef.current?.focus()}
    >
      <div
        className={`w-5 ${
          disabled ? "text-blue-200" : error ? "text-red-400" : ""
        }`}
      >
        {icon}
      </div>
      <input
        ref={inputRef}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full text-ellipsis bg-transparent outline-none focus:placeholder:text-black ${
          disabled ? "placeholder:text-blue-200" : "placeholder:text-gray-400"
        }`}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
      <EyeIcon className="w-5" />
    </div>
  );
};

export default Input;
