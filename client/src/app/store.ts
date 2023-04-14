import { configureStore } from '@reduxjs/toolkit';
import gameStateReducer from '../features/gameState/gameStateSlice';

export const store = configureStore({
	reducer: {
		gameState: gameStateReducer
	}
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
