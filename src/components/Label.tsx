import { ReactNode } from "react";
import { InformationCircleIcon } from "@heroicons/react/20/solid";

interface LabelProps {
  children?: ReactNode;
  isOptional?: boolean;
}

const Label = ({ children, isOptional = true }: LabelProps) => {
  return (
    <label className="flex items-end justify-between gap-1">
      <div className="flex items-center gap-1 font-medium">
        {children} <InformationCircleIcon className="h-4" />
      </div>
      {isOptional && <span className="text-sm text-gray-400">Optional</span>}
    </label>
  );
};

export default Label;
