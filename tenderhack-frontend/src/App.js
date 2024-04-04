import { useState } from 'react';

import './App.css';
import BtnGenerate from './UI/BtnGenerate/BtnGenerate';
import InputUI from './UI/InputUI/InputUI';

function App() {
  const [nameProduct, setNameProduct] = useState('');
  const [category, setCategory] = useState('');

  return (
    <div className="App">
        <h1 style={{textAlign: 'center'}}>Happy hacking!</h1>
        <div className="form" style={{display: "flex", justifyContent: "center", gap: "20px"}}>
          <InputUI width="757px" placeHolder="Введите наименование товара" setNameProduct={setNameProduct}/>
          <BtnGenerate colorText="#CD1F15" nameProduct={nameProduct} setCategory={setCategory}>Описание</BtnGenerate>
        </div> 
        <h3>{category}</h3>
    </div>
  );
}

export default App;
