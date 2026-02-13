import { forwardRef } from "react";

interface InputProps {
  type: string;
  name: string;
  disabled?: boolean
  label?: string;
  placeholder?: string;
  radius?: string;
  otherStyles?: string;
  error?: boolean;
}

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  { type, placeholder, name, radius, otherStyles, error, disabled, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      disabled={disabled}
      {...props}
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      style={{ borderRadius: radius ? `${radius}px` : "12px" }}
      className={`
        h-8 py-5 px-3 bg-background-dark cursor-pointer border 
        focus:outline-3 duration-500
      ${otherStyles}
      ${disabled && 'opacity-70'}
      ${
        error
          ? "border-orange-600 focus:orange-600 outline-orange-600/12"
          : "border-transparentfocus:border-white outline-white/12"
      }
        `}
    />
  );
});
