import { Button, Col, Empty, Row } from 'antd'
import React, { useState } from 'react'
import './portfolio.scss'
import { Trading } from '../../assets'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { useSelector } from 'react-redux'

const Protfolio = () => {

  const [active, setActive] = useState("live")

  const eventHandler = (tab) => {
    setActive(tab)
  }

  const userDetails = useSelector(
    (state) => state?.gernalReducer?.completeUser
  );

  const navigate = useNavigate()

  const mobileResponsive = useMediaQuery({
    query: '(max-width: 900px)'
  })

  return (
    <div className='portfolio'>
      <Row className='portfolio-top' >
        <Col className='mobile-responsive' span={mobileResponsive ? 24 : 8}>
          <p className='heading'>{active == "close" ? "Total Payout" : "Current Value"}</p>
          <p className='value' >10</p>
        </Col>
        <Col className='mobile-responsive' span={mobileResponsive ? 24 : 8}>
          <p className='heading'>{active == "close" ? "Total investment" : "Open Orders Value"}</p>
          <p className='value' >10</p>
        </Col>
        <Col className='mobile-responsive' span={mobileResponsive ? 24 : 8}>
          <p className='heading'>Markets</p>
          <p className='value' >10</p>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {/* <div className='buttons'>
            <button onClick={() => eventHandler("live")} className={active == "live" ? "toggle toggle-active" : 'toggle'}>
              Live
            </button>
            <button onClick={() => eventHandler("close")} className={active == "close" ? "toggle toggle-active" : 'toggle'}>
              Closed
            </button>
          </div> */}
          <h2></h2>
        </Col>
      </Row>
      <Row className='ready-to-trade'>
        <Col span={mobileResponsive ? 24 : 16}>
          <div className='left-side'>
            <img src={Trading} />
            <p>You are ready to trade. Start Now!</p>
            <div className='trade-start' >
              <p>Discover various markets to trade</p>
              <Button onClick={() => navigate("/market")} type='primary' >Start Now</Button>
            </div>
          </div>
        </Col>
        <Col style={mobileResponsive ? { height: "auto" } : { height: "100%" }} span={mobileResponsive ? 24 : 8}>
          <div className='right-side'>
            <Empty />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Protfolio