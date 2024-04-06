import React from 'react'

import cl from './CharacteristicItem.css'

function CharacteristicItem({characteristic}) {
    const {title, value} = characteristic
  return (
    <div className="characteristicItem">
        <div className="characteristicItem__title">{title}</div>
        <div className="characteristicItem__value">{value}</div>
    </div>
  )
}

export default CharacteristicItem