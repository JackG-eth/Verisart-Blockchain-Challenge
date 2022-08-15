const Container: React.FC<{
  className?: string;
  ref?: React.MutableRefObject<HTMLDivElement>;
  children: React.ReactNode;
}> = ({ className, ref, children }) => {
  return (
    <div
      className={`container mx-auto w-full px-5 md:pl-5 md:pr-6 xl:pl-12 xl:pr-11 ${
        className ? className : ""
      }`}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default Container;
