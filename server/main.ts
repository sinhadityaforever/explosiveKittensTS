import express from 'express';
import bodyParser from 'body-parser';
import redis from 'redis';
import { createClient } from 'redis';

const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

const app = express();
// const client = redis.createClient();

// client.on('connect', () => {
// 	console.log('Connected to Redis!');
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/user/', (req, res) => {
	res.status(200).json({
		message: 'Success'
	});
});

app.listen(3000, () => {
	console.log('Server started on port 3000!');
});
