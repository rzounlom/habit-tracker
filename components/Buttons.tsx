"use client";

import { useFormStatus } from "react-dom";

const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4 mr-2 text-white"
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

type ButtonProps = {
  children?: React.ReactNode;
  type: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export const SaveButton = ({
  onClick,
  children,
  disabled,
  type,
}: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      onClick={onClick ? () => onClick() : undefined}
      type={type}
      disabled={disabled ? disabled : pending}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold shadow-sm hover:cursor-pointer transition-all duration-300 ease-in-out ${
        pending
          ? "bg-blue-300 text-white cursor-not-allowed"
          : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
      }`}
    >
      {pending && <Spinner />}
      {children ? children : "Save"}
    </button>
  );
};

export const DeleteButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`flex items-center px-4 py-2 rounded text-white transition-all duration-300 ease-in-out ${
        pending
          ? "bg-red-400 cursor-not-allowed"
          : "bg-red-500 hover:bg-red-600 hover:cursor-pointer"
      }`}
    >
      {pending && <Spinner />}
      Delete
    </button>
  );
};

export const CancelButton = ({
  handleOnclose,
}: {
  handleOnclose: () => void;
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="button"
      onClick={handleOnclose}
      className={`text-gray-500 transition-all duration-300 ease-in-out ${
        pending
          ? "cursor-not-allowed"
          : "hover:cursor-pointer hover:text-gray-700"
      }`}
      disabled={pending}
    >
      Cancel
    </button>
  );
};
