import { useEffect, useRef, useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import SelectOptionBadge from "./SelectOptionBadge";
import SelectOption from "../types/SelectOption";

interface SelectProps {
  options: SelectOption[];
  onChange: (value: SelectOption | SelectOption[]) => void;
  placeholder?: string;
  isMulti?: boolean;
  isSearchable?: boolean;
  align?: "top" | "bottom";
  error?: boolean;
  disabled?: boolean;
}

// CustomSelect component
const Select = ({
  options,
  onChange,
  placeholder = "Select",
  isMulti = false,
  isSearchable = false,
  align = "bottom",
  error = false,
  disabled = false,
}: SelectProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<
    SelectOption | SelectOption[] | null
  >(isMulti ? [] : null);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchValue("");

    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  const handleInputClick = () => {
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (
      !selectedValue ||
      (isMulti && (selectedValue as SelectOption[]).length === 0)
    ) {
      return placeholder;
    }

    if (isMulti) {
      return (
        <div className="flex gap-1">
          {(selectedValue as SelectOption[]).map((option, index) => (
            <SelectOptionBadge
              key={`${option.value}-${index}`}
              option={option}
              onRemove={onTagRemove}
            />
          ))}
        </div>
      );
    }

    return (selectedValue as SelectOption).label;
  };

  const removeOption = (option: SelectOption) => {
    return (selectedValue as SelectOption[]).filter(
      (o) => o.value !== option.value,
    );
  };

  const onTagRemove = (event: React.MouseEvent, option: SelectOption) => {
    event.stopPropagation();

    const newValue = removeOption(option);
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const onItemClick = (option: SelectOption) => {
    let newValue: SelectOption | SelectOption[];

    if (isMulti) {
      if (
        (selectedValue as SelectOption[]).findIndex(
          (o) => o.value === option.value,
        ) >= 0
      ) {
        newValue = removeOption(option);
      } else {
        newValue = [...(selectedValue as SelectOption[]), option];
      }
    } else {
      newValue = option;
    }

    setSelectedValue(newValue);
    onChange(newValue);
  };

  const isSelected = (option: SelectOption) => {
    if (isMulti) {
      return (selectedValue as SelectOption[]).some(
        (o) => o.value === option.value,
      );
    }

    if (!selectedValue) {
      return false;
    }

    return (selectedValue as SelectOption).value === option.value;
  };

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const getSelectOptions = () => {
    if (!searchValue) {
      return options;
    }

    return options.filter(
      (option) =>
        option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0,
    );
  };

  return (
    <div className="relative h-fit w-[400px] rounded bg-white">
      <div
        ref={inputRef}
        onClick={() => !disabled && handleInputClick()}
        className={`flex h-8 cursor-pointer items-center justify-between gap-1 overflow-hidden rounded border-2 border-gray-300 px-3 py-2 hover:border-purple-700 ${
          showMenu ? "border-purple-700" : ""
        } ${error ? "border-red-400 hover:border-red-400" : ""} ${
          disabled
            ? "cursor-default border-blue-200 bg-blue-100 hover:border-blue-200"
            : ""
        }`}
      >
        <div
          className={`max-w-full truncate ${
            showMenu ||
            (isMulti && (selectedValue as SelectOption[]).length > 0) ||
            (!isMulti && selectedValue)
              ? "text-black"
              : "text-gray-400"
          } ${disabled ? "text-blue-200" : ""}`}
        >
          {getDisplay()}
        </div>
        <div className="flex items-center justify-center gap-2">
          {((isMulti && (selectedValue as SelectOption[]).length > 0) ||
            (!isMulti && selectedValue)) && (
            <XMarkIcon
              className="h-5"
              onClick={() => setSelectedValue(isMulti ? [] : null)}
            />
          )}

          {showMenu ? (
            <ChevronUpIcon
              className={`pointer-events-none h-5 ${
                disabled ? "text-blue-200" : ""
              }`}
            />
          ) : (
            <ChevronDownIcon
              className={`pointer-events-none h-5 ${
                disabled ? "text-blue-200" : ""
              }`}
            />
          )}
        </div>
      </div>

      {showMenu && (
        <div
          className={`absolute ${
            align === "top" ? "bottom-full" : "top-full"
          } left-0 z-10 max-h-72 w-full overflow-auto rounded border border-gray-300 bg-white`}
        >
          {isSearchable && (
            <div className="p-2">
              <input
                className="w-full rounded border border-gray-300 px-2 py-1"
                onChange={onSearch}
                value={searchValue}
                ref={searchRef}
              />
            </div>
          )}
          {getSelectOptions().map((option) => (
            <div
              onClick={() => onItemClick(option)}
              key={option.value}
              className={`cursor-pointer truncate p-2 ${
                isSelected(option) ? "bg-red-200" : ""
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
