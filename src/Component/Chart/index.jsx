import { Card, Col, Form, Input, Row, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import RenderLineChart from "../lineChart";
import "./chats.scss";
import { DefaultNumber } from "../../Pages/Wallet/constant";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../Redux/Reducers/gernalSlice";

const TradingScreen = () => {
  const [withdrawal, setWithdrawal] = useState("deposit");
  const [sellAmount, setsellAmount] = useState("");
  let [number, setNumber] = useState("");
  const [activeBtn, setActiveBtn] = useState("");
  const [active, setActive] = useState("yes");
  const [buyOrSell, setBuyOrSell] = useState("buy");
  const [outcomeBtn, setOutcomeBtn] = useState("yes");
  const [doller, setDoller] = useState(0);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [noBids, setNoBids] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [completeUserDetails, setCompleteUserDetails] = useState({});

  console.log(completeUserDetails, "completeUserDetailscompleteUserDetails");

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state?.authReducer?.token);
  const userDetails = useSelector(
    (state) => state?.gernalReducer?.completeUser
  );

  const [form] = Form.useForm();

  useEffect(() => {
    form?.setFieldValue({
      amout: number,
    });
  }, [number]);

  const mobileResponsive = useMediaQuery({
    query: "(max-width: 900px)",
  });

  const bidId = useParams();

  const formHandler = async () => {
    const formData = {
      bid: outcomeBtn,
      bidamount: doller,
      amount:outcomeBtn == "yes"
      ? chartData[chartData?.length - 1]?.amount
      : noBids[noBids?.length - 1]?.amount,

    };

    if (doller) {
      setLoading(true);

      fetch(`${baseUrl}/api/v1/admin/trading/bid/${bidId?.id}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data.message) {
            message.success(data.message);
            navigate(`/trading-chart/${bidId?.id}`);
            form.resetFields();
            setDoller("");
            fetch(`${baseUrl}/api/v1/auth/user`, {
              method: "get",
              headers: {
                Authorization: token,
              },
            })
              .then((res) => res.json())
              .then((userData) => {
                dispatch(setUserDetails(userData?.data));
                getAllBids();
              })
              .catch((error) => {
                setLoading(false);
              });
          }
        })
        .catch((error) => {
          setLoading(false);
        });
    } else {
      message.warning("Please enter amonut");
    }
  };

  const getAllBids = () => {
    setTotalAmount(0);
    fetch(`${baseUrl}/api/v1/admin/trading/single/${bidId?.id}`, {
      method: "get",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((userData) => {
        setCompleteUserDetails(userData?.data);
        setChartData(
          userData?.data?.bids?.filter((item) => item?.bid == "yes")
        );
        setNoBids(userData?.data?.bids?.filter((item) => item?.bid == "no"));
        for (let i = 0; i < userData?.data?.bids?.length; i++) {
          setTotalAmount(
            (pre) => pre + parseInt(userData?.data?.bids[i]?.amount)
          );
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllBids();
  }, [bidId?.id]);

  // Sell Amount

  const formSellHandler = async () => {

    const userBidId= completeUserDetails?._id == bidId?.id || ""



    const formData = {
      amount:
        outcomeBtn == "yes"
          ? chartData[chartData?.length - 1]?.amount
          : noBids[noBids?.length - 1]?.amount,
      bidamount: sellAmount,
      bid: outcomeBtn,
    };

    if (sellAmount) {
      setLoading(true);

      fetch(`${baseUrl}/api/v1/admin/trading/sell/${bidId?.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data.message) {
            message.success(data.message);
            navigate(`/trading-chart/${bidId?.id}`);
            form.resetFields();
            setDoller("");
            fetch(`${baseUrl}/api/v1/auth/user`, {
              method: "get",
              headers: {
                Authorization: token,
              },
            })
              .then((res) => res.json())
              .then((userData) => {
                dispatch(setUserDetails(userData?.data));
                getAllBids();
              })
              .catch((error) => {
                setLoading(false);
              });
          }
        })
        .catch((error) => {
          setLoading(false);
        });
    } else {
      message.warning("Please enter amonut");
    }
  };

  return (
    <Spin spinning={loading}>
      <Row
        style={mobileResponsive ? { marginTop: "20px" } : { marginTop: "50px" }}
        gutter={[20, 20]}
        className="wallet"
      >
        <Col span={24}>
          <p style={{ fontWeight: "600", fontSize: "20px" }}>
            {completeUserDetails?.title}
          </p>
        </Col>
        <Col span={24}>
          <div className="trading-cart">
            <p className="right-text1">
              Yes {chartData[chartData?.length - 1]?.amount || 0.0}
            </p>
            <p className="right-text2">
              No {noBids[noBids?.length - 1]?.amount || 0.0}
            </p>
          </div>
        </Col>
        <Col span={24} className="trading-yeschart">
          <button
            onClick={() => setActive("yes")}
            className={active == "yes" ? "yes activeButton" : "yes"}
          >
            Yes Chart
          </button>
          <button
            onClick={() => setActive("no")}
            className={active == "no" ? "yes activeButton" : "yes"}
          >
            No Chart
          </button>
          <button
            onClick={() => setActive("about")}
            className={active == "about" ? "about activeButton" : "about"}
          >
            About
          </button>
        </Col>
        {active == "yes" && (
          <Col span={mobileResponsive ? 24 : 16}>
            <RenderLineChart chartData={chartData} />
          </Col>
        )}
        {active == "no" && (
          <Col span={mobileResponsive ? 24 : 16}>
            <RenderLineChart chartData={noBids} type="no" />
          </Col>
        )}
        {active == "about" && (
          <Col span={mobileResponsive ? 24 : 16}>
            <Card>
              <h2>About the event</h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p>Total Amount</p>
                <p>{totalAmount || 0}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p style={{ marginTop: "0px" }}>Closes on</p>
                <p
                  style={{ marginTop: "0px" }}
                >{`${completeUserDetails?.endDate} ${completeUserDetails?.endTime}`}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p style={{ marginTop: "0px" }}>Number of Bids</p>
                <p style={{ marginTop: "0px" }}>
                  {completeUserDetails?.bids?.length}
                </p>
              </div>
              <h3>Market Resolution</h3>
              <p>{completeUserDetails?.resolution}</p>
            </Card>
          </Col>
        )}

        <Col span={mobileResponsive ? 24 : 8}>
          <div className="wallet-right-side">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="trading-yeschart">
                <button
                  onClick={() => setBuyOrSell("buy")}
                  className={buyOrSell == "buy" ? "yes activeButton" : "yes"}
                >
                  Buy
                </button>
                <button
                  onClick={() => setBuyOrSell("sell")}
                  className={buyOrSell == "sell" ? "yes activeButton" : "yes"}
                >
                  Sell
                </button>
              </div>
              <span>Market</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <p>Outcome</p>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => setOutcomeBtn("yes")}
                  className={
                    outcomeBtn == "yes"
                      ? "outcome-yes active-outcome-yes"
                      : "outcome-yes"
                  }
                >
                  Yes
                </button>
                <button
                  onClick={() => setOutcomeBtn("no")}
                  className={
                    outcomeBtn == "no"
                      ? "outcome-yes active-outcome-no"
                      : "outcome-yes"
                  }
                >
                  No
                </button>
              </div>
            </div>
            <p className="credits">Credits to be added (niagara currency)</p>

            <Form layout="vertical" form={form}>
              {buyOrSell == "buy" ? (
                <>
                  <Form.Item
                    name="amout"
                    label="Amount"
                    rules={[
                      {
                        required: true,
                        message: "please enter your amount",
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => setDoller(e.target.value)}
                      min={0}
                      className="ant-input-affix-wrapper"
                      type="number"
                      placeholder="Enter Amout"
                    />
                  </Form.Item>
                  <div>
                    <p
                      style={{ margin: "0px", color: "gray", fontSize: "14px" }}
                    >
                      Available Blance : {userDetails?.amount}
                    </p>
                  </div>

                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p
                      style={{ margin: "0px", color: "gray", fontSize: "14px" }}
                    >
                      Average Price
                    </p>
                    <p
                      style={{ margin: "0px", color: "gray", fontSize: "14px" }}
                    >
                      {outcomeBtn == "yes" &&
                        chartData[chartData?.length - 1]?.amount}
                      {outcomeBtn == "no" && noBids[noBids?.length - 1]?.amount}
                    </p>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p
                      style={{ margin: "0px", color: "gray", fontSize: "14px" }}
                    >
                      Est. Shares
                    </p>
                    <p
                      style={{ margin: "0px", color: "gray", fontSize: "14px" }}
                    >
                      {outcomeBtn == "yes" &&
                        (
                          doller / chartData[chartData?.length - 1]?.amount
                        ).toFixed(2)}
                      {outcomeBtn == "no" &&
                        (doller / noBids[noBids?.length - 1]?.amount).toFixed(
                          2
                        )}
                    </p>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p
                      style={{ margin: "0px", color: "gray", fontSize: "14px" }}
                    >
                      Potential Returns
                    </p>
                    <p
                      style={{ margin: "0px", color: "gray", fontSize: "14px" }}
                    >
                      {doller * 1.16 || "0.00"}
                      <b style={{ color: "#0092DA" }}>(ROI : 1.16 X)</b>
                    </p>
                  </div>

                  <div className="text-area">
                    <p className="dec">Trading Fee: 10% of profit</p>
                  </div>

                  {userDetails?.amount < doller ? (
                    <div className="proceed">
                      <button
                        disabled={!doller}
                        onClick={() => {
                          message.warning("Please Recharge your account");
                          navigate("/wallet");
                        }}
                        className={
                          (outcomeBtn == "yes" && "active-outcome-yes") ||
                          (outcomeBtn == "no" && "active-outcome-no  ")
                        }
                      >
                        Add {doller - userDetails?.amount}
                      </button>
                    </div>
                  ) : (
                    <div className="proceed">
                      <button
                        disabled={!doller}
                        onClick={() => formHandler()}
                        className={
                          (outcomeBtn == "yes" && "active-outcome-yes") ||
                          (outcomeBtn == "no" && "active-outcome-no  ")
                        }
                      >
                        Proceed
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Form.Item
                    name="amout"
                    label="Shares"
                    rules={[
                      {
                        required: true,
                        message: "please enter your amount",
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => setsellAmount(e.target.value)}
                      min={0}
                      className="ant-input-affix-wrapper"
                      type="number"
                      placeholder="Enter Amout"
                    />
                  </Form.Item>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p
                      style={{ margin: "0px", color: "gray", fontSize: "14px" }}
                    >
                      Average Price
                    </p>
                    <p
                      style={{ margin: "0px", color: "gray", fontSize: "14px" }}
                    >
                      {outcomeBtn == "yes" &&
                        chartData[chartData?.length - 1]?.amount}
                      {outcomeBtn == "no" && noBids[noBids?.length - 1]?.amount}
                    </p>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p
                      style={{ margin: "0px", color: "gray", fontSize: "14px" }}
                    >
                      Est. Shares
                    </p>
                    <p
                      style={{ margin: "0px", color: "gray", fontSize: "14px" }}
                    >
                      {outcomeBtn == "yes" &&
                        chartData[chartData?.length - 1]?.amount * sellAmount}
                      {outcomeBtn == "no" &&
                        noBids[noBids?.length - 1]?.amount * sellAmount}
                    </p>
                  </div>

                  <div className="text-area">
                    <p className="dec">Trading Fee: 10% of profit</p>
                  </div>

                  {userDetails?.amount < doller ? (
                    <div className="proceed">
                      <button
                        disabled={!doller}
                        onClick={() => {
                          message.warning("Please Recharge your account");
                          navigate("/wallet");
                        }}
                        className={
                          (outcomeBtn == "yes" && "active-outcome-yes") ||
                          (outcomeBtn == "no" && "active-outcome-no  ")
                        }
                      >
                        Add {doller - userDetails?.amount}
                      </button>
                    </div>
                  ) : (
                    <div className="proceed">
                      <button
                        disabled={!sellAmount}
                        onClick={() => formSellHandler()}
                        className={
                          (outcomeBtn == "yes" && "active-outcome-yes") ||
                          (outcomeBtn == "no" && "active-outcome-no  ")
                        }
                      >
                        Proceed
                      </button>
                    </div>
                  )}
                </>
              )}
            </Form>
          </div>
        </Col>
      </Row>
    </Spin>
  );
};

export default TradingScreen;
