import React, { useState } from 'react'
import './home.scss'
import { Card, Col, Dropdown, Row, Select } from 'antd'
import { CardData, Title } from './constant'
import { ReactSVG } from 'react-svg'
import { Filter, Fiverr, Ranking1 } from '../../assets'
import { useMediaQuery } from 'react-responsive'
import LearnTrade from '../../Component/LearnTrading'


const Home = () => {

    const [tabs, setTabs] = useState({ name: "Sports", index: 0 })
    const [subTabs, setSubTabs] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);



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

    const mobileResponsive = useMediaQuery({
        query: '(max-width: 900px)'
    })

    

    const items = [
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer">
              Closing Soon
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer">
              New Market
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer">
              Total Volume
            </a>
          ),
        },
      ];

    return (
        <div className='home'>

            <div className='home-box'>

                <Row gutter={30} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Col span={24} style={{ marginTop: "50px" }} >
                        <img src={Fiverr} style={{ borderRadius: "10px", border: "1px solid gray" }} />
                    </Col>
                    <Col span={24}>
                        <div className='learn'>
                            How to trade? <a onClick={() => showModal()}> Learn More</a>
                        </div>
                    </Col>
                    <Col span={mobileResponsive ? 24 : 2} style={{ marginTop: "40px" }}>
                        <Dropdown
                            menu={{ items }}
                            placement="bottomRight"
                            trigger={['click']}
                        >
                            <div className='filter'>
                                <img width={25} height="auto" src={Filter} />
                            </div>
                        </Dropdown>
                        {/* <Select suffixIcon={} className='ant-select-selector'>
                            <Select.Option value="Closing Soon">
                                Closing Soon
                            </Select.Option>
                            <Select.Option value="New Market">
                                New Market
                            </Select.Option>
                            <Select.Option value="Total Volums">
                                Total Volums
                            </Select.Option>
                        </Select> */}
                    </Col>


                    <Col span={mobileResponsive ? 24 : 22} style={{ marginTop: "40px" }}>
                        <div className='title-tabs'>
                            {Title?.map((item, index) =>
                                <div onClick={() => {
                                    setTabs({ name: item?.name, index: index })
                                    setSubTabs("")
                                }} key={index} className={`title-tab ${tabs?.name == item?.name && "activetab"}`}>
                                    <ReactSVG style={{ marginTop: "5px" }} src={item?.icons} />
                                    <p className='title'>{item?.name}</p>
                                </div>
                            )}
                        </div>
                    </Col>


                </Row>
                <Row style={{ marginTop: "30px" }}>
                    <Col span={24}>
                        <div className='title-tabs'>
                            {Title[tabs?.index].subTitles.map((item, index) =>
                                <div onClick={() => setSubTabs(index)} key={index} className={`title-tab ${subTabs == index && "activetab"}`}>
                                    <p className='title1'>{item?.sub_title}</p>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>

                <Row style={{ marginTop: "50px" }} gutter={[20, 20]}>
                    {CardData?.map((item) =>
                        <Col span={mobileResponsive ? 24 : 8}>
                            <Card style={{ cursor: "pointer",borderColor:"gray" }}>
                                <div className='card'>
                                    <p className='title-text'>{item?.title}</p>
                                    <img src={item?.image} alt="item?.image" />
                                </div>
                                <div className='card-bottom'>
                                    {/* <div className='card-left'>
                                        <img src={Ranking1} />
                                        <p className='left-text'>{item?.trade}</p>
                                    </div> */}
                                    {/* <div className='card-right'> */}
                                        <p className='right-text1'>Yes {item?.yes}</p>
                                        <p className='right-text2'>No {item?.no}</p>
                                    {/* </div> */}
                                </div>
                            </Card>
                        </Col>
                    )}
                </Row>
            </div>

            {/* MOdal */}

            <LearnTrade isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />

        </div>
    )
}

export default Home