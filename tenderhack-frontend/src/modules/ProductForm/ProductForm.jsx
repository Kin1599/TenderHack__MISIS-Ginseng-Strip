import React from 'react'

import GeneralInformation from '../../components/GeneralInformation/GeneralInformation';
import GeneralInformationWork from '../../components/GeneralInformationWork/GeneralInformationWork';


function ProductForm({uploaded, item, setFields, activeCategory, activeModel, activeManufacturer, type, setType}) {
  return (
    <div className='general'>
      {
        type === 'Товар'
        ? 
        <div>
          <GeneralInformation 
          uploaded={uploaded} 
          item={item} 
          setFields={setFields} 
          activeCategory={activeCategory} 
          activeModel={activeModel}
          activeManufacturer={activeManufacturer}
          setType={setType}/>
        </div>
        :
        <div>
          <GeneralInformationWork uploaded={uploaded} type={type}/>
        </div>
      }
        
    </div>
  )
}

export default ProductForm