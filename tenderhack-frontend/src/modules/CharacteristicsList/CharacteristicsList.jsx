import React, { useState, useEffect } from 'react';
import './CharacteristicsList.css';
import CharacteristicItemEdit from '../../components/CharacteristicItemEdit/CharacteristicItemEdit';
import addIcon from '../../assets/addIcon.svg';
import BtnEdit from '../../UI/BtnEdit/BtnEdit';
import AddFormCharacteristicItem from '../../components/AddFormCharacteristicItem/AddFormCharacteristicItem';

function CharacteristicsList({ characteristics, onUpdateCharacteristics }) {
  const [characteristicList, setCharacteristicList] = useState([]);

  useEffect(() => {
    setCharacteristicList(characteristics);
  }, [characteristics]);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  function editing() {
    setIsEditing(true);
  }

  function saving() {
    setIsSaving(true);
    setIsEditing(false);
  }

  const addCharacteristic = (newCharacteristic) => {
    setCharacteristicList(prevCharacteristics => [...prevCharacteristics, newCharacteristic]);
    setShowAddForm(false);
  };

  const deleteCharacteristic = (id) => {
    setCharacteristicList(prevCharacteristics => prevCharacteristics.filter(char => char.id !== id));
  };

  const updateCharacteristic = (id, updatedCharacteristic) => {
    setCharacteristicList(prevList => prevList.map(char => (char.id === id ? updatedCharacteristic : char)));
  };

  return (
    <div>
      <div className='characteristicList__title'>
        <h2 style={{ margin: "0" }} className='text-title'>Характеристики</h2>
        {isEditing
          ? <BtnEdit width="142px" onClick={saving}>OK</BtnEdit>
          : <BtnEdit width="142px" onClick={editing}>Изменить</BtnEdit>
        }
      </div>

      <div className='characteristicList'>
        {characteristicList.length > 0 ? (
          characteristicList.map((characteristic) => (
            <CharacteristicItemEdit
              key={characteristic.id} // Используем уникальный id в качестве ключа
              characteristic={characteristic}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              updateCharacteristic={updateCharacteristic}
              deleteCharacteristic={deleteCharacteristic} // Передача функции удаления
              isSaving={isSaving}
            />
          ))
        ) : (
          <div>Список характеристик пуст</div>
        )}

        {isEditing && !showAddForm && (
          <div className='characteristicList__add'>
            <img src={addIcon} alt="characteristicList__add" onClick={() => setShowAddForm(true)} />
          </div>
        )}

        {showAddForm && (
          <AddFormCharacteristicItem addCharacteristic={addCharacteristic} />
        )}

      </div>
    </div>
  );
}

export default CharacteristicsList;
