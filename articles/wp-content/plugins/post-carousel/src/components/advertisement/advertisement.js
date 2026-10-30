// import { useState, useEffect } from '@wordpress/element';
// import { Button } from '@wordpress/components';
// import './editor.scss';

// const Advertisement = ( { attributes, setAttributes } ) => {
// 	const [ adContents, setAdContents ] = useState(
// 		attributes.adContents || [ '' ]
// 	);
// 	const [ expandedAds, setExpandedAds ] = useState( [ 0 ] );

// 	useEffect( () => {
// 		setAdContents( attributes.adContents || [ '' ] );
// 	}, [ attributes.adContents ] );

// 	const handleAddAdContent = () => {
// 		const newAdContents = [ ...adContents, '' ];
// 		setAdContents( newAdContents );
// 		setAttributes( { adContents: newAdContents } );
// 		setExpandedAds( [ newAdContents.length - 1 ] ); // Automatically expand the newly added ad
// 	};

// 	const handleAdContentChange = ( value, index ) => {
// 		const newAdContents = [ ...adContents ];
// 		newAdContents[ index ] = value;
// 		setAdContents( newAdContents );
// 		setAttributes( { adContents: newAdContents } );
// 	};

// 	const handleRemoveAdContent = ( index ) => {
// 		const newAdContents = adContents.filter( ( _, i ) => i !== index );
// 		setAdContents( newAdContents );
// 		setAttributes( { adContents: newAdContents } );
// 		setExpandedAds( [] ); // Collapse all ads if one is removed
// 	};

// 	const toggleExpandAd = ( index ) => {
// 		if ( expandedAds.includes( index ) ) {
// 			setExpandedAds( [] );
// 		} else {
// 			setExpandedAds( [ index ] );
// 		}
// 	};

// 	const onDragEnd = ( result ) => {
// 		const { source, destination } = result;

// 		if ( ! destination ) {
// 			return;
// 		}

// 		const reorderedItems = Array.from( adContents );
// 		const [ sourceItem ] = reorderedItems.splice( source.index, 1 );
// 		reorderedItems.splice( destination.index, 0, sourceItem );

// 		setAttributes( { adContents: reorderedItems } );
// 		setAdContents( reorderedItems );
// 	};

// 	return (
// 		<DragDropContext onDragEnd={ onDragEnd }>
// 			<Droppable droppableId="droppable">
// 				{ ( provided ) => (
// 					<div
// 						ref={ provided.innerRef }
// 						{ ...provided.droppableProps }
// 						className="sp-smart-post-advertisement-general-tab .sp-smart-post-header-right"
// 					>
// 						{ adContents.map( ( content, index ) => (
// 							<Draggable
// 								key={ 10 * index }
// 								draggableId={ index.toString() }
// 								index={ index }
// 							>
// 								{ ( provided ) => (
// 									<div
// 										ref={ provided.innerRef }
// 										{ ...provided.draggableProps }
// 										className={ `sp-smart-post-ad-content-item ${
// 											expandedAds.includes( index )
// 												? 'expanded'
// 												: ''
// 										}` }
// 									>
// 										<div
// 											className="sp-smart-post-ad-content-header"
// 											{ ...provided.dragHandleProps }
// 										>
// 											<div className="sp-smart-post-ad-title">{ `${
// 												index + 1
// 											}. Ads` }</div>
// 											<div className="sp-smart-post-ad-title-icon">
// 												<span
// 													className="sp-smart-post-dropdown-arrow"
// 													onClick={ () =>
// 														toggleExpandAd( index )
// 													}
// 												>
// 													{ expandedAds.includes(
// 														index
// 													) ? (
// 														<DownIconExpend />
// 													) : (
// 														<DownIcon />
// 													) }
// 												</span>
// 												<Button
// 													isDestructive
// 													onClick={ () =>
// 														handleRemoveAdContent(
// 															index
// 														)
// 													}
// 													className="sp-smart-post-remove-ad-button"
// 												>
// 													<CrossIcon />
// 												</Button>
// 											</div>
// 										</div>
// 										{ expandedAds.includes( index ) && (
// 											<div className="sp-smart-post-add-full-body">
// 												<div className="sp-smart-post-ad-gap"></div>
// 												<div className="sp-smart-post-code-mirror-container">
// 													<CodeMirror
// 														value={ content }
// 														options={ {
// 															mode: 'xml',
// 															theme: 'material',
// 															lineNumbers: true,
// 															readOnly: false,
// 														} }
// 														onBeforeChange={ (
// 															editor,
// 															data,
// 															value
// 														) => {
// 															handleAdContentChange(
// 																value,
// 																index
// 															);
// 														} }
// 														className="sp-smart-post-ad-textarea"
// 													/>
// 												</div>
// 											</div>
// 										) }
// 									</div>
// 								) }
// 							</Draggable>
// 						) ) }
// 						{ provided.placeholder }
// 						<Button
// 							onClick={ handleAddAdContent }
// 							className="sp-smart-post-add-ad-button"
// 						>
// 							Add New Ads
// 						</Button>
// 					</div>
// 				) }
// 			</Droppable>
// 		</DragDropContext>
// 	);
// };

// export default Advertisement;
