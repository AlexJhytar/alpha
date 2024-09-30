import React, { useEffect, useState } from 'react';

const FullScreen = () => {
		const [pageURL, setPageURL] = useState('');
		const [fullPage, setFullPage] = useState(true);
		
		useEffect(() => {
				setPageURL(window.location.origin);
		});
		
		const toggleFullScreen = () => {
				setFullPage(prevCheck => !prevCheck);
				fullPage ? document.querySelector('.game').classList.add('fullScreen') : document.querySelector('.game').classList.remove('fullScreen');
		};
		
		useEffect(() => {
				console.log(fullPage)
				
		}, [fullPage]);
		
		return (
				<div className="game-fullScreen">
						<button type={"button"} onClick={toggleFullScreen} className={`game-fullScreen__button button`}>
								<img src={`${pageURL}/image/${fullPage ? 'fullscreen' : 'exit-full'}.png`} alt="" />
						</button>
				</div>
		);
};

export default FullScreen;