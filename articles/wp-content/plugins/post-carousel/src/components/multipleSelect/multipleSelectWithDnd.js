import { useEffect, useRef, useState } from "@wordpress/element";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { arrayMoveImmutable } from "array-move";
import "./dnd-select.scss";

let optionOpen = true;
const MultipleSelectWithDnd = ({ label = "", items, values, onChange, onInputChange = false, searchable = false }) => {
	const [allOptions, setAllOptions] = useState([]);
	const [searchFieldData, setSearchFieldData] = useState("");
	const [toggleSelectField, setToggleSelectField] = useState(false);
	const allValues = values?.map((item) => item.value);
	const containerRef = useRef(null);

	const filterNotSelectedItems = (selectFieldItems) => {
		const result = selectFieldItems?.filter((item) => !allValues.includes(item.value));
		return result;
	};

	useEffect(() => {
		let options = [];
		if (toggleSelectField) {
			options = filterNotSelectedItems(items);
		} else {
			options = [];
		}
		setAllOptions(options);
	}, [items, values, toggleSelectField]);

	const handleSelectField = (data) => {
		const { id, value, _label } = data;
		const newValue = [...values, { id: id, value: value, label: _label }];
		setSearchFieldData("");
		onChange(newValue);
	};

	const handleSearchField = (event) => {
		const value = event.target.value.toLowerCase();
		setSearchFieldData(value);
		const searchableArray = filterNotSelectedItems(items);
		const matchedOption = searchableArray.filter((i) => i.label.toLowerCase().includes(value));
		onInputChange ? onInputChange(value) : setAllOptions(matchedOption);
	};

	const handleRemoveItems = (id) => {
		const updatedValues = values?.filter((val) => val.id !== id);
		onChange(updatedValues);
	};

	useEffect(() => {
		const handleClick = (e) => {
			if (!e.target.closest(".sp-multiple-select-dnd-container")) {
				setToggleSelectField(false);
			}
		};
		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, []);

	const dndRef = useRef(null);

	// icons
	const DeleteIcon = () => {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" width={8} height={8} fill="none">
				<path
					fill="#2F2F2F"
					d="M4 4.778 6.722 7.5l.778-.778L4.778 4 7.5 1.278 6.722.5 4 3.222 1.278.5.5 1.278 3.222 4 .5 6.722l.778.778L4 4.778Z"
				/>
			</svg>
		);
	};
	const ArrowIconOne = () => (
		<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} aria-hidden="true" className="">
			<path d="M17.5 11.6 12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z" />
		</svg>
	);
	const ArrowIconTwo = () => (
		<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} aria-hidden="true">
			<path d="M6.5 12.4 12 8l5.5 4.4-.9 1.2L12 10l-4.5 3.6-1-1.2z" />
		</svg>
	);

	// dnd
	const onDragEnd = (result) => {
		setToggleSelectField(false);
		const { source, destination } = result;
		if (!destination) {
			return;
		}
		const from = source.index;
		const to = destination.index;
		const updatedArray = arrayMoveImmutable(values, from, to);
		onChange(updatedArray);
		optionOpen = true;
	};

	const onDragStart = () => {
		optionOpen = false;
		setToggleSelectField(false);
	};

	const toggleSelectFieldVal = () => {
		if (optionOpen) {
			setToggleSelectField((prev) => !prev);
		}
	};

	const containerHeight = values?.length * 34 + 2 + "px";

	return (
		<div className="shaped-plugin-multiple-select sp-smart-post-component-mb" ref={dndRef}>
			<div className="sp-multiple-select-dnd-label">
				<p> {label}</p>
			</div>
			<div className="sp-multiple-select-dnd-container" ref={containerRef}>
				<div onClick={toggleSelectFieldVal} className="sp-select-header">
					<div className="sp-selected-options" style={{ height: containerHeight }}>
						<DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
							<Droppable droppableId={`${dndRef?.current}`} direction="vertical">
								{(provided) => (
									<div ref={provided.innerRef} {...provided.droppableProps}>
										{values?.map((item, i) => (
											<Draggable key={item?.id} draggableId={`${item?.id}`} index={i}>
												{(provided) => (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
													>
														<div className="sp-selected-option">
															<span className="sp-select-label">{item?.label}</span>
															<span
																className="sp-select-remove-button"
																onClick={() => handleRemoveItems(item.id)}
															>
																<DeleteIcon />
															</span>
														</div>
													</div>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</DragDropContext>
					</div>
					<span className="custom-select-arrow">
						{toggleSelectField ? <ArrowIconTwo /> : <ArrowIconOne />}
					</span>
				</div>
				{toggleSelectField && (
					<div className="sp-select-options">
						{searchable && (
							<input
								placeholder="Search here for more..."
								value={searchFieldData}
								onChange={(e) => handleSearchField(e)}
								className="sp-select-search-field"
							/>
						)}
						{allOptions?.length > 0 &&
							allOptions?.map((option, i) => {
								return (
									<div key={i}>
										{option.label && option.value && (
											<p
												onClick={() => handleSelectField(option)}
												className={`sp-select-option ${
													values === option.value ? "selected" : ""
												}`}
											>
												{option.label}
											</p>
										)}
									</div>
								);
							})}
					</div>
				)}
			</div>
		</div>
	);
};

export default MultipleSelectWithDnd;
