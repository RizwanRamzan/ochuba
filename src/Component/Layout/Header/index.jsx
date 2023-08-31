import React from 'react'
import './header.scss'
import { Col, Divider, Dropdown, Row } from 'antd'
import { Commiunty, Logo, Profile, Ranking } from '../../../assets'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const mobileResponsive = useMediaQuery({
        query: '(max-width: 900px)'
    })

    const navigate = useNavigate()

    const windowLoaction = window.location.pathname

    const items = [
        {
            key: '1',
            label: (
            <a onClick={()=>navigate("/profile")}>
              Profile
            </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer">
                    Join TeleGram
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer">
                    Logout
                </a>
            ),
        },
    ];


    return (
        <div className='header'>
            <div className='header-box'>
                <Row >
                    <Col span={mobileResponsive ? 24 : 12} className='image-box'>
                        <img onClick={() => navigate("/market")} style={{ cursor: "pointer" }} src={Logo} />
                    </Col>
                    <Col span={mobileResponsive ? 24 : 12}>
                        <div className='header-tab-box'>
                            <div onClick={() => navigate("/market")} className={windowLoaction.includes("/market") ? 'header-tab active-text' : "header-tab"}>
                                <img src={Ranking} />
                                <p className='text'>Markets</p>
                            </div>
                            <div onClick={() => navigate("/portfolio")} className={windowLoaction.includes("/portfolio") ? 'header-tab active-text' : "header-tab"}>
                                <p className='text' style={{ fontSize: "20px", color: "#0093DD" }}>0</p>
                                <p className='text'>Portfolio</p>
                            </div>
                            <div onClick={() => navigate("/wallet")} className={windowLoaction.includes("/wallet") ? 'header-tab active-text' : "header-tab"}>
                                <p className='text' style={{ fontSize: "20px", color: "#0093DD" }}>0</p>
                                <p className='text'>Wallet</p>
                            </div>
                            {/* <div className='header-tab'>
                                <img src={Commiunty} />
                                <p className='text'>Markets</p>
                            </div> */}
                            <Dropdown
                                menu={{ items }}
                                placement='bottomLeft'
                                trigger={['click']}
                            >
                                <div  className={windowLoaction.includes("/profile") ? 'header-tab active-text' : "header-tab"}>
                                    <img src={Profile} />
                                    <p className='text'>Profile</p>
                                </div>
                            </Dropdown>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Header