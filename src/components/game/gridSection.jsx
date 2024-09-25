import GridBlock from "@/components/game/gridBlock";
import React, { useEffect, useState } from "react";

const GridSection = ( {sections, dimension, results} ) => {
		const [dragStart, setDragStart] = useState({});
		const [dragEnd, setDragEnd] = useState({});
		const [dragOver, setDragOver] = useState({});
		
		const dragStartHandler = ( i ) => {
				setDragStart(i);
		}
		
		const dragEndHandler = ( i ) => {
				setDragEnd(i);
		}
		
		const dragOverHandler = ( i ) => {
				setDragOver(i);
		}
		
		useEffect(() => {
				results({dragStart, dragOver})
		}, [dragEnd]);
		
		return sections.map(( blocks, index ) => {
				return (
						<div key={index} className="grid-section" data-section={`${index}`}>
								< GridBlock
										blocks={blocks}
										size={dimension}
										start={dragStartHandler}
										end={dragEndHandler}
										over={dragOverHandler}
								/>
						</div>
				)
		});
};

export default GridSection;