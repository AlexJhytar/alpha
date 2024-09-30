import React, { useEffect, useState } from 'react';

const FullScreen = ( {callback, status} ) => {
		const [pageURL, setPageURL] = useState('');
		
		useEffect(() => {
				setPageURL(window.location.origin);
		});
		
		const toggleFullScreen = ( e ) => {callback(e)};
		
		return (
				<div className="game-fullScreen">
						<button type={"button"} onClick={toggleFullScreen}
						        className={`game-fullScreen__button button`}>
								<img src={`${pageURL}/image/${!status ? 'fullscreen' : 'exit-full'}.png`} alt=""/>
						</button>
				</div>
		);
};

export default FullScreen;