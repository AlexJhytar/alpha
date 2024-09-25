import React, { useEffect, useState } from 'react';
import { useTranslations } from "next-intl";

const StartGame = ( {onClick} ) => {
		const t = useTranslations('Game');
		
		const [pageURL, setPageURL] = useState('');
		useEffect(() => {
				setPageURL(window.location.origin);
		})
		
		return (
				<div className="game-type">
						<button className="button button-default button-green game-build" data-game="numbers"
						        onClick={onClick}
						        type="button">
								<img src={`${pageURL}/image/numbers.png`} alt="" />
								<span>{t('numbers')}</span>
						</button>
						<button className="button button-default button-green game-build" data-game="puzzle"
						        onClick={onClick}
						        type="button">
								<img src={`${pageURL}/image/puzzle.png`} alt=""/>
								<span>{t('puzzle')}</span>
						</button>
				</div>
		)
};

export default StartGame;