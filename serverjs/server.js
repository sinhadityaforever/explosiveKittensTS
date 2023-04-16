import express from 'express';
import bodyParser from 'body-parser';
import { createClient } from 'redis';
import { Entity, Schema, Client, Repository } from 'redis-om';

//Redis-OM
class User extends Entity {}
let schema = new Schema(
	User,
	{
		username: { type: 'string' }, // the title of the song
		secretKey: { type: 'string' }, // who performed the song
		numberOfWins: { type: 'number' } // array of strings for the genres of the song
	},
	{ dataStructure: 'JSON' }
);
let client = await new Client().open();

let userRepository = client.fetchRepository(schema);
await userRepository.createIndex();

//Express server
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/test/', (req, res) => {
	res.status(200).json({
		message: 'Success'
	});
});

app.post('/user', async (req, res) => {
	const { username, secretKey } = req.body;
	try {
		const existingUser = await userRepository
			.search()
			.where('username')
			.is.equalTo(username)
			.return.first();
		console.log('code worked');
		if (existingUser) {
			if (existingUser.secretKey == secretKey) {
				res.status(201).json(existingUser);
			} else {
				res
					.status(401)
					.json({ message: 'Either user exists, or secretKey wrong' });
			}
		} else {
			const user = await userRepository.createAndSave({
				username,
				secretKey,
				numberOfWins: 0
			});
			res.status(200).json(user);
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({
			error
		});
	}
});

app.post('/user/:id', async (req, res) => {
	const id = req.params.id;
	try {
		let user = await userRepository.fetch(id);
		if (!user) {
			res.status(400).json({
				message: 'No user exist'
			});
		} else {
			const wins = user.numberOfWins;
			user.numberOfWins = wins + 1;
			await userRepository.save(user);
			res.status(200).json({
				message: 'Updated',
				user
			});
		}
	} catch (error) {
		console.log(error);
		res.status(200).json({
			message: 'Unknown error occurred'
		});
	}
});

app.get('/user', async (req, res) => {
	try {
		const users = await userRepository.search().return.all();
		const filteredUsers = users.map(({ username, numberOfWins }) => ({
			username,
			numberOfWins
		}));
		res.status(200).json(filteredUsers);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: 'Unknown error occurred' });
	}
});

app.listen(3000, () => {
	console.log('Server started on port 3000!');
});
