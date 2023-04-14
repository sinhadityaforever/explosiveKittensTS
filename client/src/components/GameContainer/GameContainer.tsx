import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Card from '../Card/Card';
import { gameWon } from '../../features/gameState/gameStateSlice';
import './GameContainer.css';
import Header from '../Header/Header';

function GameContainer() {
	var cards = useAppSelector((state) => state.gameState.deck);
	var defuses = useAppSelector((state) => state.gameState.diffuses);
	var numberOfWins = useAppSelector((state) => state.gameState.numberOfWins);
	var cardsLeftInGame = useAppSelector((state) => state.gameState.cardsLeft);
	const dispatch = useAppDispatch();
	useEffect(() => {
		return () => {
			if (cardsLeftInGame === 1) {
				alert('You have won');
				dispatch(gameWon());
			}
		};
	}, [cardsLeftInGame, dispatch]);

	return (
		<div>
			<div>
				<Header />
			</div>
			<div className="middle-container">
				<div className="game-container">
					<Card id={cards[0]} />
					<Card id={cards[1]} />
					<Card id={cards[2]} />
					<Card id={cards[3]} />
					<Card id={cards[4]} />
				</div>
				<div className="defuses-container">
					<h1 className="defuses-title">
						Defuses Left: <span className="defuses-number">{defuses}</span>
					</h1>
				</div>

				<div className="game-win-count">
					<div className="game-win-count__header">
						<h2>Wins</h2>
					</div>
					<div className="game-win-count__count">
						<p>{numberOfWins}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default GameContainer;
