import { AuthButtonProps } from "@/lib/types";

export default function AuthButton({ title }: AuthButtonProps) {
  return (
    <button
      type="submit"
      className="mt-3 cursor-pointer rounded-md border border-amber-100 px-6 py-2 hover:bg-amber-200 hover:text-gray-800 hover:duration-500"
    >
      {title}
    </button>
  );
}
