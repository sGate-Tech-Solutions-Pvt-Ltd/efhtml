const HeadingWrapper = ({ sectionHeadingLinkUrl, classNames, children }) =>
	sectionHeadingLinkUrl ? (
		<a href={sectionHeadingLinkUrl} className={classNames}>
			{children}
		</a>
	) : (
		<div className={classNames}>{children}</div>
	);
export default HeadingWrapper;
