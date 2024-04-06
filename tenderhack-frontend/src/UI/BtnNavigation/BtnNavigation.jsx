import React from 'react'
import cl from './BtnNavigation.module.css'

function BtnNavigation({children, active, onClick, href}) {
    const rootClasses = [cl.btnNavigation]

    if(active){
        rootClasses.push(cl.active)
    }

  return (
    <a href={href} className={rootClasses.join(' ')} onClick={onClick}>{children}</a>
  )
}

export default BtnNavigation