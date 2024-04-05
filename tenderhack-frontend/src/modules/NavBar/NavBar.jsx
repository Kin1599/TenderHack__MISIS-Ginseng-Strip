import React from 'react'

// IMPORT ICONS
import logo from '../../assets/logo.svg'
import support from '../../assets/support.svg'
import profile from '../../assets/profile.svg'

// IMPORT STYLES
import './style/NavBar.css'

function NavBar({userName}) {
  return (
    <div className='navBar-wrapper'>
        <div className='navBar'>
          <div className='navBar-left'>
            <img src={logo} alt="logo" className='navBar__logo'/>
            <div className='navBar__support'>
              <img src={support} alt='support_icon' className='navBar-support__icon'/>
              <p className='navBar-support__text'>Оставить сообщение</p>
            </div>
          </div>
          <div className='navBar__profile'>
            <p>{userName}</p>
            <div className='navBar-profile__icon'>
              <img src={profile} alt="profile_icon" className='navBar-profile__icon'/>
            </div>
          </div>
        </div>
    </div>
  )
}

export default NavBar