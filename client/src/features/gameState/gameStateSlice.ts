import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
	diffuses: number;
	cardsLeft: number;
	deck: number[];
	resetCards: boolean;
	numberOfWins: number;
}

// var numbers = [];
// const pushCards = () => {
// 	for (var i = 0; i < 4; i++) {
// 		numbers.push(Math.floor(Math.random() * 4));
// 	}
// };

const initialState: GameState = {
	diffuses: 0,
	cardsLeft: 5,
	deck: [
		Math.floor(Math.random() * 4),
		Math.floor(Math.random() * 4),
		Math.floor(Math.random() * 4),
		Math.floor(Math.random() * 4),
		Math.floor(Math.random() * 4)
	],
	resetCards: false,
	numberOfWins: 0
};

const gameStateSlice = createSlice({
	name: 'gameState',
	initialState,
	reducers: {
		//1. Cat Card Selected
		catCard(state) {
			state.cardsLeft--;
			console.log(state.cardsLeft);
		},

		//2. Diffuse Card Selected
		diffuseCard(state) {
			state.diffuses++;
			state.cardsLeft--;
			console.log(state.cardsLeft);
		},

		//3. KittenCard Selected (shuffling the deck separately)
		kittenCard(state) {
			if (state.diffuses !== 0) {
				state.diffuses--;
				state.cardsLeft--;
				console.log(state.cardsLeft);
			} else {
				state.resetCards = !state.resetCards;
				state.cardsLeft = 5;
			}
		},

		//4. ShuffleCard Selected (This only updates values, deck is shuffled separately)
		shuffleCard(state) {
			state.cardsLeft = 5;
			state.resetCards = !state.resetCards;
			state.diffuses = 0;
		},

		//5. If the game is won
		gameWon(state) {
			state.numberOfWins++;
			state.resetCards = !state.resetCards;
			state.diffuses = 0;
			state.cardsLeft = 5;
		},

		//6. Update Deck
		updateDeck(state) {
			state.deck = [
				Math.floor(Math.random() * 4),
				Math.floor(Math.random() * 4),
				Math.floor(Math.random() * 4),
				Math.floor(Math.random() * 4),
				Math.floor(Math.random() * 4)
			];
		}
	}
});

export const {
	catCard,
	diffuseCard,
	shuffleCard,
	kittenCard,
	gameWon,
	updateDeck
} = gameStateSlice.actions;
export default gameStateSlice.reducer;
