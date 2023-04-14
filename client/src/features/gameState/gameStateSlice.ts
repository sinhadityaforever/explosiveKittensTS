import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
	diffuses: number;
	cardsLeft: number;
	deck: number[];
	resetCards: boolean;
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
	resetCards: false
};

const gameStateSlice = createSlice({
	name: 'gameState',
	initialState,
	reducers: {
		catCard(state) {
			state.cardsLeft--;
		},
		diffuseCard(state) {
			state.diffuses++;
			state.cardsLeft--;
		},

		kittenCard(state) {
			if (state.diffuses !== 0) {
				state.resetCards = !state.resetCards;

				state.diffuses--;
				state.cardsLeft--;
			} else {
				state.cardsLeft = 5;

				state.deck = [
					Math.floor(Math.random() * 4),
					Math.floor(Math.random() * 4),
					Math.floor(Math.random() * 4),
					Math.floor(Math.random() * 4),
					Math.floor(Math.random() * 4)
				];
			}
		},

		shuffleCard(state) {
			state.cardsLeft = 5;
			state.resetCards = !state.resetCards;
			state.diffuses = 0;

			state.deck = [
				Math.floor(Math.random() * 4),
				Math.floor(Math.random() * 4),
				Math.floor(Math.random() * 4),
				Math.floor(Math.random() * 4),
				Math.floor(Math.random() * 4)
			];
		}

		// resetCardsAction(state) {
		// 	console.log('Reset Pressed');
		// 	state.resetCards = !state.resetCards;
		// }
	}
});

export const { catCard, diffuseCard, shuffleCard, kittenCard } =
	gameStateSlice.actions;
export default gameStateSlice.reducer;
