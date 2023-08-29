import { Button, Col, Empty, Row } from 'antd'
import React, { useState } from 'react'
import './portfolio.scss'
import { Trading } from '../../assets'
import { useNavigate } from 'react-router-dom'

const Protfolio = () => {

  const [active, setActive] = useState("live")

  const eventHandler = (tab) => {
    setActive(tab)
  }

  const navigate = useNavigate()

  return (
    <div className='portfolio'>
      <Row className='portfolio-top' >
        <Col span={8}>
          <p className='heading'>{active == "close" ? "Total Payout" : "Current Value"}</p>
          <p className='value' >10</p>
        </Col>
        <Col span={8}>
          <p className='heading'>{active == "close" ? "Total investment" : "Open Orders Value"}</p>
          <p className='value' >10</p>
        </Col>
        <Col span={8}>
          <p className='heading'>Markets</p>
          <p className='value' >10</p>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className='buttons'>
            <button onClick={() => eventHandler("live")} className={active == "live" ? "toggle toggle-active" : 'toggle'}>
              Live
            </button>
            <button onClick={() => eventHandler("close")} className={active == "close" ? "toggle toggle-active" : 'toggle'}>
              Closed
            </button>
          </div>
        </Col>
      </Row>
      <Row className='ready-to-trade'>
        <Col span={16}>
          <div className='left-side'>
            <img src={Trading} />
            <p>You are ready to trade. Start Now!</p>
            <div className='trade-start' >
              <p>Discover various markets to trade</p>
              <Button onClick={() => navigate("/market")} type='primary' >Start Now</Button>
            </div>
          </div>
        </Col>
        <Col style={{ height: "100%" }} span={8}>
          <div className='right-side'>
            <Empty />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Protfolio