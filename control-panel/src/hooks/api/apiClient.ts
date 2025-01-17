import axios from 'axios';
import { EcobazarShoperyToken } from '../../helpers/Token';

const apiClient = axios.create({
	baseURL: 'http://localhost:8000/api',
	headers: {
		'x-auth-token': EcobazarShoperyToken('get'),
	},
});

export default apiClient;
