import React, { useEffect, useRef, useState } from 'react';

const ChoiceImage = ( {callback} ) => {
		let inputImg = useRef();
		let tagImg = useRef(null);
		let titleImg = useRef();
		let labelImage = useRef();
		let croppedImage = [];
		
		const [pageURL, setPageURL] = useState('');
		useEffect(() => {
				setPageURL(window.location.origin);
		});
		
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
				labelImage.current.classList.add('loading');
				const selectedFile = event.target.files[0];
				const reader = new FileReader();
				let sections = document.querySelectorAll('.grid-section');
				
				reader.addEventListener('load', async () => {
						await createImage(reader.result, sections.length);
						tagImg.current.src = reader.result;
						titleImg.current.innerHTML = `
							<li><span>Type: </span> ${selectedFile.type}</li>
							<li><span>Size: </span> ${(selectedFile.size / 1024).toFixed(0)} KB</li>
						`;
						
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
		
		useEffect(() => {
				inputImg.current.addEventListener('change', handleFileSelect);
		}, []);
		
		return (
				<div className="game-image">
						<input type="file" ref={inputImg} id="game-image-input" accept="image/*"/>
						<label className={`game-image_label`} ref={labelImage} htmlFor="game-image-input">
								<img src={`${pageURL}/image/white-bg.jpg`} ref={tagImg} alt=""/>
						</label>
						<ul ref={titleImg}>
								<li><span>Upload an image to get started</span></li>
						</ul>
				</div>
		
		);
};

export default ChoiceImage;