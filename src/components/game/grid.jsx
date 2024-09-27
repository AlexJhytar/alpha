"use client";
import React, { useEffect, useRef, useState } from "react";
import GridSection from "@/components/game/gridSection";
import ChoiceImage from "@/components/game/choiceImage";
import SelectOption from "@/components/game/selectOption";
import StartGame from "@/components/game/startGame";
import Timer from "@/components/game/timer";
import { useStopwatch } from "react-timer-hook";
import Help from "@/components/game/help";

let lineX = [];
let lineY = [];

const Grid = () => {
		const [blocksInfo, setBlocksInfo] = useState([]);
		const [blockSize, setBlockSize] = useState(0);
		const [option, setOption] = useState(0);
		const [grid, setGrid] = useState([]);
		const [typeGame, setTypeGame] = useState('');
		const [uploadedImg, setUploadedImg] = useState({});
		const [gameBox, setGameBox] = useState(<></>);
		const ref = useRef(null);
		
		const {
				totalSeconds,
				seconds,
				minutes,
				hours,
				isRunning,
				start,
				pause,
				reset,
		} = useStopwatch({autoStart: false});
		
		const expiryTime = new Date();
		expiryTime.setSeconds(expiryTime.getSeconds() + 59);
		
		const formattedHours = String(hours).padStart(2, '0');
		const formattedMinutes = String(minutes).padStart(2, '0');
		const formattedSeconds = String(seconds).padStart(2, '0');
		
		const shuffleArray = ( array ) => {
				for (let i = array.length - 1; i > 0; i--) {
						const j = Math.floor(Math.random()*(i + 1));
						[array[i], array[j]] = [array[j], array[i]];
				}
		}
		const gridArray = ( index ) => {
				lineX = [];
				lineY = [];
				
				for (let i = 0; i < index*index; i++) {
						lineX.push(i);
				}
				
				shuffleArray(lineX)
				
				const chunkSize = Math.ceil(lineX.length/index); // Округлюємо вгору, щоб розділити рівномірно
				
				for (let j = 0; j < lineX.length; j += chunkSize) {
						lineY.push(lineX.slice(j, j + chunkSize));
				}
		}
		const gridWithImg = ( count, arr ) => {
				lineX = [];
				lineY = [];
				
				for (let i = 0; i < arr.length; i++) {
						lineX.push({url: arr[i], id: i});
						
				}
				
				shuffleArray(lineX)
				
				const chunkSize = Math.ceil(lineX.length/count); // Округлюємо вгору, щоб розділити рівномірно
				
				for (let j = 0; j < arr.length; j += chunkSize) {
						lineY.push(lineX.slice(j, j + chunkSize));
				}
		}
		
		const getBlocks = ( i ) => {
				setBlocksInfo(i);
		}
		
		const updateElement = ( section, block, value ) => {
				// Create a new copy of the grid state
				let newOption = [...grid];
				// Update the value of the block in the new copy of the grid
				newOption[section][block] = value;
				// Update the state with the new copy
				setGrid(newOption);
		}
		
		const render = ( options, dimension ) => {
				return (
						<GridSection sections={options}
						             dimension={dimension}
						             results={getBlocks}/>
				)
		}
		
		const checkWinOnBuild = () => {
				const blockWin = document.querySelector('.game-win');
				if (blockWin !== null) blockWin.remove();
		}
		
		const buildGrid = () => {
				checkWinOnBuild();
				const gridWidth = ref.current.getBoundingClientRect().width;
				const dimensions = gridWidth/option;
				dimensions === Infinity ? setBlockSize(0) : setBlockSize(dimensions);
				gridArray(option);
				setGrid(lineY);
				
				return render(lineY, dimensions);
		}
		
		const getImage = ( i ) => {
				setUploadedImg(i);
		}
		
		const getOption = ( i ) => {
				if (i > 0) {
						ref.current.classList.add('loading');
						reset();
						pause();
						
						setTimeout(() => {
								ref.current.classList.remove('loading');
						}, 600);
				}
				
				setOption(i);
		}
		
		const checkBlock = () => {
				let arrIndex = [];
				const blocks = document.querySelectorAll('.grid-block');
				blocks.forEach(( block, i ) => {
						const indexBlock = +block.dataset.index;
						arrIndex.push(indexBlock);
						
						indexBlock === i ? block.classList.add('correct') : block.classList.remove('correct');
						
				});
				
				const areConsecutiveNumbers = ( arr ) => {
						for (let i = 1; i < arr.length; i++) {
								if (arr[i] !== arr[i - 1] + 1) {
										return false; // Якщо не послідовні, повертаємо false
								}
						}
						return true; // Всі числа є послідовними
				}
				
				if (arrIndex.length > 0) {
						const result = areConsecutiveNumbers(arrIndex);
						
						if (result) {
								pause();
								const win = document.createElement('div');
								win.classList.add('game-win');
								win.innerHTML = 'You win!';
								ref.current.append(win);
						}
				}
		}
		
		const startGame = ( e ) => {
				setTypeGame(e.currentTarget.dataset.game);
				
				let buttons = document.querySelectorAll('.game-build');
				if (buttons.length > 0) {
						buttons.forEach(( item ) => {
								item.classList.remove('active');
						});
				}
				
				e.currentTarget.classList.add('active');
		}
		
		const initGame = ( numb ) => {
				const blocks = document.querySelectorAll('.grid-block');
				blocks.forEach(( block, i ) => {
						if (block.classList.contains('correct')) block.classList.remove('correct');
						numb > 6 ? block.classList.add('small-blocks') : block.classList.remove('small-blocks');
						block.setAttribute('data-help', 'false');
						block.setAttribute('data-move', 'false');
				});
		}
		
		const removeHelper = () => {
				const blocks = document.querySelectorAll('.grid-block');
				blocks.forEach(( block, i ) => {
						block.setAttribute('data-help', 'false');
						block.setAttribute('data-move', 'false');
				});
		}
		
		const updateGrid = () => {
				if (Object.keys(blocksInfo).length > 0 && blocksInfo.dragStart.block !== undefined && blocksInfo.dragOver.block !== undefined) {
						let start = lineY[blocksInfo.dragStart.section][blocksInfo.dragStart.block];
						let over = lineY[blocksInfo.dragOver.section][blocksInfo.dragOver.block];
						updateElement(blocksInfo.dragStart.section, blocksInfo.dragStart.block, over);
						updateElement(blocksInfo.dragOver.section, blocksInfo.dragOver.block, start);
						removeHelper();
						return setGameBox(render(grid, blockSize));
				}
		}
		
		const updateGridIMG = () => {
				gridWithImg(option, uploadedImg.array);
				setGrid(lineY);
				document.querySelector('.game-image_label').classList.remove('loading')
				document.querySelector('.game-image_label').classList.add('added');
				return setGameBox(render(lineY, blockSize));
		}
		
		useEffect(() => {
				setGameBox(buildGrid());
				
				setUploadedImg({})
				if (Object.keys(uploadedImg).length > 0) {
						document.querySelector('.game-image_label').classList.remove('added');
						document.querySelector('.game-image ul').innerHTML = '<li><span>Upload an image to get started</span></li>';
						ref.current.classList.add('loaded');
				} else {
						ref.current.classList.remove('loaded');
				}
				
				setTimeout(() => {
						initGame(option);
				}, 10);
		}, [option]);
		
		useEffect(() => {
				if (Object.keys(uploadedImg).length > 0) {
						updateGridIMG();
						ref.current.classList.add('loaded');
				}
		}, [uploadedImg]);
		
		useEffect(() => {
				updateGrid();
				isRunning ? console.log('running') : start();
				
				setTimeout(() => {
						checkBlock();
				}, 10);
		}, [blocksInfo]);
		
		useEffect(() => {
				reset();
				pause();
				setOption(0);
				setUploadedImg({})
		}, [typeGame]);
		
		const gameTypeNumbers = () => {
				const checkOption = () => {
					return (<>
							<div className="line"></div>
							<Help option={option} expiryTimestamp={expiryTime}/>
							<div className="line"></div>
							<Timer hours={formattedHours} minutes={formattedMinutes}
							       seconds={formattedSeconds}/>
					</>)
				}
				
				return (
						<>
								<SelectOption option={getOption}/>
								{option > 0 ? checkOption() : ''}
						</>
				)
		}
		
		const gameTypePuzzle = () => {
				const checkOption = () => {
						return (<>
								<div className="line"></div>
								<ChoiceImage callback={getImage}/>
								<div className="line"></div>
								<Help option={option} expiryTimestamp={expiryTime}/>
								<div className="line"></div>
								<Timer hours={formattedHours} minutes={formattedMinutes}
								       seconds={formattedSeconds}/>
						
						</>)
				}
				
				return (
						<>
								<SelectOption option={getOption}/>
								{option > 0 ? checkOption() : ''}
						</>
				)
		}
		
		return (
				<>
						<StartGame onClick={startGame}/>
						<div className="game-settings">
								<div className="game-settings__wrap">
										{'numbers' === typeGame ? gameTypeNumbers() : ''}
										{'puzzle' === typeGame ? gameTypePuzzle() : ''}
								</div>
						</div>
						
						
						<div className={`game-grid ${typeGame === 'puzzle' ? 'puzzle' : ''}`} ref={ref}>
								{gameBox}
						</div>
				</>
		)
};

export default Grid;