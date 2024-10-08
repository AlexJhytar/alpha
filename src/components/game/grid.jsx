"use client";
import React, { useEffect, useRef, useState } from "react";
import GridSection from "@/components/game/gridSection";
import ChoiceImage from "@/components/game/choiceImage";
import SelectOption from "@/components/game/selectOption";
import StartGame from "@/components/game/startGame";
import Timer from "@/components/game/timer";
import { useStopwatch } from "react-timer-hook";
import Help from "@/components/game/help";
import { changeImage, gridArray, gridWithImg, updateHandler } from "@/components/game/alGame";
import ShowIMG from "@/components/game/showIMG";
import FullScreen from "@/components/game/fullScreen";

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
		const [fullPage, setFullPage] = useState(false);
		
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
				const gridWidth = window.innerHeight*0.6;
				const dimensions = gridWidth/option;
				dimensions === Infinity ? setBlockSize(0) : setBlockSize(dimensions);
				setGrid(getGrid);
				ref.current.classList.add('loading');
				return render(getGrid, dimensions);
		}
		
		const buildGridIMG = ( count ) => {
				checkWinOnBuild();
				const getGrid = gridWithImg({selectedValue: option, arr: uploadedImg.array});
				const gridWidth = count === 1 ? window.innerHeight : window.innerHeight*0.5;
				const dimensions = gridWidth/option;
				dimensions === Infinity ? setBlockSize(0) : setBlockSize(dimensions);
				setGrid(getGrid);
				document.querySelector('.game-image').classList.remove('loading')
				document.querySelector('.game-image').classList.add('added');
				return render(getGrid, dimensions);
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
		
		const winBlock = () => {
				ref.current.classList.add('win');
				document.querySelector('.game-help').style.display = 'none';
				const win = document.createElement('div');
				win.classList.add('game-win');
				ref.current.append(win);
				
				if (Object.keys(uploadedImg).length === 0) {
						win.innerHTML = 'You win!';
				}
				
				if (Object.keys(uploadedImg).length > 0) {
						ref.current.querySelectorAll('.grid-block').forEach(( block, index ) => {
								setTimeout(() => {
										block.classList.add('fall');
										
										if (index === ref.current.querySelectorAll('.grid-block').length - 1) {
												win.style.backgroundImage = `url(${uploadedImg.img})`;
												win.classList.add('active');
										}
								}, index*100);
						});
				}
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
								winBlock();
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
						if (block.classList.contains('fall')) block.classList.remove('fall');
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
		
		const clickHandleFullScreen = ( e ) => {
				setFullPage(prevState => !prevState);
				!fullPage ? document.querySelector('.game').classList.add('fullScreen') : document.querySelector('.game').classList.remove('fullScreen');
		};
		
		useEffect(() => {
				ref.current.removeAttribute('style');
				
				if (Object.keys(uploadedImg).length > 0) {
						setTimeout(() => {
								setGameBox(buildGrid());
						}, 500)
				}
				else {
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
						window.scrollTo({top: 200, behavior: "smooth"})
				}, 10);
				
		}, [option]);
		
		useEffect(() => {
				if (Object.keys(uploadedImg).length > 0) {
						if (uploadedImg.aspectRatio > 1) {
								ref.current.classList.add('portrait');
								setGameBox(buildGridIMG(1));
						}
						else {
								setGameBox(buildGridIMG());
						}
						initGame(option);
						
						const getHeight = () => {
								let dimensions = [];
								const heightSection = document.querySelectorAll('.grid-section');
								heightSection.forEach(( item ) => {
										dimensions.push(item.getBoundingClientRect().height)
								})
								return (dimensions.length*dimensions[0]) + ((dimensions.length - 1)*2);
						}
						
						const gridHeight = async () => {
								return await new Promise(( resolve ) => {
										setTimeout(() => {
												resolve(getHeight());
										}, 200);
								});
						}
						
						gridHeight().then(res => {
								ref.current.style.height = res + 'px';
								ref.current.classList.remove('loading');
								ref.current.classList.add('loaded');
						});
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
								<FullScreen callback={clickHandleFullScreen} status={fullPage}/>
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
								<ChoiceImage removedImg={checkRemovedImg} statusImg={showIMgModal}
								             showImg={showImage}
								             callback={getImage}/>
								{
										Object.keys(uploadedImg).length > 0 ? (
												<>
														<FullScreen callback={clickHandleFullScreen} status={fullPage}/>
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