import React from 'react'

import cl from './BtnCategory.module.css'

function BtnCategory({children, active}) {

    const rootClasses = [cl.btnCategory]
    if(active){
        rootClasses.push(cl.active);
    }

  return (
    <a className={rootClasses.join(' ')}>{children}</a>
  )
}

export default BtnCategory