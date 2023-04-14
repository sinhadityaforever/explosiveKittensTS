import React from 'react';
import { useAppSelector } from '../../app/hooks';
import Card from '../Card/Card';
import './GameContainer.css';

function GameContainer() {
	var cards = useAppSelector((state) => state.gameState.deck);
	var diffuses = useAppSelector((state) => state.gameState.diffuses);

	return (
		<div>
			<div className="game-container">
				<Card id={cards[0]} />
				<Card id={cards[1]} />
				<Card id={cards[2]} />
				<Card id={cards[3]} />
				<Card id={cards[4]} />
			</div>
			<div>Diffuses={diffuses}</div>
		</div>
	);
}

export default GameContainer;
