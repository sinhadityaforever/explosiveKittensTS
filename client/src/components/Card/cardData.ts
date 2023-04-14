interface ICardData {
	id: number;
	title: string;
	desc: string;
}

export const cardData: ICardData[] = [
	{
		id: 0,
		title: 'Cat Card',
		desc: 'You can go to the next card!'
	},
	{
		id: 1,
		title: 'Explosive Kitten',
		desc: 'Boom! You lost the game'
	},
	{
		id: 2,
		title: 'Shuffle Card',
		desc: 'The deck will be shuffled'
	},
	{
		id: 3,
		title: 'Defuse Card',
		desc: 'You got +1  diffuse card'
	}
];
