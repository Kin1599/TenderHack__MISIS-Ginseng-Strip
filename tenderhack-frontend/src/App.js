import { useState } from 'react';

import './App.css';
import NavBar from './modules/NavBar/NavBar';
import { AuthContext } from './context';
import MainPage from './pages/MainPage/MainPage';
import Footer from './modules/Footer/Footer';

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
      <Footer/>
    </AuthContext.Provider>
  );
}

export default App;
