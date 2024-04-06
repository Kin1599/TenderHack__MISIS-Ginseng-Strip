import React, { useState, useEffect } from 'react';
import './CharacteristicsList.css';
import CharacteristicItemEdit from '../../components/CharacteristicItemEdit/CharacteristicItemEdit';
import addIcon from '../../assets/addIcon.svg';
import BtnEdit from '../../UI/BtnEdit/BtnEdit';

function CharacteristicsList({ characteristics, onUpdateCharacteristics }) {
  const [characteristicList, setCharacteristicList] = useState(characteristics);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Вызов функции обновления, переданной из родительского компонента
    onUpdateCharacteristics(characteristicList);
  }, [characteristicList, onUpdateCharacteristics]);

  function editing(){
    setIsEditing(true);
  }

  function saving(){
    setIsSaving(true);
    setIsEditing(false);
  }

  // Функция обновления характеристики
  function updateCharacteristic(id, updatedCharacteristic) {
    setCharacteristicList(prevList =>
      prevList.map(char =>
        char.id === id ? updatedCharacteristic : char
      )
    );
  }

  // Функция удаления характеристики
  const deleteCharacteristic = (id) => {
    setCharacteristicList(prevCharacteristics => (
      prevCharacteristics.filter(characteristic => characteristic.id !== id)
    ));
  };

  return (
    <div>
      <div className='characteristicList__title'>
        <h2 style={{ margin: "0" }} className='text-title'>Характеристики</h2>
        {isEditing
          ? <BtnEdit width="142px" onClick={saving}>Ок</BtnEdit>
          : <BtnEdit width="142px" onClick={editing}>Изменить</BtnEdit>
        }
      </div>  

      <div className='characteristicList'>
        {characteristicList.map((characteristic, index) =>
          <CharacteristicItemEdit
            key={index}
            characteristic={characteristic}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            updateCharacteristic={updateCharacteristic}
            deleteCharacteristic={deleteCharacteristic} // Передача функции удаления
            isSaving={isSaving}
          />
        )}

        {isEditing && (
          <div className='characteristicList__add'>
            <img src={addIcon} alt="characteristicList__add" />
          </div>
        )}
        
      </div>
    </div>
  )
}

export default CharacteristicsList;
