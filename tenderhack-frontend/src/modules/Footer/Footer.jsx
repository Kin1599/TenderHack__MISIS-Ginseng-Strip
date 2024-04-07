import React from 'react'
import logoFooter from '../../assets/logo_footer.svg'
import logoFooter2 from '../../assets/logo_footer2.svg'
import logoFooter3 from '../../assets/logo_footer3.svg'
import './Footer.css'

function Footer() {
  return (
    <div className='footer'>
        <div className='footer__team'>MISIS Ginseng Strip</div>
        <div className='footer__icons'>
            <img src={logoFooter} alt="logoFooter" />
            <img src={logoFooter2} alt="logoFooter2" />
            <img src={logoFooter3} alt="logoFooter3" />
        </div>
    </div>
  )
}

export default Footer