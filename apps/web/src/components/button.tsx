import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ComponentProps<"button"> {}

export function Button({ ...props }: ButtonProps) {
  return (
    <button
      className="flex justify-between items-center font-semibold rounded-xl px-5 h-12 bg-gray-500 text-blue w-full cursor-pointer hover:bg-blue hover:text-gray-900 transition-colors duration-300"
      {...props}
    />
  );
}

export function IconButton({ className, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(
        "rounded-md p-1.5 bg-gray-500 text-blue cursor-pointer hover:bg-blue hover:text-gray-900 transition-colors duration-300",
        className
      )}
      {...props}
    />
  );
}
