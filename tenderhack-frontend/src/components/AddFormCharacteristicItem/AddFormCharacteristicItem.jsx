import React, { useState } from 'react';
import './AddFormCharacteristicItem.css'; // Импортируйте ваш CSS файл

import trashIcon from '../../assets/deleteImage.svg';

function AddFormCharacteristicItem({ addCharacteristic }) {
  // Состояния для значений ввода
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState('');

  // Функция для обработки изменений в полях ввода
  const handleChange = (e, field) => {
    const inputValue = e.target.value;
    switch (field) {
      case 'title':
        setTitle(inputValue);
        break;
      case 'value':
        setValue(inputValue);
        break;
      case 'unit':
        setUnit(inputValue);
        break;
      default:
        break;
    }
  };

  // Функция для обработки нажатия на кнопку "Добавить"
  const handleAdd = () => {
    const newCharacteristic = {
      title: title,
      value: value,
      unit: unit
    };
    addCharacteristic(newCharacteristic);
    // Очистка полей ввода
    setTitle('');
    setValue('');
    setUnit('');
  };

  // Функция для обработки нажатия на иконку удаления
  const handleDelete = () => {
    // Реализуйте вашу логику удаления здесь
    console.log('Characteristic deleted');
  };

  return (
    <div className="addCharacteristicItem">
        <div className="addCharacteristicItem__title">
                <input
                    type="text"
                    className="addCharacteristicItem__input"
                    placeholder="Title"
                    value={title}
                    style={{ width: "264px" }}
                    onChange={(e) => handleChange(e, 'title')}
                />
            </div>
            <div>
                <div className="addCharacteristicItem__value">
                    <input
                        type="text"
                        className="addCharacteristicItem__input"
                        placeholder="Value"
                        value={value}
                        style={{ width: "100px" }}
                        onChange={(e) => handleChange(e, 'value')}
                    />
                <div className="addCharacteristicItem-unit">
                    <input
                        type="text"
                        className="addCharacteristicItem__input"
                        placeholder="Unit"
                        value={unit}
                        style={{ width: "100px" }}
                        onChange={(e) => handleChange(e, 'unit')}
                        />
                </div>
            </div>
        </div>
        <div className='addCharacteristicItem_btn'>
            <button type="button" className="addCharacteristicItem__submit" onClick={handleAdd}>Добавить</button>
            <div className="addCharacteristicItem__delete">
                {/* Замените на вашу иконку корзины */}
                <img src={trashIcon} alt="trashIcon" onClick={handleDelete}/>
            </div>
        </div>
    </div>
  );
}

export default AddFormCharacteristicItem;
