import React, {useEffect} from 'react'
import cl from './ModalProduct.module.css'

function ModalProduct({children, visible, setVisible}) {

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto'; // Восстановить прокрутку при размонтировании компонента
    };
  }, [visible]);


  const rootClasses = [cl.modalProduct]
  if(visible){
    rootClasses.push(cl.active);
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className={cl.modalProductContent} onClick={(e => e.stopPropagation())}>
        {children}
      </div>
    </div>
  )
}

export default ModalProduct