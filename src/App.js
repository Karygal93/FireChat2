import './App.css';
import Chat from './Componets/Chat';
import Singin from './Componets/Singin';
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from './firebase.js';






function App() {
  const [user] = useAuthState(auth)
  return (
    <>
      {user ? <Chat /> : <Singin />}
    </>
  );
}

export default App;




