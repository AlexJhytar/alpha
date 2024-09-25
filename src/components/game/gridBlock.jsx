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
				removeClass('.grid-block', 'hovered')
				end({section, block});
		}
		
		const dragOverHandler = ( e ) => {
				e.preventDefault();
				
				if (e.target.className === 'grid-block') {
						e.target.classList.add('hovered');
						const blockIndex = {
								section: +e.target.closest('.grid-section').dataset.section,
								block: +e.target.dataset.block
						}
						over(blockIndex);
				}
		}
		
		const dragLeaveHandler = ( e, block ) => {
				e.target.classList.remove('hovered');
		}
		
		return blocks.map(( block, i ) => {
				let url = Object.keys(block).indexOf('url') !== -1 ? block.url : '';
				let id = Object.keys(block).indexOf('id') !== -1 ? block.id : block;

				return (
						<div className="grid-block"
						     draggable="true"
						     data-block={i}
						     data-index={id}
						     onDragOver={e => dragOverHandler(e)}
						     onDragLeave={e => dragLeaveHandler(e)}
						     onDragStart={e => dragStartHandler(e, i)}
						     onDragEnd={e => dragEndHandler(e, i)}
						     style={{width: `${size}px`, height: `${size}px`}}
						     key={i}
						>
								{
										!isNaN(block) ? block : <img src={url} alt=""/>
								}
						</div>
				);
		})
};

export default GridBlock;