import React from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './components/Card/Card';
import { Provider } from 'react-redux';
import { store } from './app/store';
import GameContainer from './components/GameContainer/GameContainer';
function App() {
	return (
		<Provider store={store}>
			<GameContainer />
		</Provider>
	);
}

export default App;
