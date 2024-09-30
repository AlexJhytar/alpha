"use client";
import React, { useEffect, useRef, useState } from "react";
import GridSection from "@/components/game/gridSection";
import ChoiceImage from "@/components/game/choiceImage";
import SelectOption from "@/components/game/selectOption";
import StartGame from "@/components/game/startGame";
import Timer from "@/components/game/timer";
import { useStopwatch } from "react-timer-hook";
import Help from "@/components/game/help";
import { gridArray, gridWithImg, updateHandler, changeImage } from "@/components/game/alGame";
import ShowIMG from "@/components/game/showIMG";

const Grid = () => {
		const [blocksInfo, setBlocksInfo] = useState([]);
		const [blockSize, setBlockSize] = useState(0);
		const [option, setOption] = useState(0);
		const [grid, setGrid] = useState([]);
		const [typeGame, setTypeGame] = useState('');
		const [uploadedImg, setUploadedImg] = useState({});
		const [showIMgModal, setShowIMgModal] = useState(false);
		const [removedImg, setRemovedImg] = useState(false);
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
		
		const getBlocks = ( i ) => {
				setBlocksInfo(i);
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
				const getGrid = gridArray({option: option});
				const gridWidth = ref.current.getBoundingClientRect().width;
				const dimensions = gridWidth/option;
				dimensions === Infinity ? setBlockSize(0) : setBlockSize(dimensions);
				setGrid(getGrid);
				ref.current.classList.add('loading');
				
				return render(getGrid, dimensions);
		}
		
		const buildGridIMG = () => {
				checkWinOnBuild();
				const getGrid = gridWithImg({selectedValue: option, arr: uploadedImg.array});
				const gridWidth = ref.current.getBoundingClientRect().width;
				const dimensions = gridWidth/option;
				dimensions === Infinity ? setBlockSize(0) : setBlockSize(dimensions);
				setGrid(getGrid);
				document.querySelector('.game-image').classList.remove('loading')
				document.querySelector('.game-image').classList.add('added');
				return render(getGrid, blockSize);
		}
		
		const getImage = ( i ) => {
				setUploadedImg(i);
				
				reset();
				pause();
		}
		
		const getOption = ( i ) => {
				if (i > 0) {
						reset();
						pause();
						
						if (typeGame === 'numbers') {
								setTimeout(() => {
										ref.current.classList.remove('loading');
								}, 700);
						}
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
								document.querySelector('.game-help').style.display = 'none';
								win.classList.add('game-win');
								win.innerHTML = 'You win!';
								ref.current.append(win);
						}
				}
		}
		
		const checkRemovedImg = ( i ) => {
				setRemovedImg(i)
		}
		
		const startGame = ( e ) => {
				document.querySelector('.game').classList.add('update');
				let target = e.currentTarget;
				let type = target.dataset.game;
				
				setTimeout(() => {
						document.querySelector('.game').classList.remove('update');
				}, 1000);
				
				setTimeout(() => {
						setTypeGame(type);
						
						let buttons = document.querySelectorAll('.game-build');
						if (buttons.length > 0) {
								buttons.forEach(( item ) => {
										item.classList.remove('active');
								});
						}
						target.classList.add('active');
				}, 500)
		}
		
		const initGame = ( numb ) => {
				const blocks = document.querySelectorAll('.grid-block');
				const winBlock = document.querySelector('.game-win');
				const gameHelp = document.querySelector('.game-help');
				if (gameHelp !== null) {
						gameHelp.style.display = 'flex';
						if (gameHelp.querySelector('button').classList.contains('active')) gameHelp.querySelector('button').classList.remove('active');
				}
				
				if (winBlock !== null) winBlock.remove();
				blocks.forEach(( block, i ) => {
						if (block.classList.contains('correct')) block.classList.remove('correct');
						numb > 6 ? block.setAttribute('data-type', 'small') : block.removeAttribute('data-type');
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
				const updateElement = ( section, block, value ) => {
						let newOption = [...grid];
						newOption[section][block] = value;
						setGrid(newOption);
				}
				
				if (Object.keys(blocksInfo).length > 0 && blocksInfo.dragStart.block !== undefined && blocksInfo.dragOver.block !== undefined) {
						let start = updateHandler({
								section: blocksInfo.dragStart.section,
								block: blocksInfo.dragStart.block
						});
						let over = updateHandler({
								section: blocksInfo.dragOver.section,
								block: blocksInfo.dragOver.block
						});
						updateElement(blocksInfo.dragStart.section, blocksInfo.dragStart.block, over);
						updateElement(blocksInfo.dragOver.section, blocksInfo.dragOver.block, start);
						removeHelper();
						return setGameBox(render(grid, blockSize));
				}
		}
		
		const showImage = ( i ) => {
				setShowIMgModal(i);
		}
		
		const hideImage = ( i ) => {
				setShowIMgModal(i);
		}
		
		useEffect(() => {
				ref.current.removeAttribute('style');
				if (Object.keys(uploadedImg).length > 0) {
						setTimeout(() => {
								setGameBox(buildGrid());
						}, 500)
				} else {
						setGameBox(buildGrid());
				}
				
				setUploadedImg({});
				setShowIMgModal(false);
				
				if (Object.keys(uploadedImg).length > 0) {
						changeImage();
						ref.current.classList.add('loaded');
				}
				else {
						ref.current.classList.remove('loaded');
				}
				
				if (document.querySelector('.game-help') !== null) {
						document.querySelector('.game-help').style.display = 'flex';
				}
				
				setTimeout(() => {
						initGame(option);
				}, 10);
				
		}, [option]);
		
		useEffect(() => {
				if (Object.keys(uploadedImg).length > 0) {
						setGameBox(buildGridIMG());
						initGame(option);
						setTimeout(() => {
								let dimensions = [];
								const heightSection = document.querySelectorAll('.grid-section');
								heightSection.forEach(( item ) => {
										dimensions.push(item.getBoundingClientRect().height)
								})
								console.log(dimensions.length - 1)
								
								let res = (dimensions.length * dimensions[0]) + ((dimensions.length - 1) * 2);
								
								ref.current.style.height = res + 'px';
								ref.current.classList.remove('loading');
								ref.current.classList.add('loaded');
						}, 200)
				}
		}, [uploadedImg]);
		
		useEffect(() => {
				if (!isRunning) start();
				updateGrid();
				
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
		
		useEffect(() => {}, [showIMgModal]);
		
		useEffect(() => {
				if (!removedImg) ref.current.classList.add('loading');
				ref.current.removeAttribute('style');
				if (removedImg) {
						setUploadedImg({});
						setRemovedImg(false)
				}
		}, [removedImg]);
		
		const gameTypeNumbers = () => {
				if (document.querySelector('.game-grid').classList.contains('no-image'))
						document.querySelector('.game-grid').classList.remove('no-image');
				const checkOption = () => {
						return (<>
								<Help option={option} expiryTimestamp={expiryTime}/>
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
								<ChoiceImage removedImg={checkRemovedImg} statusImg={showIMgModal} showImg={showImage}
								             callback={getImage}/>
								
								{
										Object.keys(uploadedImg).length > 0 ? (
												<>
														<Help option={option} expiryTimestamp={expiryTime}/>
														<Timer hours={formattedHours} minutes={formattedMinutes}
														       seconds={formattedSeconds}/>
												</>
										) : ''
								}
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
						{
								
								typeGame === '' ? <></> :
										<div className={`game-settings ${'puzzle' === typeGame ? 'puzzle' : ''}`}>
												<div className={`game-settings__wrap`}>
														{'numbers' === typeGame ? gameTypeNumbers() : ''}
														{'puzzle' === typeGame ? gameTypePuzzle() : ''}
												</div>
										</div>
						}
						
						
						<div
								className={`game-grid ${option > 0 ? '' : 'no-option'} ${typeGame === 'puzzle' ? 'puzzle loading' : ''}  ${Object.keys(uploadedImg).length > 0 && typeGame === 'puzzle' ? '' : 'no-image'}`}
								ref={ref}>
								{gameBox}
								{showIMgModal ? <ShowIMG status={hideImage} src={uploadedImg.img}/> : ''}
						</div>
				</>
		)
};

export default Grid;