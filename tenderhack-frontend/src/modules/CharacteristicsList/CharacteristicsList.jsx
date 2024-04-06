import React, { useState } from 'react';
import './CharacteristicsList.css';
import CharacteristicItemEdit from '../../components/CharacteristicItemEdit/CharacteristicItemEdit';
import addIcon from '../../assets/addIcon.svg';
import BtnEdit from '../../UI/BtnEdit/BtnEdit';

function CharacteristicsList({ characteristics }) {
  const [characteristicList, setCharacteristicList] = useState(characteristics);

  function updateCharacteristic(updatedCharacteristic) {
    setCharacteristicList(prevList =>
      prevList.map(char =>
        char.title === updatedCharacteristic.title ? updatedCharacteristic : char
      )
    );
  }

  return (
    <div>
      <div className='characteristicList__title'>
        <h2 style={{ margin: "0" }} className='text-title'>Характеристики</h2>
        <BtnEdit width="142px">Изменить</BtnEdit>
      </div>

      <div className='characteristicList'>
        {characteristicList.map((characteristic, index) =>
          <CharacteristicItemEdit
            key={index}
            characteristic={characteristic}
            updateCharacteristic={updateCharacteristic}
          />
        )}
        <div className='characteristicList__add'>
          <img src={addIcon} alt="characteristicList__add" />
        </div>
      </div>
    </div>
  )
}

export default CharacteristicsList;
