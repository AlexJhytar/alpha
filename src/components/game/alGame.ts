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

export const gridWithImg = ({selectedValue, arr}: IGridImg ) => {
	lineX = [];
	lineY = [];
	
	for (let i = 0; i < arr.length; i++) {
		lineX.push({url: arr[i], id: i});
	}
	
	const shuffleArrObj: shuffleArr = {array: lineX};
	shuffleArray(shuffleArrObj);
	
	const chunkSize = Math.ceil(lineX.length/selectedValue);
	
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