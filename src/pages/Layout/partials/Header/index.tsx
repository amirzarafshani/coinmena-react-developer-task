import React from 'react'
import { NavLink } from 'react-router-dom'
import LoginModal from '../../../Login/partials/LoginModal'
import useStore from '../../../../store'
import './style.scss'

export default function Header() {
  const [isOpenLoginModal, setIsOpenLoginModal] = React.useState(false)
  const user = useStore(state => state.user)
  const logout = useStore(state => state.logout)

  function closeModal() {
    setIsOpenLoginModal(false);
  }

  function handleLogout() {
    logout();
  }

  function openModal() {
    setIsOpenLoginModal(true);
  }

  return (
    <header>
      <nav className='navigation'>
        <NavLink to="/" className="nav-item">Home</NavLink>
        <NavLink to="/trade" className="nav-item">Trade</NavLink>
      </nav>
      <div>
        {user?.isLoggedIn ? (
          <div className="flex gap-4 items-center">
            <span>{user.email}</span>
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-opacity-50 duration-300 shadow-xl"
            >
              Logout
            </button>
          </div>

        ) : (
          <button
            type="button"
            onClick={openModal}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-opacity-50 duration-300 shadow-xl"
          >
            Login
          </button>
        )}
      </div>
      <LoginModal isOpen={isOpenLoginModal} closeModal={closeModal} />
    </header>
  )
}

