import React from 'react';

const BannerSubTitle = (props) => {
	 return (
			<div className="banner__subtitle"
									dangerouslySetInnerHTML={{__html: props.text}} />
	 );
};

export default BannerSubTitle;