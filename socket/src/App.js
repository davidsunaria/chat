import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { Chat } from './Pages/Chat'
import { StoreProvider, useStoreRehydrated } from 'easy-peasy';
import { store } from './store';
import { Notifications } from 'react-push-notification';
import { MainPage } from './Pages/MainPage';


function App() {
  function WaitForStateRehydration({ children }) {
    const isRehydrated = useStoreRehydrated();
    return isRehydrated ? children : null;
  }
  return (
    <div className="App">
      <StoreProvider store={store}>
        <WaitForStateRehydration>
          {window.location.href === "http://localhost:3000/" ? <Notifications /> : null}
             <MainPage/>
        </WaitForStateRehydration>
      </StoreProvider>
    </div>
  );
}

export default App;
