import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
	diffuses: number;
	cardsLeft: number;
	deck: number[];
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
	]
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
		}
	}
});

export const { catCard, diffuseCard } = gameStateSlice.actions;
export default gameStateSlice.reducer;
