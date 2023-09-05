import { Col, Form, Input, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import RenderLineChart from '../lineChart'
import './chats.scss'
import { DefaultNumber } from '../../Pages/Wallet/constant'

const TradingScreen = () => {

    const [withdrawal, setWithdrawal] = useState("deposit");
    const [dollor, setDollor] = useState("")
    let [number, setNumber] = useState("")
    const [activeBtn, setActiveBtn] = useState("")

    const [form] = Form.useForm()

    useEffect(() => {
        form?.setFieldValue({
            amout: number
        })
    }, [number]) 


    return (
        <>
            <Row className='wallet'>
                <Col span={16}>
                    <RenderLineChart />
                </Col>
                <Col span={8}>
                    <div className='wallet-right-side'>
                        <div className='wellate-buttons'>
                            <button onClick={() => setWithdrawal("deposit")} className={withdrawal == "deposit" ? 'activeButton deposit' : "deposit"}>Deposit</button>
                            <button onClick={() => setWithdrawal("withdraw")} className={withdrawal == "withdraw" ? 'activeButton deposit' : "deposit"}>Withdraw</button>
                        </div>
                        <p className='credits' >Credits to be added (1$ ≈ 82.62 credits)</p>
                        <Form form={form}>
                            <Form.Item name="amout">
                                <Input onChange={(e) => valueToDoller(e.target.value)} min={0} suffix={dollor && <p style={{ color: "#0093DD", margin: "0px", }}>= {(dollor)} USDT*</p>} className='ant-input-affix-wrapper' type='number' placeholder='Enter Amout' />
                            </Form.Item>
                        </Form>
                        <div className='wellate-numbers'>
                            {DefaultNumber?.map((item, index) =>
                                <p onClick={() => {
                                    setNumber(item?.number)
                                }} className={number == item?.number ? 'wellate-default active-number' : "wellate-default"} key={index}>{item?.number}</p>
                            )
                            }
                        </div>


                        <div className='selet-network'>
                            <p>Select Network Type</p>
                            <div className='selet-network-button'>
                                {["BINANCE PAY", "TRC20", "ERC20"]?.map((item, index) =>
                                    <button onClick={() => setActiveBtn(item)} className={activeBtn == item && "active-button"} key={index} >{item}</button>
                                )}
                            </div>
                        </div>

                        <div className='text-area'>
                            <p className='dec'>All your deposits will be processed in USDT only. Actual rates may vary during the time of transaction.</p>
                            <p className='dec'>We support ERC20 & TRC20 networks. For details please <a>refer this .</a></p>
                        </div>

                        <div className='proceed'>
                            <button>Proceed</button>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default TradingScreen