import React, { useEffect, useRef, useState } from 'react';
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
						<option value="3">Easy</option>
						<option value="4">Medium</option>
						<option value="5">Hard</option>
						<option value="6">Ultra Difficult</option>
						<option value="12">Are you serious?</option>
				</select>
		);
};

export default SelectOption;