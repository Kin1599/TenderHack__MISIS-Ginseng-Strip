import React, { useState, useEffect } from 'react';
import './CharacteristicItemEdit.css';

function CharacteristicItemEdit({ characteristic, updateCharacteristic }) {
  const { title, value } = characteristic;
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="characteristicItemEdit">
      <div className="characteristicItemEdit__title">{title}</div>
      {isEditing ? (
        <div>
          <input
            type="text"
            className="characteristicItemEdit__value"
            autoFocus
          />
          <button className="characteristicItemEdit__saveButton">
            ✔
          </button>
        </div>
      ) : (
        <div className="characteristicItemEdit__value">{value}</div>
      )}
    </div>
  );
}

export default CharacteristicItemEdit;
