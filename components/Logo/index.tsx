import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="text-[26px] italic text-primary h-fit hover:font-black duration-300 cursor-pointer"
    >
      Dro<span className="font-black">pp</span>e
    </Link>
  );
}
