import React from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './components/Card/Card';

function App() {
	var numbers = [];
	for (var i = 0; i < 5; i++) {
		numbers.push(Math.floor(Math.random() * 4));
	}
	return (
		<div className="container">
			<Card id={numbers[0]} />
			<Card id={numbers[1]} />
			<Card id={numbers[2]} />
			<Card id={numbers[3]} />
			<Card id={numbers[4]} />
		</div>
	);
}

export default App;
