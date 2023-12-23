import { XMarkIcon } from "@heroicons/react/20/solid";
import SelectOption from "../types/SelectOption";

interface SelectOptionBadgeProps {
  option: SelectOption;
  onRemove: (event: React.MouseEvent, option: SelectOption) => void;
}

const SelectOptionBadge = ({ option, onRemove }: SelectOptionBadgeProps) => {
  return (
    <div className="flex flex-shrink-0 items-center gap-1 rounded-full bg-red-200 px-[10px] py-[2px] text-sm font-medium text-red-700">
      {option.label}
      <span
        onClick={(event) => onRemove(event, option)}
        className="cursor-pointer"
      >
        <XMarkIcon className="h-5" />
      </span>
    </div>
  );
};

export default SelectOptionBadge;
