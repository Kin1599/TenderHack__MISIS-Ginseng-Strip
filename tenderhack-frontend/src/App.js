import { useState } from 'react';

import './App.css';
import NavBar from './modules/NavBar/NavBar';
import { AuthContext } from './context';
import MainPage from './pages/MainPage/MainPage';

function App() {
  const [userName, setUserName] = useState('Иванова Татьяна Викторовна');

  return (
    <AuthContext.Provider value={{
      userName,
      setUserName
    }}>
      <NavBar userName={userName}/>
      <div className='App'>
        <MainPage/>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
