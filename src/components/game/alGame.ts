interface shuffleArr {
	array: any[],
}

export const shuffleArray = ({array}: shuffleArr) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

interface IGrid {
	option: number
}

let lineX = [];
let lineY = [];

export const gridArray = ({option}: IGrid) => {
	lineX = [];
	lineY = [];
	
	for (let i = 0; i < option * option; i++) {
		lineX.push(i);
	}
	
	const shuffleArrObj: shuffleArr = {array: lineX};
	shuffleArray(shuffleArrObj);
	
	const chunkSize = Math.ceil(lineX.length / option);
	
	for (let j = 0; j < lineX.length; j += chunkSize) {
		lineY.push(lineX.slice(j, j + chunkSize));
	}
	
	return lineY;
}

interface IGridImg {
	selectedValue: number,
	arr: any[],
}

export const gridWithImg = ({selectedValue, arr}: IGridImg) => {
	lineX = [];
	lineY = [];
	
	for (let i = 0; i < arr.length; i++) {
		lineX.push({url: arr[i], id: i});
	}
	
	const shuffleArrObj: shuffleArr = {array: lineX};
	shuffleArray(shuffleArrObj);
	
	const chunkSize = Math.ceil(lineX.length / selectedValue);
	
	for (let j = 0; j < arr.length; j += chunkSize) {
		lineY.push(lineX.slice(j, j + chunkSize));
	}
	
	return lineY;
}

interface updateHandler {
	section: number,
	block: number,
}

export const updateHandler = ({section, block}: updateHandler) => {
	return lineY[section][block];
}

export const changeImage = () => {
	const gridBlock = document.querySelector('.game-grid');
	const block = document.querySelector('.game-image');
	const help = document.querySelector('.game-help');
	const timer = document.querySelector('.game-timer');
	const status = block.getAttribute('data-status');
	const defaultImg = `${window.location.origin}/image/1x1.png`;
	
	switch (status) {
		case 'waiting': {
			block.setAttribute('data-status', 'loaded');
			gridBlock.classList.remove('no-image');
			block.querySelector('ul').remove();
			if (help !== null) help.classList.remove('inactive');
			if (timer !== null) timer.classList.remove('inactive');
			break;
		}
		
		case 'loaded': {
			block.setAttribute('data-status', 'waiting');
			gridBlock.classList.add('no-image');
			if (help !== null) help.classList.add('inactive');
			if (timer !== null) timer.classList.add('inactive');
			if (block.classList.contains('added')) block.classList.remove('added');
			block.querySelector('img').src = defaultImg;
			const alert = document.createElement('ul');
			alert.innerHTML = `<li><span>Upload an image to get started</span></li>`;
			block.append(alert);
			break;
		}
		
		default: {
			block.setAttribute('data-status', 'waiting');
			block.querySelector('img').src = defaultImg;
			const alert = document.createElement('ul');
			alert.innerHTML = `<li><span>Upload an image to get started</span></li>`;
			block.append(alert);
			break;
		}
	}
}