import type { ComponentProps } from "react";

interface InputRootProps extends ComponentProps<"div"> {
  error?: boolean;
}

export function InputRoot({ error = false, ...rest }: InputRootProps) {
  return (
    <div
      className="bg-gray-800 h-12 border border-gray-600 rounded-xl px-4 flex items-center gap-2 focus-within:border-gray-100 group data-[error=true]:border-danger"
      data-error={error}
      {...rest}
    />
  );
}

interface InputIconProps extends ComponentProps<"span"> {}

export function InputIcon({ ...rest }: InputIconProps) {
  return (
    <span
      className="text-gray-400 group-focus-within:text-gray-100 group-[&:not(:has(input:placeholder-shown))]:text-gray-100 group-data-[error=true]:text-danger"
      {...rest}
    />
  );
}

interface InputFieldProps extends ComponentProps<"input"> {
  error?: boolean;
}

export function InputField({ ...rest }: InputFieldProps) {
  return <input className="flex-1 outline-0 placeholder-gray-400" {...rest} />;
}
