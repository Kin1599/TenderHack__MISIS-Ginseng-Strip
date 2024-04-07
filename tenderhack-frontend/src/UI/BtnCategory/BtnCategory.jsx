import React from 'react'

import cl from './BtnCategory.module.css'

function BtnCategory({children, active, onClick}) {

    const rootClasses = [cl.btnCategory]
    if(active){
        rootClasses.push(cl.active);
    }

  return (
    <a onClick={onClick} className={rootClasses.join(' ')}>{children}</a>
  )
}

export default BtnCategory