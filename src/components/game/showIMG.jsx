import React, { useEffect, useState } from 'react';

const ShowImg = ({src, status}) => {
		const [hide, setHide] = useState(true);
		
		const hideImage = () => {
				setHide(false);
		}
		
		useEffect(() => {
				status(hide)
		}, [hide]);
		
		return (
				<div className={`game-fullImage`}>
						<div className="hide-image" onClick={hideImage}></div>
						<img src={src} alt="" />
				</div>
		);
};

export default ShowImg;