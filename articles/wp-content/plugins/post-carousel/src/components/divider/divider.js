import "./editor.scss";
const Divider = ({ position = "", color = "" }) => {
	return (
		<span
			className={`sp-smart-post-divider ${position} ${color}`}
			style={{
				...(color && { borderBottom: `2px solid ${color}` }),
			}}
		></span>
	);
};

export default Divider;
