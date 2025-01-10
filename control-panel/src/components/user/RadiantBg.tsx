const RadiantBg = () => {
	return (
		<div className="bg-wrapper fixed top-0 right-0 w-full h-full bg-[#141414] overflow-hidden">
			<div className="bg-noise bg-[url('/pics/Noise.png')] absolute w-full h-full top-0 right-0"></div>
			<div className="absolute top-0 right-0 w-full h-full blur-[250px]">
				<div className="purple-bg absolute bg-[#8e7bff] bottom-0 left-0 w-[700px] h-[700px] translate-x-[-30%] translate-y-[40%] mix-blend-lighten rounded-full animate-gradientShape1"></div>
				<div className="green-bg absolute bg-[#44f2eb] top-0 right-0 w-[600px] h-[600px] translate-x-[20%] translate-y-[-40%] mix-blend-lighten rounded-full animate-gradientShape2"></div>
			</div>
		</div>
	);
};

export default RadiantBg;
