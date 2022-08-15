import Link from "next/link";

const Logo: React.FC<{
	className?: string;
	onClick?: () => void;
}> = ({ className, onClick }) => {
	return (
		<Link href="https://verisart.com/">
			<img
				className="logo-primary cursor-pointer bg-white"
				src="verisart.svg"
				alt="Mycelium logo"
			/>
		</Link>
	);
};

export default Logo;
