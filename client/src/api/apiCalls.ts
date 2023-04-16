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
		return response.data;
	} catch (error: any) {
		console.log(error.message);
	}
};

export const scoreUpdater = async (id: string) => {
	try {
	} catch (error) {}
};
