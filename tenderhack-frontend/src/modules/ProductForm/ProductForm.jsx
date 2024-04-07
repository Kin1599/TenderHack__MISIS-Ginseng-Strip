import React from 'react'

import GeneralInformation from '../../components/GeneralInformation/GeneralInformation';


function ProductForm({uploaded, item, setFields, activeCategory, activeModel}) {
  return (
    <div className='general'>
        <GeneralInformation 
        uploaded={uploaded} 
        item={item} 
        setFields={setFields} 
        activeCategory={activeCategory} 
        activeModel={activeModel}/>
    </div>
  )
}

export default ProductForm