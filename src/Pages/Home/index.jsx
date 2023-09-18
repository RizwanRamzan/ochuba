import React, { useState, useEffect } from "react";
import "./home.scss";
import { Card, Carousel, Col, Dropdown, Row, Select } from "antd";
import { CardData, Title } from "./constant";
import { ReactSVG } from "react-svg";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { Filter, image1, image2, image3, image4, image5 } from "../../assets";
import LearnTrade from "../../Component/LearnTrading";
import { useSelector } from "react-redux";

const Home = () => {
  const [data, setData] = useState([]);
  const [tabs, setTabs] = useState({ name: "Sports", index: 0 });
  const [subTabs, setSubTabs] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = useSelector((state) => state?.authReducer?.token);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    form.resetFields();
    setIsEditOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setIsEditOpen(false);
  };

  const GetAllTrading = () => {
    setLoading(true);

    fetch(`${baseUrl}/api/v1/admin/trading`, {
      method: "get",
      headers: {
        "x-sh-auth": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data?.success) {
          setData(data.data);
        }
      });
  };

  useEffect(() => GetAllTrading(), []);

  const mobileResponsive = useMediaQuery({
    query: "(max-width: 900px)",
  });

  const items = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          Closing Soon
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          New Market
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          Total Volume
        </a>
      ),
    },
  ];

  return (
    <div className="home">
      <div className="home-box">
        <Row gutter={[20, 20]}>
          <Col
            span={24}
            style={
              mobileResponsive ? { marginTop: "20px" } : { marginTop: "50px" }
            }
          >
            <Carousel
              style={
                mobileResponsive
                  ? { width: "100%", height: "100px" }
                  : { width: "100%", height: "200px" }
              }
              slidesToShow={mobileResponsive ? 1 : 3}
              dots={false}
              autoplay
            >
              <div style={{ width: "100%" }}>
                <img
                  style={{ borderRadius: "10px" }}
                  width={"100%"}
                  src={image1}
                />
              </div>
              <div style={{ width: "100%" }}>
                <img
                  style={{ borderRadius: "10px" }}
                  width={"100%"}
                  src={image2}
                />
              </div>
              <div style={{ width: "100%" }}>
                <img
                  style={{ borderRadius: "10px" }}
                  width={"100%"}
                  src={image3}
                />
              </div>
              <div style={{ width: "100%" }}>
                <img
                  style={{ borderRadius: "10px" }}
                  width={"100%"}
                  src={image4}
                />
              </div>
              <div style={{ width: "100%" }}>
                <img
                  style={{ borderRadius: "10px" }}
                  width={"100%"}
                  src={image5}
                />
              </div>
            </Carousel>
          </Col>
          <Col
            style={mobileResponsive ? { marginTop: "20px" } : {}}
            span={mobileResponsive ? 4 : 2}
          >
            <Dropdown
              menu={{ items }}
              placement="bottomRight"
              trigger={["click"]}
            >
              <div className="filter">
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

          <Col
            style={mobileResponsive ? { marginTop: "20px" } : {}}
            span={mobileResponsive ? 20 : 22}
          >
            <div className="title-tabs">
              {Title?.map((item, index) => (
                <div
                  onClick={() => {
                    setTabs({ name: item?.name, index: index });
                    setSubTabs("");
                  }}
                  key={index}
                  className={`title-tab ${
                    tabs?.name == item?.name && "activetab"
                  }`}
                >
                  <ReactSVG style={{ marginTop: "5px" }} src={item?.icons} />
                  <p className="title">{item?.name}</p>
                </div>
              ))}
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col span={24}>
            <div className="title-tabs">
              {Title[tabs?.index].subTitles.map((item, index) => (
                <div
                  onClick={() => setSubTabs(index)}
                  key={index}
                  className={`title-tab ${subTabs == index && "activetab"}`}
                >
                  <p className="title1">{item?.sub_title}</p>
                </div>
              ))}
            </div>
          </Col>
        </Row>

        <Row style={{ marginTop: "50px" }} gutter={[20, 20]}>
          {data?.map((item) => (
            <Col span={mobileResponsive ? 24 : 8}>
              <Card
                onClick={() => navigate("/trading-chart")}
                style={{ cursor: "pointer", borderColor: "gray" }}
              >
                <div className="card">
                  <p className="title-text">{item?.title}</p>
                  <img src={item?.image} alt="item?.image" />
                </div>
                <div className="card-bottom">
                  {/* <div className='card-left'>
                                        <img src={Ranking1} />
                                        <p className='left-text'>{item?.trade}</p>
                                    </div> */}
                  {/* <div className='card-right'> */}
                  <p className="right-text1">Yes {item?.yes}</p>
                  <p className="right-text2">No {item?.no}</p>
                  {/* </div> */}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* MOdal */}

      <LearnTrade
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default Home;
