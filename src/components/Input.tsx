import { useState, useRef, InputHTMLAttributes, ReactNode } from "react";
import { Path, UseFormRegister } from "react-hook-form";
import { EyeIcon } from "@heroicons/react/20/solid";
import type FormValues from "../types/FormValues";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "pattern"> {
  name: Path<FormValues>;
  register: UseFormRegister<FormValues>;
  icon: ReactNode;
  pattern?: RegExp;
  error?: boolean;
}

const Input = ({
  name,
  register,
  icon,
  placeholder = "Placeholder",
  minLength = 0,
  maxLength = Infinity,
  pattern = /(?:)/,
  required = false,
  disabled = false,
  error,
  ...rest
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...registerRest } = register(name, {
    minLength: {
      value: minLength,
      message: `This field must contain at least ${minLength} characters`,
    },
    maxLength: {
      value: maxLength,
      message: `This field must contain up to ${maxLength} characters`,
    },
    pattern: {
      value: pattern,
      message: "Invalid input",
    },
    required: {
      value: required,
      message: "This field is required",
    },
    disabled,
  });

  return (
    <div
      role="input"
      className={`flex h-10 w-[400px] cursor-text items-center gap-2 rounded-lg border border-gray-400 bg-white px-[18px] py-3 hover:outline hover:outline-purple-700 ${
        isFocused ? "outline outline-purple-700" : ""
      } ${
        disabled
          ? "pointer-events-none cursor-default bg-blue-100 text-blue-200 outline outline-blue-200 hover:outline-blue-200"
          : error
            ? "outline outline-red-400 hover:outline-red-400"
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
        {...registerRest}
        ref={(el) => {
          ref(el);
          inputRef.current = el;
        }}
        placeholder={placeholder}
        className={`w-full text-ellipsis bg-transparent outline-none focus:placeholder:text-black ${
          disabled ? "placeholder:text-blue-200" : "placeholder:text-gray-400"
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
      <EyeIcon className="w-5" />
    </div>
  );
};

export default Input;
