import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import theme from './theme';
import { ThemeProvider } from '@emotion/react';
import firebaseConfig from './firebaseConfig';

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Auth />
      {/* <Dashboard /> */}
    </ThemeProvider>
  );
}

export default App;
