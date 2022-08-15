import { useState, useEffect, useRef } from "react";
import BannerVideo from "../components/Main/BannerVideo";
import ReactTypingEffect from "react-typing-effect";

const Collection = () => {
	const Main = useRef<HTMLElement>(null); // for video.
	const [loaded, setLoaded] = useState(false);
	const [videoCanPlay, setVideoCanPlay] = useState(false);

	useEffect(() => {
		setLoaded(true);
		setTimeout(() => {
			setVideoCanPlay(true);
		}, 1000);
	}, []);

	return (
		<section ref={Main} className="relative h-screen">
			<div
				id="home"
				className="relative flex h-screen w-screen min-w-[320px] flex-col items-center justify-center "
			>
				<BannerVideo
					loaded={loaded}
					videoCanPlay={videoCanPlay}
					setVideoCanPlay={setVideoCanPlay}
				/>
				<ReactTypingEffect
					speed={200}
					eraseDelay={2500}
					className="w-screen min-w-[320px] pt-4  text-center text-[64px] leading-tight text-white"
					text={[
						"Mint Your Future",
						"Verisart Connects Real to Digital",
						"Head To Mint To Start",
					]}
				/>
			</div>
		</section>
	);
};

export default Collection;
