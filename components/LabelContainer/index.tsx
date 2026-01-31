interface LabelContainerProps {
  label: string;
  htmlFor: string;
  children: React.ReactElement;
}

export default function LabelContainer({
  htmlFor,
  label,
  children,
}: LabelContainerProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
}
