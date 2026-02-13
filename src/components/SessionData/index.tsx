interface SessionDataProps {
  label: string;
  data: string;
}

export default function SessionData({ label, data }: SessionDataProps) {
  return (
    <div className="flex flex-col text-sm">
      <span className="text-text-muted">{label}</span>

      <p>{data}</p>
    </div>
  );
}
