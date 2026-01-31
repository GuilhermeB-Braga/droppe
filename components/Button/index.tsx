interface ButtonProps {
  text: string;
  icon?: React.ElementType;
  direction?: 'left' | 'right'
  onClick?: () => void;
  otherStyles?: string;
}

export default function Button({ text, otherStyles, icon: Icon, direction }: ButtonProps) {
  return (
    <button
      className={`
    bg-linear-to-r from-[#F7971E] via-[#FFD200] to-[#F7971E] bg-size-[200%_auto]
    text-center text-[#292929] flex items-center justify-center gap-2.5 transition-all
    duration-500 hover:bg-top-right py-5 px-3 rounded-xl h-8 cursor-pointer
    ${otherStyles}
    ${Icon && direction && direction === 'left' ? 'flex-row-reverse' : ''}
    `}
    >
      {text}
      {Icon && <Icon/>}
    </button>
  );
}
