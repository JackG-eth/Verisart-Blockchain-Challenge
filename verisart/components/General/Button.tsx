const Button: React.FC<{
  onClickAction?: () => void;
  className?: string;
  children: string;
}> = ({ onClickAction, className, children }) => {
  return (
    <button
      className={`flex h-[50px] w-full max-w-[166px] items-center justify-center rounded-xl border border-mycelium-lightgreen transition-colors duration-300 hover:bg-mycelium-lightgreen ${
        className ? className : ""
      }`}
      onClick={onClickAction}
    >
      <span>{children}</span>
    </button>
  );
};

export default Button;
