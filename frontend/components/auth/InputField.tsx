import { InputFieldProps } from "@/lib/types";

export default function InputField({
  type,
  name,
  label,
  placeholder,
}: InputFieldProps) {
  return (
    <div className="flex flex-col my-2">
      <label>
        <span>{label}</span>
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="h-8 border border-amber-100 rounded-md text-sm italic pl-2"
      />
    </div>
  );
}
