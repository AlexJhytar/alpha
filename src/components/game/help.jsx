import React, { useEffect, useState } from 'react';
import { useTimer } from 'react-timer-hook';

const Help = ( {option, expiryTimestamp} ) => {
		const [pageURL, setPageURL] = useState('');
		useEffect(() => {
				setPageURL(window.location.origin);
		});
		
		const {
				totalSeconds,
				seconds,
				minutes,
				hours,
				days,
				isRunning,
				start,
				pause,
				resume,
				restart,
		} = useTimer({
				expiryTimestamp,
				autoStart: false,
				onExpire: () => document.querySelector('.game-help button').classList.remove('active'),
		});
		
		useEffect(() => {
				pause();
				document.querySelector('.game-help').classList.remove('active');
		}, [option])
		
		const getRandomNumber = max => {
				return Math.floor(Math.random()*(max + 1));
		}
		
		const handleClickHelp = e => {
				let gameBlocks = document.querySelectorAll('.grid-block');
				let guessedBlocks = 0;
				let hiddenBlocks = [];
				
				e.target.classList.add('active')
				
				const newExpiryTime = new Date();
				newExpiryTime.setSeconds(newExpiryTime.getSeconds() + 59);
				restart(newExpiryTime);
				
				gameBlocks.forEach(block => {
						block.classList.contains('correct') ? guessedBlocks++ : hiddenBlocks.push(block.dataset.index);
						block.setAttribute('data-move', 'false');
						block.setAttribute('data-help', 'false');
				})
				
				const randomIndex = Math.floor(Math.random()*hiddenBlocks.length);
				const randomNumber = hiddenBlocks[randomIndex];
				gameBlocks[randomNumber].setAttribute('data-move', 'true');
				const helpIndex = +gameBlocks[randomNumber].dataset.index;
				
				gameBlocks.forEach(( block, i ) => {
						if (i === helpIndex) block.setAttribute('data-help', 'true');
				})
		}
		
		let checkSec = seconds === 0 ? '' : seconds
		
		return (
				<div className="game-help">
						<button type="button" onClick={handleClickHelp} className="game-help__button button">
								<span>{checkSec}</span>
								<img src={`${pageURL}/image/help.png`} alt=""/>
						</button>
				</div>
		);
};

export default Help;