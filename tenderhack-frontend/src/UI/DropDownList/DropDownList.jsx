import React, { useState } from 'react';
import cl from './DropDownList.module.css';

function DropDownList({ activeCategoryIndex, setActiveCategoryIndex, category, setCategory, important, title}) {
    const [newCategory, setNewCategory] = useState('');
    const [isAddingCategory, setIsAddingCategory] = useState(false);

    const handleCategoryChange = (event) => {
        setActiveCategoryIndex(event.target.value);
    };

    const handleNewCategoryChange = (event) => {
        setNewCategory(event.target.value);
    };

    const handleAddCategory = () => {
        setIsAddingCategory(true);
        console.log(isAddingCategory);
    };

    const handleConfirmAddCategory = () => {
        if (newCategory.trim() !== '') {
            // Создать новый массив категорий с добавлением новой категории
            const updatedCategory = [...category, newCategory];
            // Обновить список категорий
            setCategory(updatedCategory);
            // Установить новую категорию как активную
            setActiveCategoryIndex(updatedCategory.length - 1);
        }
        // Скрыть форму для добавления категории
        setIsAddingCategory(false);
        // Очистить значение поля для ввода новой категории
        setNewCategory('');
    };

    const rootClasses = [cl.dropDownList__title];

    if (important) {
        rootClasses.push('.important');
    }

    return (
        <div className={cl.dropDownList}>
            <label htmlFor="categorySelect" className={rootClasses.join(' ')}>{title}</label>
            <select className={cl.categorySelect} id="categorySelect" value={activeCategoryIndex} onChange={handleCategoryChange}>
                {Array.isArray(category) && category.map((cat, index) => (
                    <option key={index} value={index}>{cat}</option>
                ))}
                <option disabled>──────────</option>
                <option value="addCategory" onClick={handleAddCategory}>Добавить категорию</option>
            </select>
            {isAddingCategory && (
                <div>
                    <input type="text" value={newCategory} onChange={handleNewCategoryChange} />
                    <button onClick={handleConfirmAddCategory}>Добавить</button>
                </div>
            )}
        </div>
    );
}

export default DropDownList;
