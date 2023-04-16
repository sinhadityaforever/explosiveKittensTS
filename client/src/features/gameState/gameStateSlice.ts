import { createSlice, EntityId, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
	isLoggedIn: boolean;
	entityId: string;
	diffuses: number;
	cardsLeft: number;
	deck: number[];
	resetCards: boolean;
	numberOfWins: number;
}

interface LoginInput {
	numberOfWins: number;
	entityId: string;
}

const initialState: GameState = {
	isLoggedIn: false,
	entityId: '',
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
		//1. Login
		userLogin(state, action: PayloadAction<LoginInput>) {
			state.isLoggedIn = true;
			state.numberOfWins = action.payload.numberOfWins;

			state.entityId = action.payload.entityId;
		},
		//2 Logout
		logout(state) {
			state.isLoggedIn = false;
		},

		//3. Cat Card Selected
		catCard(state) {
			state.cardsLeft--;
			console.log(state.cardsLeft);
		},

		//4. Diffuse Card Selected
		diffuseCard(state) {
			state.diffuses++;
			state.cardsLeft--;
			console.log(state.cardsLeft);
		},

		//5. KittenCard Selected (shuffling the deck separately)
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

		//6. ShuffleCard Selected (This only updates values, deck is shuffled separately)
		shuffleCard(state) {
			state.cardsLeft = 5;
			state.resetCards = !state.resetCards;
			state.diffuses = 0;
		},

		//7. If the game is won
		gameWon(state) {
			state.numberOfWins++;
			state.resetCards = !state.resetCards;
			state.diffuses = 0;
			state.cardsLeft = 5;
		},

		//8. Update Deck
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
	userLogin,
	logout,
	catCard,
	diffuseCard,
	shuffleCard,
	kittenCard,
	gameWon,
	updateDeck
} = gameStateSlice.actions;
export default gameStateSlice.reducer;
