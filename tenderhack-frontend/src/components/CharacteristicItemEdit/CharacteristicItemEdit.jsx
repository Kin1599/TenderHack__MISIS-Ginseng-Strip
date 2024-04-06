import React, { useState, useEffect } from 'react';
import './CharacteristicItemEdit.css';

import trashIcon from "../../assets/deleteImage.svg"

function CharacteristicItemEdit({ characteristic, isEditing, updateCharacteristic, deleteCharacteristic, isSaving}) {
  const { id, title, value, unit } = characteristic;
  const [editedValue, setEditedValue] = useState(value)

  // Обработчик изменения значения
  const handleChange = (e) => {
    setEditedValue(e.target.value);
  };

  // Обработчик удаления характеристики
  const handleDelete = () => {
    deleteCharacteristic(id);
  };

  // Обработчик сохранения изменений
  useEffect(() => {
    if (isSaving) {
      updateCharacteristic(id, { id, title, value: editedValue, unit });
    }
  }, [isSaving, editedValue, id, title, unit, updateCharacteristic]);

  return (
    <div className="characteristicItemEdit">
      <div className="characteristicItemEdit__title">{title}</div>
      {isEditing ? (
        <div className="characteristicItemEdit__value">
          <input
            type="text"
            className="characteristicItemEdit__value"
            autoFocus
            value={editedValue}
            onChange={handleChange}
          />
          <div className='characteristicItemEdit-unit'>{unit}</div>
        </div>
      ) : (
        <div className="characteristicItemEdit__value">
          <div className='characteristicItemEdit-value'>{value}</div>
          <div className='characteristicItemEdit-unit'>{unit}</div>
        </div>
      )}
      <div className='characteristicItemEdit__delete' onClick={handleDelete}>
        <img src={trashIcon} alt="trashIcon" />
      </div>
    </div>
  );
}

export default CharacteristicItemEdit;
