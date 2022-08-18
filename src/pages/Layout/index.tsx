import React from 'react'
import Header from './partials/Header'
import './style.scss'
import { LayoutProps } from '../../interfaces'

export default function Layout(props: LayoutProps) {
  return (
    <React.Fragment>
      <Header />
      <div className='main'>
        {props.children}
      </div>
    </React.Fragment>
  )
}
