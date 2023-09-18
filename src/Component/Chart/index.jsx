import { Col, Form, Input, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import RenderLineChart from '../lineChart'
import './chats.scss'
import { DefaultNumber } from '../../Pages/Wallet/constant'
import { useMediaQuery } from 'react-responsive'

const TradingScreen = () => {

    const [withdrawal, setWithdrawal] = useState("deposit");
    const [dollor, setDollor] = useState("")
    let [number, setNumber] = useState("")
    const [activeBtn, setActiveBtn] = useState("")
    const [active, setActive] = useState("yes")
    const [outcomeBtn, setOutcomeBtn] = useState("yes")
    const [doller, setDoller] = useState(0)

    const [form] = Form.useForm()

    useEffect(() => {
        form?.setFieldValue({
            amout: number
        })
    }, [number])

    const mobileResponsive = useMediaQuery({
        query: '(max-width: 900px)'
    })


    return (
        <>
            <Row style={mobileResponsive ? { marginTop: "20px" } : { marginTop: "50px" }} gutter={[20, 20]} className='wallet'>
                <Col span={24}><p style={{ fontWeight: "600", fontSize: "20px" }} >Jaipur Indians to win against Jodhpur Sunrisers?</p></Col>
                <Col span={24}>
                    <div className='trading-cart'>
                        <p className='right-text1'>Yes 35.76</p>
                        <p className='right-text2'>No 35.76</p>
                    </div>
                </Col>
                <Col span={24} className='trading-yeschart'>
                    <button onClick={() => setActive("yes")} className={active == "yes" ? 'yes activeButton' : "yes"}>Yes Chart</button>
                    <button onClick={() => setActive("about")} className={active == "about" ? 'about activeButton' : "about"}>About</button>
                </Col>
                <Col span={mobileResponsive ? 24 : 16}>
                    <RenderLineChart />
                </Col>

                <Col span={mobileResponsive ? 24 : 8}>
                    <div className='wallet-right-side'>
                        <p style={{fontSize:"16px",fontWeight:"700",borderBottom:"1px solid gray"}}>Buy</p>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <p>Outcome</p>
                            <div style={{ display: "flex", gap: 10 }}>
                                <button onClick={() => setOutcomeBtn("yes")} className={outcomeBtn == "yes" ? 'outcome-yes active-outcome-yes' : 'outcome-yes'}>Yes</button>
                                <button onClick={() => setOutcomeBtn("no")} className={outcomeBtn == "no" ? 'outcome-yes active-outcome-no' : 'outcome-yes'}>No</button>
                            </div>
                        </div>
                        <p className='credits' >Credits to be added (niagara currency)</p>
                        <Form form={form}>
                            <Form.Item name="amout">
                                <Input maxLength={6} onChange={(e) => setDoller(e.target.value)} min={0} className='ant-input-affix-wrapper' type='number' placeholder='Enter Amout' />
                            </Form.Item>
                        </Form>
                        <div>
                            <p style={{ margin: "0px", color: "gray", fontSize: "14px" }}>Available Blance : 10</p>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p style={{ margin: "0px", color: "gray", fontSize: "14px" }}>Average Price</p>
                            <p style={{ margin: "0px", color: "gray", fontSize: "14px" }}>{doller || "0"}</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p style={{ margin: "0px", color: "gray", fontSize: "14px" }}>Est. Shares</p>
                            <p style={{ margin: "0px", color: "gray", fontSize: "14px" }}>{doller * 10 / 100 || "0"}</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p style={{ margin: "0px", color: "gray", fontSize: "14px" }}>Potential Returns</p>
                            <p style={{ margin: "0px", color: "gray", fontSize: "14px" }}>{doller * 1.16 || "0.00"}<b style={{ color: "#0092DA" }}>(ROI : 1.16 X)</b></p>
                        </div>

                        <div className='text-area'>
                            <p className='dec'>Trading Fee: 10% of profit</p>
                        </div>


                        <div className='proceed'>
                            <button className={outcomeBtn == "yes" && 'active-outcome-yes' || outcomeBtn == "no" && 'active-outcome-no  '}>Proceed</button>
                        </div>
                    </div>
                </Col>
            </Row >
        </>
    )
}

export default TradingScreen