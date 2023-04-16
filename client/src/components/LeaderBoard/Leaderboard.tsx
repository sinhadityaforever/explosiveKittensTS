import React, { useEffect, useState } from 'react';
import { fetchLeaderBoard } from '../../api/apiCalls';
import './Leaderboard.css';

function Leaderboard() {
	const [leaderBoardData, setLeaderBoardData] = useState([{}]);
	const leaderBoardHelper = async () => {
		const leaderBoard = await fetchLeaderBoard();
		setLeaderBoardData(leaderBoard);
	};
	useEffect(() => {
		leaderBoardHelper();
	}, []);

	return (
		<div className="leaderboard-container">
			<h2>Leaderboard</h2>
			<ul className="leaderboard-list">
				{leaderBoardData.map((score: any) => (
					<li key={score.username != null ? score.username : 'No Username'}>
						{score.username}: {score.numberOfWins}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Leaderboard;
