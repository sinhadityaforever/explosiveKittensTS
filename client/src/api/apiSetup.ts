import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
	baseURL: 'http://localhost:3001/user',
	headers: {
		'Content-Type': 'application/json'
	}
});

export default instance;
