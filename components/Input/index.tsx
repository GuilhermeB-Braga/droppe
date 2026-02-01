import { forwardRef } from "react";

interface InputProps {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  radius?: string;
  otherStyles?: string;
  error?: boolean;
}

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  { type, placeholder, name, radius, otherStyles, error, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      {...props}
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      style={{ borderRadius: radius ? `${radius}px` : "12px" }}
      className={`
        h-8 py-5 px-3 bg-background-dark cursor-pointer border 
        focus:outline-3  ${otherStyles}
      ${
        error
          ? "border-orange-600 focus:orange-600 outline-orange-600/12"
          : "border-transparentfocus:border-white outline-white/12"
      }
        `}
    />
  );
});
