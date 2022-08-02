import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../store';
import ErrorSystem from '../components/ErrorSystem';

function MyApp({ Component, pageProps }) {
  
  return (
    <Provider store={store}>
      <ErrorSystem/>
      <Component {...pageProps}/>
    </Provider>
  );
}

export default MyApp
