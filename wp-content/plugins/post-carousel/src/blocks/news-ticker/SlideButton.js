import { usePanelBodyContext } from "../../context";
import { arrowIcons } from "../../controls/constants";
import { isEditor } from "../../controls/controls";
import { Pause } from "../../icons/icons";

export const SlideButton = ({
	props = {
		dynamicClassNames: "",
		navArrowVisibilityOnHover: false,
	},
	tickerPause,
	tickerDivider,
	HeadingPosition,

	style,
	swiperNavNextRef = null,
	swiperNavPrevRef = null,
	newsTickerCarouselArrowColor,
}) => {
	const { navArrowVisibilityOnHover } = props;
	const { togglePanelBody } = usePanelBodyContext();
	const editPage = isEditor();

	const NavIcon = arrowIcons[style];

	return (
		<>
			<div
				className={`sp-smart-post-swiper-nav-arrow ${navArrowVisibilityOnHover ? " visible-on-hover" : ""}`}
				onClick={(e) => (editPage ? togglePanelBody("navigation", e) : null)}
			>
				{tickerDivider && HeadingPosition === "left" ? (
					<span className="sp-smart-post-swiper-nav-arrow-btn" style={{ fontSize: "30px", zIndex: 2 }}>
						<span className="divider"> | </span>
					</span>
				) : null}

				<span
					ref={swiperNavPrevRef}
					className={`sp-smart-post-swiper-nav-arrow-btn btn-prev `}
					style={{ position: "static", margin: "1px" }}
				>
					<i>
						<NavIcon />
					</i>
				</span>
				{tickerPause && (
					<span className="sp-smart-post-swiper-nav-arrow-btn" style={{ position: "static" }}>
						<i className="sp-icon-pause">
							<Pause fillColor={newsTickerCarouselArrowColor?.color} />
						</i>
					</span>
				)}

				<span
					ref={swiperNavNextRef}
					className={`sp-smart-post-swiper-nav-arrow-btn btn-next`}
					style={{ position: "static", margin: "1px" }}
				>
					<i>
						<NavIcon />
					</i>
				</span>
				{tickerDivider && HeadingPosition === "right" ? (
					<span style={{ fontSize: "30px", zIndex: 2 }}>|</span>
				) : null}
			</div>
		</>
	);
};
