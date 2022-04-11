import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import theme from './theme';
import { ThemeProvider } from '@emotion/react';
import firebaseConfig from './firebaseConfig';
import { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";



const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App () {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getAuth().onAuthStateChanged(user => {
        if (user) {
            console.log('user logged in', user);
            setIsLoggedIn(true);
        } else {
            console.log('user logged out');
            setIsLoggedIn(false);
        }
    });
}, []);

  return (
    <ThemeProvider theme={theme}>
      {isLoggedIn ? <Dashboard /> : <Auth />}
    </ThemeProvider>
  );
}

export default App;
