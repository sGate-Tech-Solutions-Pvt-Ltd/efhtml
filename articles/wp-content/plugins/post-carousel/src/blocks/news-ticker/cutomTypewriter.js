import { useEffect, useRef, useState } from "@wordpress/element";
import { stringTrim } from "../shared/helpFn";

const NewsTickerTypewriter = ({ posts = [], limit = "", className = "", showImage = false }) => {
	const [currentText, setCurrentText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);
	const [placeholderImg, setPlaceholderImg] = useState("");
	const animationRef = useRef(null);
	const stateRef = useRef({
		postIndex: 0,
		charIndex: 0,
		delay: 60,
		lastTime: 0,
	});

	useEffect(() => {
		setPlaceholderImg(
			window.location.origin + "/wp-content/plugins/smart-post-show-pro/public/assets/img/placeholder.png"
		);
	}, []);

	useEffect(() => {
		if (!posts.length) return;

		const animate = (timestamp) => {
			const state = stateRef.current;

			if (!state.lastTime) state.lastTime = timestamp;
			const delta = timestamp - state.lastTime;

			//   if (!isPaused && delta >= state.delay) {
			const { title, url, target } = posts[state.postIndex];
			const limitTitle = stringTrim(title, limit);

			if (delta >= state.delay) {
				let newCharIndex = isDeleting ? state.charIndex - 1 : state.charIndex + 1;
				const newText = limitTitle.substring(0, newCharIndex);

				setCurrentText(newText);
				state.charIndex = newCharIndex;
				state.delay = isDeleting ? 20 : 60;

				if (!isDeleting && newText === limitTitle) {
					state.delay = 1500; // Pause after full text
					setIsDeleting(true);
				} else if (isDeleting && newCharIndex === 0) {
					setIsDeleting(false);
					state.postIndex = (state.postIndex + 1) % posts.length;
					state.delay = 800; // Pause before next word
				}

				state.lastTime = timestamp;
			}

			animationRef.current = requestAnimationFrame(animate);
		};

		animationRef.current = requestAnimationFrame(animate);

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [posts, isDeleting]);
	//   }, [posts, isDeleting, isPaused]);

	if (!posts?.length) return null;

	const currentPost = posts[stateRef.current.postIndex] || {};
	const { url, target, post_thumbnail_url } = currentPost;

	return (
		<div
			className={`sps-news-ticker-typewriter-js`}
			//   onMouseEnter={() => setIsPaused(true)}
			//   onMouseLeave={() => setIsPaused(false)}
		>
			<span className={`${className}`}>
				{showImage && (
					<img src={post_thumbnail_url || placeholderImg} className="sp-ticker-img sp-img-circle" />
				)}
				<a className="sp-smart-post-ticker-title" href={url} target={target} rel="noopener noreferrer">
					{currentText}
				</a>
			</span>
		</div>
	);
};

export default NewsTickerTypewriter;
