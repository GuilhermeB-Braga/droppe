interface InputProps {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  radius?: string;
  otherStyles?: string;
}

export default function Input({
  type,
  placeholder,
  name,
  radius,
  otherStyles,
}: InputProps) {
  return (
    <input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      style={{ borderRadius: radius ? `${radius}px` : "12px" }}
      className={`
        h-8 py-5 px-3 bg-background-dark cursor-pointer border border-transparent
      focus:border-white  focus:outline-3 outline-white/12 ${otherStyles}
        `}
    />
  );
}
