import React, { useEffect, useRef } from 'react';
import { useTranslations } from "next-intl";

const SelectOption = ( {option} ) => {
		const ref = useRef();
		const t = useTranslations('Game');
		
		const getOption = event => {
				return option(event.target.value);
		}
		
		useEffect(() => {
				ref.current.addEventListener('change', getOption);
		}, []);
		
		return (
				<select className="game-option" ref={ref}>
						<option value="">{t('select')}</option>
						<option value="4">Easy</option>
						<option value="5">Medium</option>
						<option value="6">Hard</option>
						<option value="12">Ultra Difficult</option>
						<option value="16">Are you serious?</option>
				</select>
		);
};

export default SelectOption;