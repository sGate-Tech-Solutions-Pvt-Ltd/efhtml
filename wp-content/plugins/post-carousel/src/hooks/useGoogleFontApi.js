import { useEffect, useState } from "@wordpress/element";

const fetchFonts = async () => {
	try {
		const response = await fetch(
			"https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCJIzfKoHlACqsmK1zDzl-OAsgtJPk8BtI"
		);
		if (response.status === 200) {
			return response.json();
		}
	} catch (error) {
		console.error("Error fetching Google Fonts:", error);
	}
};

const useGoogleFonts = () => {
	const [fonts, setFonts] = useState([]);
	useEffect(() => {
		if (!fonts.length) {
			fetchFonts().then((data) => {
				const fonts = data.items.map((item) => {
					return {
						label: item.family,
						value: item.family,
						font: { family: item.family, variants: item.variants },
					};
				});
				setFonts(fonts);
			});
		}
	}, []);

	return { googleFonts: fonts };
};

export default useGoogleFonts;
