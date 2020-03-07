import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://bellstand-app.firebaseio.com/',
});

export default instance;

//	https://cors-anywhere.herokuapp.com/