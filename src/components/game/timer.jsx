import React from 'react';

const Timer = ( props ) => {
		return (
				<div className="game-timer">
						<div className="game-timer__wrap">
								<span>{props.hours}</span>:<span>{props.minutes}</span>:<span>{props.seconds}</span>
						</div>
				</div>
		);
};

export default Timer;