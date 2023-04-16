import { useAppDispatch } from '../app/hooks';
import api from './apiSetup';
// const fetchData = async () => {
//   try {
//     const response = await api.get('/users');
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// };

export const loginHandler = async (username: string, secretKey: string) => {
	try {
		const response = await api.post('/', {
			username,
			secretKey
		});
		console.log(response.data);
		return response.data;
	} catch (error: any) {
		console.log(error.message);
	}
};

export const scoreUpdater = async (id: string) => {
	console.log('Id To Update:', id);

	try {
		const response = await api.post(`/${id}`);
		console.log(response.data);
	} catch (error: any) {
		console.log(error);
	}
};

export const fetchLeaderBoard = async () => {
	try {
		const response = await api.get(`/`);
		return response.data;
	} catch (error: any) {
		console.log(error.message);
	}
};
