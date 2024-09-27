import React from 'react';

const Timer = (props) => {
		return (
				<div className="game-timer">
						<span>{props.hours}</span>:<span>{props.minutes}</span>:<span>{props.seconds}</span>
				</div>
		);
};

export default Timer;