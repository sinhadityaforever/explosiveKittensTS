import React, { useEffect } from 'react';
import { useState } from 'react';
import frontImage from '../../assets/front-pattern.avif';
import catCardImage from '../../assets/0.jpg';
import kittenCardImage from '../../assets/1.jpg';
import shuffleCardImage from '../../assets/2.jpg';
import diffuseCardImage from '../../assets/3.jpg';
import backImageImage from '../../assets/back-image.jpg';
import './Card.css';
import { cardData } from './cardData';
//import { resetCardsAction } from '../../features/gameState/gameStateSlice';
import {
	catCard,
	gameWon,
	updateDeck
} from '../../features/gameState/gameStateSlice';
import { kittenCard } from '../../features/gameState/gameStateSlice';
import { shuffleCard } from '../../features/gameState/gameStateSlice';
import { diffuseCard } from '../../features/gameState/gameStateSlice';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

interface IProps {
	id: number;
}

function Card(props: IProps) {
	const [isFlipped, setIsFlipped] = useState(false);
	var resetCards = useAppSelector((state) => state.gameState.resetCards);
	var defusesLeft = useAppSelector((state) => state.gameState.diffuses);
	const dispatch = useAppDispatch();
	useEffect(() => {
		return () => {
			setIsFlipped(false);
		};
	}, [resetCards]);

	let imageSrc;

	switch (props.id) {
		case 0:
			imageSrc = catCardImage;
			break;
		case 1:
			imageSrc = kittenCardImage;
			break;
		case 2:
			imageSrc = shuffleCardImage;
			break;
		case 3:
			imageSrc = diffuseCardImage;
			break;
		default:
			imageSrc = backImageImage;
	}

	//defining each card's function
	const catCardUtil = () => {
		dispatch(catCard());
	};
	const kittenCardUtil = (defuses: number) => {
		dispatch(kittenCard());
		setTimeout(() => {
			if (defuses === 0) {
				alert('You have lost the game!');
				dispatch(updateDeck());
			}
		}, 500);
	};

	const diffuseCardUtil = () => {
		dispatch(diffuseCard());
	};
	const shuffleCardUtil = () => {
		dispatch(shuffleCard());
		setTimeout(() => {
			dispatch(updateDeck());
		}, 500);
	};
	const handleFlip = () => {
		if (!isFlipped) {
			setIsFlipped(true);
			if (props.id === 0) {
				catCardUtil();
			} else if (props.id === 3) {
				diffuseCardUtil();
			}

			setTimeout(() => {
				if (props.id === 1) {
					kittenCardUtil(defusesLeft);
				} else if (props.id === 2) {
					shuffleCardUtil();
				}
			}, 500);
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
