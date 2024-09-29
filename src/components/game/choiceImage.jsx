import React, { useEffect, useRef } from 'react';
import { changeImage } from "@/components/game/alGame";

const ChoiceImage = ( {showImg, removedImg, callback} ) => {
		let inputImg = useRef(null);
		let tagImg = useRef(null);
		let imageBlock = useRef(null);
		let croppedImage = [];
		
		const createImage = ( target, countSections ) => {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');
				croppedImage = [];
				
				const img = new Image();
				img.src = target;
				img.onload = function () {
						const width = img.width;
						const height = img.height;
						const rows = countSections;
						const cols = countSections;
						
						const partWidth = width/cols;
						const partHeight = height/rows;
						
						for (let i = 0; i < rows; i++) {
								for (let j = 0; j < cols; j++) {
										canvas.width = partWidth;
										canvas.height = partHeight;
										ctx.drawImage(img, j*partWidth, i*partHeight, partWidth, partHeight, 0, 0, partWidth, partHeight);
										
										const url = canvas.toDataURL('image/png');
										croppedImage.push(url);
								}
						}
				};
		}
		
		const handleFileSelect = ( event ) => {
				imageBlock.current.classList.add('loading');
				const selectedFile = event.target.files[0];
				const reader = new FileReader();
				let sections = document.querySelectorAll('.grid-section');
				
				reader.addEventListener('load', () => {
						createImage(reader.result, sections.length);
						tagImg.current.src = reader.result;
						changeImage();
						
						const deleteImage = document.createElement('div');
						deleteImage.classList.add('game-image_remove')
						imageBlock.current.append(deleteImage);
						
						deleteImage.addEventListener('click', async e => {
								await changeImage();
								e.target.remove();
								removedImg(true);
						})
						
						callback({
								img: reader.result,
								array: croppedImage
						});
				});
				
				if (selectedFile) {
						reader.readAsDataURL(selectedFile);
				}
				
				event.target.value = '';
		}
		
		const showImage = e => {
				showImg(true)
		}
		
		useEffect(() => {
				inputImg.current.addEventListener('change', handleFileSelect);
				changeImage();
		}, []);
		
		useEffect(() => {}, [showImg]);
		
		return (
				<div className="game-image" data-status="default" ref={imageBlock}>
						<input type="file" ref={inputImg} id="game-image-input" accept="image/*"/>
						<label className={`game-image_label`} htmlFor="game-image-input"/>
						
						<div className="game-image_thumbnail" onClick={showImage}>
								<img ref={tagImg} alt="puzzle thumbnail"/>
						</div>
				</div>
		
		);
};

export default ChoiceImage;