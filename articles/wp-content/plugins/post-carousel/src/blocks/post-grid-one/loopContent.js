import TemplateOne from "../shared/templates/templateCards/templateOne";

import { availableLargeContent } from "../../controls/constants";
import { Fragment, useEffect, useState } from "@wordpress/element";

const LoopContent = ({
	posts,
	attributes,
	largeItemIndex = false,
	containerRef,
}) => {
	const { postGridLayout } = attributes;

	const isAvailableLargeItem = availableLargeContent.includes(postGridLayout);



	const [selectedPostId, setSelectedPostId] = useState(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (containerRef.current && !containerRef.current.contains(event.target)) {
				setSelectedPostId(null);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<>
			{posts?.map((post, i) => (
				<Fragment key={i}>
					<TemplateOne
						key={post?.post_id}
						index={i}
						data={post}
						posts={posts}
						largeItem={isAvailableLargeItem}
						largeItemIndex={largeItemIndex}
						attributes={attributes}
						isSelected={selectedPostId === post?.post_id}
						onSelect={() => setSelectedPostId(post?.post_id)}
					/>
				</Fragment>
			))}
		</>
	);
};

export default LoopContent;
