const BannerVideo: React.FC<{
	loaded: boolean;
	videoCanPlay: boolean;
	setVideoCanPlay: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ loaded, videoCanPlay, setVideoCanPlay }) => {
	// Wait until video has loaded before allowing animation to occur
	return (
		<div
			className={`fixed top-0 left-0 z-0 w-screen overflow-hidden object-cover opacity-50 transition-[height] delay-300 duration-[1.1s] ease-in-out ${
				loaded && videoCanPlay ? "h-screen" : "h-[0vh]"
			}`}
		>
			<video
				autoPlay
				loop
				muted
				playsInline
				onCanPlay={() => setVideoCanPlay(true)}
				className={`absolute top-0 left-0 z-0 h-screen w-screen transform-gpu object-cover transition-[transform] delay-300 duration-[1.1s] ease-in-out ${
					loaded && videoCanPlay ? "scale-100" : "scale-150"
				}`}
			>
				<source src="/landing.mp4" type="video/mp4" />
			</video>
		</div>
	);
};

export default BannerVideo;
