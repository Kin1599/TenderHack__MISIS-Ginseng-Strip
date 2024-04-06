import React from 'react'

import GeneralInformation from '../../components/GeneralInformation/GeneralInformation';


function ProductForm({uploaded}) {
  return (
    <div className='general'>
        <GeneralInformation uploaded={uploaded}/>
    </div>
  )
}

export default ProductForm