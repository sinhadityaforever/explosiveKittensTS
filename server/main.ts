import express from 'express';
import bodyParser from 'body-parser';
import { Entity, Schema, Client, Repository } from 'redis-om';
import cors from 'cors';

//Redis-OM
class User extends Entity {}
let schema = new Schema(
	User,
	{
		username: { type: 'string' },
		secretKey: { type: 'string' },
		numberOfWins: { type: 'number', sortable: true }
	},
	{ dataStructure: 'JSON' }
);
let client = await new Client().open();

let userRepository = client.fetchRepository(schema);
await userRepository.createIndex();

//Express server
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

app.get('/test/', (req: any, res: any) => {
	res.status(200).json({
		message: 'Success'
	});
});

app.post('/user', async (req: any, res: any) => {
	const { username, secretKey } = req.body;
	try {
		const existingUser = await userRepository
			.search()
			.where('username')
			.is.equalTo(username)
			.return.first();
		if (existingUser) {
			//@ts-ignore
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

app.post('/user/:id', async (req: any, res: any) => {
	const id = req.params.id;
	try {
		let user = await userRepository.fetch(id);
		if (!user) {
			res.status(400).json({
				message: 'No user exist'
			});
		} else {
			//@ts-ignore
			const wins = user.numberOfWins;
			//@ts-ignore
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

app.get('/user', async (req: any, res: any) => {
	try {
		const users = await userRepository
			.search()
			// .sortBy('numberOfWins')
			.sortDescending('numberOfWins')
			.return.all();
		//@ts-ignore
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

app.listen(3001, () => {
	console.log('Server started on port 3001!');
});

export {};
