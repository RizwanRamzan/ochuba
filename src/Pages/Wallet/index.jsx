import { Button, Col, Empty, Input, Modal, Row } from 'antd'
import React, { useState } from 'react'
import './wallet.scss'
import { Trading } from '../../assets'
import { useNavigate } from 'react-router-dom'

const Wallet = () => {

    const [active, setActive] = useState("live")

    const eventHandler = (tab) => {
        setActive(tab)
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [withdrawal, setWithdrawal] = useState("deposit");
    const [dollor,setDollor] = useState("")



    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        form.resetFields()
        setIsEditOpen(false)

    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields()
        setIsEditOpen(false)

    };

    const valueToDoller=(e)=>{
        setDollor((e/=82.62).toFixed(2))
    }

    const navigate = useNavigate()

    return (
        <div className='wallet'>
            <Row className='wallet-top' >
                <Col span={6}>
                    <p className='heading'>Deposit (1$ ≈ 82.62 credits)</p>
                    <p className='value' >10</p>
                    <p className='heading' style={{ color: "#0093DD", fontSize: "14px" }}>(Incl. 10.00 bonus amount)</p>
                </Col>
                <Col span={6} className='border-class'>
                    <p className='heading'>Earnings</p>
                    <p className='value' >0.00</p>
                </Col>
                <Col span={6} className='border-class'>
                    <p className='heading' >Promo Cash</p>
                    <p className='value' >0.00</p>
                </Col>
                <Col onClick={() => showModal()} span={6} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", cursor: "pointer" }}>
                    <p className='heading' style={{ height: "40px", width: "40px", background: "#E1E9FF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#0093DD" }}>?</p>
                    <p className='value' style={{ color: "#0093DD", fontSize: "14px" }}>FAQs</p>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <p className='passbook'>Passbook</p>
                </Col>
            </Row>
            <Row className='ready-to-trade'>
                <Col span={17}>
                    <div className='left-side'>
                        <img src={Trading} />
                        <p>You are ready to trade. Start Now!</p>
                        <div className='trade-start' >
                            <p>Discover various markets to trade</p>
                            <Button onClick={() => navigate("/market")} type='primary' >Start Now</Button>
                        </div>
                    </div>
                </Col>
                <Col style={{ height: "100%" }} span={7}>
                    <div className='wallet-right-side'>
                        <div className='wellate-buttons'>
                            <button onClick={()=>setWithdrawal("deposit")} className={withdrawal == "deposit" ? 'activeButton deposit' : "deposit"}>Deposit</button>
                            <button onClick={()=>setWithdrawal("withdraw")} className={withdrawal == "withdraw" ? 'activeButton deposit' : "deposit"}>Withdraw</button>
                        </div>
                        <p className='credits' >Credits to be added (1$ ≈ 82.62 credits)</p>
                        <Input onChange={(e)=>valueToDoller(e.target.value)} min={0} suffix={dollor && <p style={{color:"#0093DD",margin:"0px",}}>= {(dollor)} USDT*</p>} className='ant-input-affix-wrapper' type='number' placeholder='Enter Amout' />
                        <div>
                            
                        </div>
                    </div>
                </Col>
            </Row>
            {/* Modal  */}
            <Modal footer={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Row className='modal'>
                    <Col span={24} className='faqs-heading'>
                        <p style={{ color: "#0093DD", fontWeight: "bold", fontSize: "18px" }} >Frequently Asked Questions</p>
                    </Col>


                    <Col span={24}>
                        <p style={{ color: "#000", fontWeight: "600" }}>Are my funds secured?</p>
                    </Col>
                    <Col span={24}>
                        <p style={{ marginTop: 0 }}>Your funds are 100% secure.</p>
                    </Col>

                    <Col span={24}>
                        <p style={{ color: "#000", fontWeight: "600" }}>How is TDS calculated?</p>
                    </Col>
                    <Col span={24}>
                        <p style={{ marginTop: 0 }}>As per the new TDS (Tax deducted at source) law, effective 1st April 2023, tax will be deducted at 30% of your net winnings at the time of withdrawal.</p>
                    </Col>


                    <Col span={24}>
                        <p style={{ color: "#000", fontWeight: "600" }}>What is deposit balance?</p>
                    </Col>
                    <Col span={24}>
                        <p style={{ marginTop: 0 }}>The deposit balance reflects the total funds you've added, while any deposited balance not used for investment cannot be withdrawn.</p>
                    </Col>


                    <Col span={24}>
                        <p style={{ color: "#000", fontWeight: "600" }}>What is earnings balance?</p>
                    </Col>
                    <Col span={24}>
                        <p style={{ marginTop: 0 }}>Winnings from different events are credited to your earnings balance, and they can be withdrawn</p>
                    </Col>


                    <Col span={24}>
                        <p style={{ color: "#000", fontWeight: "600" }}>What is promo cash balance?</p>
                    </Col>
                    <Col span={24}>
                        <p style={{ marginTop: 0 }}>Cashbacks from promo codes are credited to your promo cash wallet. Part of promo cash will convert to deposits when you lose a bid. Promo cash will become tradable only once it gets converted to deposits.</p>
                    </Col>

                </Row>
            </Modal>
        </div>
    )
}

export default Wallet















