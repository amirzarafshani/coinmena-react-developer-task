import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from './partials/LoginForm'
import { CustomizedLocationStateProps } from '../../interfaces'

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as CustomizedLocationStateProps; // Type Casting, then you can get the params passed via router
  const { from } = state;

  const onLoggedIn = () => {
    navigate(from, { replace: true })
  }

  return (
    <div className='w-full flex justify-center'>
      <div className='w-96 bg-white rounded-2xl shadow-xl overflow-hidden'>
        <LoginForm onLoggedIn={onLoggedIn} />
      </div>
    </div>
  )
}
export default Login