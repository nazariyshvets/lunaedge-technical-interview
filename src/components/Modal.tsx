import { ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

interface ModalProps {
  title: string;
  children: ReactNode;
  onCancel: () => void;
  onSave: () => void;
}

const Modal = ({ title, children, onCancel, onSave }: ModalProps) => {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70">
      <div className="max-w-screen flex h-fit max-h-screen min-w-72 flex-col gap-8 overflow-auto rounded-lg bg-white p-8 shadow-md transition">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-lg font-medium">{title}</h1>
          <XMarkIcon
            className="h-7 cursor-pointer p-1 hover:text-blue-700"
            onClick={onCancel}
          />
        </div>

        <div className="flex items-center justify-center">{children}</div>

        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 font-medium hover:text-blue-700"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="rounded bg-blue-800 px-3 py-1 font-medium text-white hover:bg-blue-700"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
