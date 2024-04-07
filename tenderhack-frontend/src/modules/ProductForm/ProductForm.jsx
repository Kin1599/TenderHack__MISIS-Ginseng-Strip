import React from 'react'

import GeneralInformation from '../../components/GeneralInformation/GeneralInformation';


function ProductForm({uploaded, item, setFields}) {
  return (
    <div className='general'>
        <GeneralInformation uploaded={uploaded} item={item} setFields={setFields}/>
    </div>
  )
}

export default ProductForm