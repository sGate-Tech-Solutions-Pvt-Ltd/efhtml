import { ResizableBox } from "@wordpress/components";
import { store as blockEditorStore } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import { rangerCss } from "../shared/helpFn";
import { useDeviceType } from "../../controls/controls";
import { dispatch } from "@wordpress/data";
import { useEffect, useRef, useState } from "@wordpress/element";

const ResizableComponents = ({ attributes, setAttributes, clientId }) => {
    const { columns, containerFlexDirection, columnsGap } = attributes;
    const deviceType = useDeviceType();
    const { getBlockOrder, getBlock } = useSelect((select) => select("core/block-editor"), [ columns ]);
    const { updateBlockAttributes } = dispatch("core/block-editor");
    const innerBlocks = getBlockOrder(clientId);
    const [ containerResizeWidth, setContainerResizeWidth ] = useState(0);
    const resizableRef = useRef(null);

    const flexDirection = containerFlexDirection?.device?.[ deviceType ];
    const childBlockArray = flexDirection !== "row-reverse" ? innerBlocks : [...innerBlocks].reverse();

    useEffect( () => {
        if ( !resizableRef?.current ) {
            return;
        }
        const measure = () => {
            const containerEl = resizableRef.current.closest(".sp-smart-post-container-parent-block");
            const containerWidth = containerEl?.offsetWidth || resizableRef?.current?.offsetWidth || 0;
            setContainerResizeWidth( containerWidth );
        }
        measure();
        const node = resizableRef.current?.closest?.(".sp-smart-post-container-parent-block");
		let ro;
		if (node && "ResizeObserver" in window) {
			ro = new ResizeObserver(measure);
			ro.observe(node);
		}
		window.addEventListener("resize", measure);
		return () => {
			window.removeEventListener("resize", measure);
			if (ro) {
				ro.disconnect();
			}
		};
    }, []);

    const getPctDelta = (totalWidth, delta) => {
		const width = totalWidth || 0;
		if (!width) {
			return 0;
		}
		return Math.round(((delta?.width || 0) / width) * 100);
	};

    const minMaxWidth = ( currentIndex, minMax ) => {
        let width = 0;
        if (!Array.isArray(innerBlocks) || innerBlocks.length === 0) {
            return width;
        }
       if ( minMax === "max" ) {
            for ( let i = 0; i <= currentIndex; i++ ) {
                const childWidth = getBlock( childBlockArray[i] )?.attributes?.columnWidth?.device?.[deviceType];
                width = childWidth ? (width + childWidth ) : width - 8;
            }
            const currentChildWidth = getBlock( childBlockArray[ currentIndex + 1] )?.attributes?.columnWidth?.device?.[deviceType];
            width = currentChildWidth ? (width + currentChildWidth  - 8) : width - 8;
        }
        return width;
    }
    const getPreviousWidth = ( currentIndex ) => {
        if ( ! currentIndex  || currentIndex === 0 ) {
            return 0;
        }
        let width = 0;
        for ( let i = currentIndex; i > 0; i-- ) {
            const childWidth = getBlock( childBlockArray[i - 1] )?.attributes?.columnWidth?.device?.[deviceType];
            width = childWidth ? (width + childWidth ) : width;
        }
        return width;
    }
    const columnResizeHandler = ( event, direction, elt, delta ) => {
    }
    
    const columnResizeHandlerStop = ( event, direction, elt, delta ) => {
        const childIndex = parseInt( elt.dataset?.column );
        const resizableWidth = getPctDelta(containerResizeWidth, delta );
        const childBlockWidth = getBlock(childBlockArray[ childIndex ])?.attributes?.columnWidth;
        const updateWidth = childBlockWidth?.device?.[deviceType] + resizableWidth;
        const nextChildBlockWidth = getBlock(childBlockArray[ childIndex + 1 ])?.attributes?.columnWidth;
        const nextWidth = nextChildBlockWidth?.device?.[deviceType] - resizableWidth;

        updateBlockAttributes( childBlockArray[ childIndex ], {
            // columnWidth: {
            //    ...childBlockWidth,
            //    device: {
            //     ...childBlockWidth.device,
            //     [deviceType]: updateWidth,
            //    }
            // }
        } )
        updateBlockAttributes( childBlockArray[ childIndex + 1 ], {
            // columnWidth: {
            //    ...nextChildBlockWidth,
            //    device: {
            //     ...nextChildBlockWidth.device,
            //     [deviceType]: nextWidth,
            //    }
            // }
        } )
    }

  return (
    <div
        ref={ resizableRef }
        className="sp-resizable-box"
        style={{ 
            position: "absolute",
            top: 0,
            left: "auto",
            bottom: 0,
            width: containerResizeWidth,
            height: "auto",
        }}>
        { childBlockArray?.length > 1 && childBlockArray.slice( 0, -1 ).map( ( childId, index ) => {
            const childBlock = getBlock( childId );
            const childAttributes = childBlock.attributes;
            const { columnWidth } = childAttributes;
            const reduceGapWidth = (columnsGap?.device?.[ deviceType ] / childBlockArray.length ) * ( childBlockArray.length - ( index + 1 ) );
            const reducePtc = parseFloat( reduceGapWidth / containerResizeWidth * 100 );
            const widthStyle = `${columnWidth?.device?.[ deviceType ] + getPreviousWidth( index ) - reducePtc }%`;
            const isLast = index === ( innerBlocks.length - 1 );
            const minWidth = `${getPreviousWidth( index ) + 8}%`;
            const maxWidth = `${minMaxWidth( index, "max")}%`;
            
            return(
                <ResizableBox
                    key={ index }
                    enable={{ right: !isLast }}
                    size={{ width: widthStyle, height: "100%" }}
                    style={{ position: "absolute"}}
                    minWidth={ minWidth }
                    maxWidth={ maxWidth }
                    onResize={ columnResizeHandler }
                    onResizeStop={ columnResizeHandlerStop }
                    data-column={ index }
                />
            )}
        )}
    </div>
  )
}

export default ResizableComponents