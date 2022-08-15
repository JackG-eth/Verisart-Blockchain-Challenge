import { motion } from "framer-motion";
import React from "react";
import H1 from "../H1";

const Header: React.FC<{
	title: string;
	subheading: string | React.ReactNode;
	fullWidthSubheading?: boolean;
}> = ({ title, subheading, fullWidthSubheading }) => {
	return (
		<header className="mb-12 lg:mb-24">
			<motion.div
				initial={{
					opacity: 0,
					y: "20px",
				}}
				animate={{
					opacity: 1,
					y: "0px",
				}}
				transition={{
					ease: "easeOut",
					duration: 0.4,
					delay: 0.4,
				}}
			>
				<H1 className="mb-8">{title}</H1>
			</motion.div>
			<motion.div
				initial={{
					opacity: 0,
					y: "20px",
				}}
				animate={{
					opacity: 1,
					y: "0px",
				}}
				transition={{
					ease: "easeOut",
					duration: 0.4,
					delay: 0.6,
				}}
			>
				<small
					className={`block w-full text-[16px] leading-7 text-mycelium-lightgreen ${
						fullWidthSubheading ? "max-w-[720px]" : "xl:max-w-[440px]"
					}`}
				>
					{subheading}
				</small>
			</motion.div>
		</header>
	);
};

export default Header;
