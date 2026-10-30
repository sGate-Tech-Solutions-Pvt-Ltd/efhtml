import classNames from "classnames";
import { humanReadableTimeAgo } from "../../controls/controls";
import { formatDate, Icon, stringTrim } from "../shared/helpFn";

const TemplateOne = ({
	data,
	tickerListStyle,
	tickerListStyleColor,
	tickerDate,
	tickerDateType,
	metaDateFormat,
	tickerImg,
	tickerImagePosition,
	tickerTitleListStyleEnble,
	titleLength,
	tickerImgShape,
	tickerTitleGlobalTypography,
	tickerDateGlobalTypography,
}) => {
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
		<div
			className={classNames(
				"sp-smart-post-ticker-title",
				tickerTitleGlobalTypography?.class ? tickerTitleGlobalTypography?.class : ""
			)}
		>
			{tickerTitleListStyleEnble && <Icon iconSourse={tickerListStyle} color={tickerListStyleColor} />}
			<div
				className={`sp-smart-post-ticker-title-img-wrapper sp-d-flex${
					tickerImg ? " sp-img-" + tickerImagePosition : ""
				}`}
			>
				{tickerImg && (
					<img
						src={data?.post_thumbnail_url || ""}
						alt={data?.post_thumbnail_url || data?.title}
						className={`sp-ticker-img sp-img-${tickerImgShape}`}
					/>
				)}
				<span> {data.title} </span>
			</div>

			{tickerDate && (
				<span
					className={classNames(
						"ticker-date",
						tickerDateGlobalTypography?.class ? tickerDateGlobalTypography?.class : ""
					)}
				>
					{date}
				</span>
			)}
		</div>
	);
};

export default TemplateOne;
