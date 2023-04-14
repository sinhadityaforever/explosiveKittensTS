import React from 'react';
import { useState } from 'react';
import frontImage from '../../assets/front-pattern.avif';
import catCard from '../../assets/0.jpg';
import kittenCard from '../../assets/1.jpg';
import shuffleCard from '../../assets/2.jpg';
import diffuseCard from '../../assets/3.jpg';
import backImage from '../../assets/back-image.jpg';
import './Card.css';
import { cardData } from './cardData';

interface IProps {
	id: number;
}

function Card(props: IProps) {
	const [isFlipped, setIsFlipped] = useState(false);
	let imageSrc;

	switch (props.id) {
		case 0:
			imageSrc = catCard;
			break;
		case 1:
			imageSrc = kittenCard;
			break;
		case 2:
			imageSrc = shuffleCard;
			break;
		case 3:
			imageSrc = diffuseCard;
			break;
		default:
			imageSrc = backImage;
	}

	const handleFlip = () => {
		if (!isFlipped) {
			setIsFlipped(true);
		}
	};
	return (
		<div
			className={`flip-card ${isFlipped ? 'flipped' : ''}`}
			onClick={handleFlip}
		>
			<div className="flip-card-inner">
				<div className="flip-card-front">
					<img src={frontImage} alt="Card" />
					<h3>Explosive Kittens</h3>
					<p>Select this card</p>
				</div>
				<div className="flip-card-back">
					<img src={imageSrc} alt="Card" />
					<h3>{cardData[props.id].title}</h3>
					<p>{cardData[props.id].desc}</p>
				</div>
			</div>
		</div>
	);
}

export default Card;
