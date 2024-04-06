import React from 'react'
import cl from './ModalProduct.module.css'

function ModalProduct({children, visible, setVisible}) {

  const rootClasses = [cl.modalProduct]
  if(visible){
    rootClasses.push(cl.active);
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className={cl.modalProduct} onClick={(e => e.stopPropagation())}>
        {children}
      </div>
    </div>
  )
}

export default ModalProduct