import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import theme from './theme';
import { ThemeProvider } from '@emotion/react';
import firebaseConfig from './firebaseConfig';
import { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import ClubSelector from './components/ClubSelector';
import axios from 'axios';



const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const BASE_URL = process.env.REACT_APP_API_URL;

function App () {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [jwt, setJwt] = useState('');

	useEffect(() => {
		getAuth().onAuthStateChanged(user => {
			if (user) {
				console.log('user logged in', user);
				if (jwt === '') {
					axios.post(`${BASE_URL}/auth/login`, {
						authtoken: user.accessToken,
					},
						{
							params: {
								apiKey: process.env.REACT_APP_API_KEY
							}
						}
					).then(res => {
						console.log('res', res);
						setJwt(res.data.jwt);
						setIsLoggedIn(true);
					}).catch(err => {
						console.log('err', err);
						setIsLoggedIn(false);
						// setJwt('');
					});
				}
			} else {
				console.log('user logged out');
				setIsLoggedIn(false);
				// setJwt('');
			}
		});
	}, []);

	return (
		<ThemeProvider theme={theme}>
			{isLoggedIn ? <ClubSelector jwt={jwt} /> : <Auth />}
		</ThemeProvider>
	);
}

export default App;
