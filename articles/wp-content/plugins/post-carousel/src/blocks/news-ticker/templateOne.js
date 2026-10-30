import { humanReadableTimeAgo } from "../../controls/controls";
import { CarouselNavArrowStyleTab } from "../shared/styleTab";
import { formatDate, Icon, jsonParse, stringTrim } from "../shared/helpFn";
import placeholderImg from "../../../public/assets/img/placeholder.png";

const TemplateOne = ({ data, attributes, thumbIndex = "" }) => {
	const {
		// titleHTMLTag: TitleTag,
		tickerDate,
		tickerDateType,
		metaDateFormat,
		tickerTitleListStyleEnble,
		tickerListStyle,
		tickerListStyleColor,
		tickerImagePosition,
		tickerImg,
		titleLength,
		tickerImgShape,
	} = attributes;

	const rawDate = data?.date;
	const postDateDefault = data?.post_date?.default;

	// Determine formatted date
	const date =
		// eslint-disable-next-line no-nested-ternary
		tickerDateType === "date"
			? metaDateFormat === "time_ago"
				? humanReadableTimeAgo(new Date(rawDate))
				: postDateDefault // both 'default' and 'custom' fallback here
			: formatDate(rawDate, tickerDateType);

	return (
		<div className={`sp-smart-post-card-content`}>
			{tickerTitleListStyleEnble && <Icon iconSourse={tickerListStyle} color={tickerListStyleColor} />}

			{/* { tickerImg && tickerImagePosition === 'left' && (
				<img
					src={ data?.post_thumbnail_url }
					alt={ data?.post_thumbnail_url }
					className={`sp-ticker-img sp-img-${tickerImgShape}`}
				/>
			) }

			{ data?.title && (
				<TitleTag className="sp-smart-post-ticker-title">
					{ stringTrim( data.title, titleLength ) }
				</TitleTag>
			) }

			{ tickerImg && tickerImagePosition === 'right' && (
				<img
					src={ data?.post_thumbnail_url }
					alt={ data?.post_thumbnail_url }
					className={`sp-ticker-img sp-img-${tickerImgShape}`}
				/>
			) } */}
			<div
				className={`sp-smart-post-ticker-title-img-wrapper sp-d-flex${
					tickerImg ? " sp-img-" + tickerImagePosition : ""
				}`}
			>
				{tickerImg && (
					<img
						src={data?.post_thumbnail_url || placeholderImg}
						alt={data?.post_thumbnail_url || ""}
						className={`sp-ticker-img sp-img-${tickerImgShape}`}
					/>
				)}
				{data?.title && (
					<span className="sp-smart-post-ticker-title">{data.title}</span>
				)}
				{tickerDate && <span className="ticker-date">{date}</span>}
			</div>
		</div>
	);
};

export default TemplateOne;
