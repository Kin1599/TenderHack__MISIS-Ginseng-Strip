import React from 'react'

import cl from './BtnChoice.module.css'

function BtnChoice({children, active, onClick}) {

    const rootClasses = [cl.btnChoice]
    if(active){
        rootClasses.push(cl.active);
    }

  return (
    <div className={rootClasses.join(' ')} onClick={onClick}>
        <a className={cl.btnChoice__title}>{children}</a>
    </div>
  )
}

export default BtnChoice