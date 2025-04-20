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

export const SaveButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`flex items-center px-4 py-2 rounded text-white transition-all duration-300 ease-in-out ${
        pending
          ? "bg-blue-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600 hover:cursor-pointer"
      }`}
    >
      {pending && <Spinner />}
      Save
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
