const H1: React.FC<{ className?: string; children: React.ReactNode }> = ({
	className,
	children,
}) => {
	return (
		<h1
			className={`max-w-[790px] text-[32px] leading-tight text-white transition-all duration-300 lg:text-6xl lg:leading-tight 2xl:max-w-[950px] 2xl:text-7xl 2xl:leading-tight ${className}`}
		>
			{children}
		</h1>
	);
};

export default H1;
