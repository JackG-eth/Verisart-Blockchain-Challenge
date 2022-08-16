import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Logo from "../Logos/Logo";
import Link from "next/link";

import Container from "../General/Container/Container";
import { Web3Button } from "../General/Web3Button";

const Navbar = () => {
	const [background, setBackground] = useState(false);
	const [navOpen, setNavOpen] = useState(false);
	const route = useRouter().pathname;

	const isMobile = () => {
		return window.innerWidth < 1280;
	};

	const toggleNav = () => {
		setNavOpen(!navOpen);
	};

	const closeNav = () => {
		setTimeout(function () {
			setNavOpen(false);
		}, 500);
	};

	const handleResize = () => {
		// Check page position to set nav background
		// Hide mobile nav if going from small to large viewport
		if (!isMobile()) {
			closeNav();
		}
	};

	const Routes = [
		{
			label: "Home",
			to: "/",
		},
		{
			label: "Mint",
			to: "/mint",
		},
		{
			label: "Verisart Collection",
			to: "/collection",
		},
	];

	const setActiveLink = () => {
		const navLinks = document.querySelectorAll(".nav-link a");
		navLinks.forEach((navLink) => {
			let href = navLink.getAttribute("href");
			let container = navLink.parentNode as HTMLElement;
			if (route.split("/")[1].includes(href!.split("/")[1])) {
				container.classList.add("active");
			} else {
				container.classList.remove("active");
			}
		});
	};

	useEffect(() => {
		setActiveLink();
	}, [route]);

	useEffect(() => {}, [navOpen]);

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<>
			<nav className="fixed top-0 left-0 z-50 flex h-16 w-screen min-w-[320px] items-center bg-white [transition:height_0.3s_ease] md:h-20">
				<Container className="relative z-10 flex items-center justify-between">
					<div className="logo-container relative h-[34px] w-[277px]">
						<div className="absolute left-0 top-0 z-0 transition-opacity duration-500">
							<Logo />
						</div>
					</div>
					<div className="flex  w-full justify-end">
						<div className="flex-col-3 w-ful flex items-center">
							{Routes.map((route, i) => {
								return (
									<div
										key={i}
										className="nav-link group relative mr-[60px] text-black transition-colors duration-300"
									>
										<Link scroll={false} href={route.to}>
											{route.label}
										</Link>
										<span className="nav-underline absolute left-0 right-auto bottom-0 h-0.5 w-0 transition-all duration-300 ease-in-out group-hover:right-0 group-hover:left-auto group-hover:w-full" />
									</div>
								);
							})}
						</div>
					</div>
					<div className="flex h-[50px] w-full max-w-[166px] items-center justify-center rounded-xl border border-black text-black transition-colors duration-300 hover:bg-black hover:text-white">
						<div className="navbar-end">
							<Web3Button></Web3Button>
						</div>
					</div>
				</Container>
			</nav>
		</>
	);
};

export default Navbar;
