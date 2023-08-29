import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import './layout.scss'

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            <div className='layout'>
                <div className='layout-box'>
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Layout