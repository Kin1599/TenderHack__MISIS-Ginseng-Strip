import React from 'react'

function CategoryChoice({title}) {
  return (
    <div>
        <div className='categoryChoice-title'>{title}</div>
        <div className='categoryChoice__items'>
            <BtnCategory></BtnCategory>
        </div>
    </div>
  )
}

export default CategoryChoice