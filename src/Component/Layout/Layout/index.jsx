import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import './layout.scss'
import { useMediaQuery } from 'react-responsive'
import MobileHeader from '../Header/mobileHeader'

const Layout = ({ children }) => {


    const mobileResponsive = useMediaQuery({
        query: '(max-width: 900px)'
    })


    return (
        <div>
            < Header />

            <div className='layout'>
                <div className='layout-box'>
                    {children}
                </div>
            </div>
            {mobileResponsive &&
                < MobileHeader />
            }
            {/* <Footer /> */}
        </div>
    )
}

export default Layout