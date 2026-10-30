import { __ } from "@wordpress/i18n";
import { BlockTypeIcon } from "../../icons/icons";

const FilterSidebar = ( props ) => {
    const {
        changeStates,
		fieldValue,
		fieldOptions,
        allData,
        tabName,
    } = props;

    const filterCount = allData?.reduce( (acc, item) => {
        if ( tabName === "ready-pages" ) {
            item.pages?.forEach((page) => {
                const type = page.type;
                if (type) {
                    acc[type] = (acc[type] || 0) + 1;
                }
            });
        } else {
            const category = item.category;
            acc[category] = (acc[category] || 0) + 1;
        }
        return acc;
    }, {});

    // Calculate Free/Pro counts for Pattern Types
    const freeProCount = allData?.reduce(
        (acc, item) => {
            acc.all = (acc.all || 0) + 1;
            if (item.pro) {
                acc.pro = (acc.pro || 0) + 1;
            } else {
                acc.free = (acc.free || 0) + 1;
            }
            return acc;
        },
        { all: 0, free: 0, pro: 0 }
    );

    const blockTypeObject = {
        "ready-patterns": __("Block Types", "post-carousel"),
        "starter-sites": __("Category Types", "post-carousel"),
        "ready-pages": __("Pages Types", "post-carousel"),
    }

    return (
        <div className="sp-smart-template-filter-category">
            <h3 className="sp-smart-template-library-sidebar-header Pattern-Types">
               Pattern Types
            </h3>
            <div className="sp-smart-post-patter-type">
                {["all", "free", "pro"].map((option, index) => (
                    <label
                        key={index}
                        htmlFor={`free-pro-option-${index}`}
                        className={`components-radio-control__option ${option === fieldValue?.freePro ? "sp-active" : ""}`}
                    >
                        <input
                            type="radio"
                            id={`free-pro-option-${index}`}
                            name="sp-smart-free-pro-option"
                            className="components-radio-control__input"
                            value={option}
                            checked={option === fieldValue?.freePro}
                            onChange={() => changeStates("freePro", option)}
                        />
                        <span className="components-radio-control__label">
                            {option === "all" && "All"}
                            {option === "free" && "Free"}
                            {option === "pro" && "Pro"}
                            <span>
                                {option === "all" && `(${freeProCount?.all ?? 0})`}
                                {option === "free" && `(${freeProCount?.free ?? 0})`}
                                {option === "pro" && `(${freeProCount?.pro ?? 0})`}
                            </span>
                        </span>
                    </label>
                ))}
            </div>
            <h3 className="sp-smart-template-library-sidebar-header Block-Types">
               <BlockTypeIcon /> { blockTypeObject[tabName] }
            </h3>
            { fieldOptions?.filterArr?.length > 0 && (
                <>
                <div className="sp-smart-sidebar-category-filter">
                    { fieldOptions?.filterArr?.map( (option, index) => {
                        const allOptionCount = tabName === "ready-pages" ? fieldOptions?.filterArr?.length : allData?.length;
                        const optionCount = filterCount[ option?.value ]

                        return (
                            <label
                                key={ index }
                                htmlFor={`filter-option-${index}`}
                                className={`sp-smart-sidebar-option ${option?.value === fieldValue?.filter ? "sp-active" : ""}`}
                            >
                                <input
                                    type="radio"
                                    id={`filter-option-${index}`}
                                    name="sp-smart-category-option"
                                    className="sp-smart-category-filter"
                                    value={option?.value}
                                    checked={ option?.value === fieldValue?.filter }
                                    onChange={() => changeStates("filter", option?.value)}
                                />
                                <span className="sp-smart-radio-label">
                                    {option?.label}
                                    { option?.value === "all" && ( <span>({allOptionCount})</span> ) }
                                    { (option?.value !== "all" && filterCount[ option?.value ]) && ( <span>({optionCount})</span> ) }
                                </span>
                            </label>
                        );
                    })}
                </div>
                </>
            ) }
        </div> 
    );
}
export default FilterSidebar;