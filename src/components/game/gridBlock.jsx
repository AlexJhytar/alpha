import React from 'react';

const GridBlock = ( {blocks, size, over, start, end} ) => {
		const removeClass = (block, className) => {
				document.querySelectorAll(`${block}`).forEach(el => {
						if (el.classList.contains(`${className}`)) el.classList.remove(className);
				})
		}
		
		const dragStartHandler = ( e, block ) => {
				const section = +e.currentTarget.closest('.grid-section').dataset.section;
				e.target.classList.add('started');
				start({section, block});
		}
		
		const dragEndHandler = ( e, block ) => {
				const section = +e.currentTarget.closest('.grid-section').dataset.section;
				e.target.classList.remove('started');
				removeClass('.grid-block', 'hovered');
				end({section, block});
		}
		
		const dragOverHandler = ( e ) => {
				if (e.target.className === 'grid-block') {
						e.target.classList.add('hovered');
						
						if (e.target.className === 'grid-block hovered') {
								const blockIndex = {
										section: +e.target.closest('.grid-section').dataset.section,
										block: +e.target.dataset.block
								}
								return over(blockIndex);
						}
				}
				
				if (e.target.className === 'grid-block started') {
						const blockIndex = {
								section: +e.target.closest('.grid-section').dataset.section,
								block: +e.target.dataset.block
						}
						return over(blockIndex);
				}
		}
		
		const dragLeaveHandler = ( e, block ) => {
				e.target.classList.remove('hovered');
		}
		
		return blocks.map(( block, i ) => {
				let url = Object.keys(block).indexOf('url') !== -1 ? block.url : '';
				let id = Object.keys(block).indexOf('id') !== -1 ? block.id : block;
				let styles = 	!isNaN(block) ? {width: `${size}px`, height: `${size}px`} : {width: `${size}px`, height: `100%`};

				return (
						<div className="grid-block"
						     draggable="true"
						     data-block={i}
						     data-index={id}
						     data-help="false"
						     data-move="false"
						
						     onDragOver={e => dragOverHandler(e)}
						     onDragLeave={e => dragLeaveHandler(e)}
						     onDragStart={e => dragStartHandler(e, i)}
						     onDragEnd={e => dragEndHandler(e, i)}
						     
						     onTouchMove={e => dragOverHandler(e)}
						     onTouchStart={e => dragStartHandler(e, i)}
						     onTouchEnd={e => dragEndHandler(e, i)}
						     style={styles}
						     key={i}
						>
								{
										!isNaN(block) ? block + 1 : <img src={url} alt=""/>
								}
						</div>
				);
		})
};

export default GridBlock;