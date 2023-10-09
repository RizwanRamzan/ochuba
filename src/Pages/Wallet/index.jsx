import {
  Button,
  Card,
  Carousel,
  Col,
  Drawer,
  Empty,
  Form,
  Input,
  Modal,
  Row,
  Select,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import "./wallet.scss";
import { useNavigate } from "react-router-dom";
import { DefaultNumber, result } from "./constant";
import { useMediaQuery } from "react-responsive";
import { image1, image2, image3, image4, image5 } from "../../assets";
import Flutterwave from "../../Component/Payment/flutterwave";
import { useSelector } from "react-redux";
import { setUserDetails } from "../../Redux/Reducers/gernalSlice";

const Wallet = () => {
  const [active, setActive] = useState("live");

  const eventHandler = (tab) => {
    setActive(tab);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenWithdraw, setIsModalOpenWithdraw] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const [withdrawal, setWithdrawal] = useState("deposit");
  const [number, setNumber] = useState("");
  const [activeBtn, setActiveBtn] = useState("FLUTTERWAVE PAY");
  const [Amount, setAmount] = useState("");
  const [isModalCrypto, setIsModalCrypto] = useState("");

  const userDetails = useSelector(
    (state) => state?.gernalReducer?.completeUser
  );
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const showModalwithdraw = () => {
    if (Amount) {
      setIsModalOpenWithdraw(true);
    } else {
      message.warning("please enter your withdraw amount");
    }
  };

  const showModalCrypto = () => {
    setIsModalCrypto(true);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setIsModalOpenWithdraw(false);
    setIsModalCrypto(false);
    form.resetFields();
  };

  const showModalwithdrawOk = () => {
    if (Amount) {
      setIsModalOpen(false);
      setIsModalOpenWithdraw(false);
      form.resetFields();
      message.success(
        "It will take 2 to 3 days for payment to get into your account"
      );
      setAmount("");
    } else {
      message.warning("please your valid account number");
    }
  };

  const handleOkPayment = () => {
    setIsModalOpen(false);
    form.resetFields();
    setIsPayment(false);
    setIsModalOpenWithdraw(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setIsModalCrypto(false);
    setIsPayment(false);
    setIsModalOpenWithdraw(false);
  };

  const [form] = Form.useForm();

  useEffect(() => {
    form?.setFieldsValue({
      amout: number,
    });
  }, [number]);

  const mobileResponsive = useMediaQuery({
    query: "(max-width: 900px)",
  });

  const typeOfPayemnt = () => {
    if (activeBtn == "FLUTTERWAVE PAY") {
      if (Amount) {
        setIsPayment(true);
      } else {
        message.warning("please enter detosit amount");
      }
    } else {
      if (Amount) {
        showModalCrypto()
      } else {
        message.warning("please enter detosit amount");
      }
    }
  };

  const cryptoPayment=()=>{
    message.error("Your blockchain network code is incorrect")
  }

  return (
    <div className="wallet">
      <Row className="wallet-top">
        <Col className="mobileresponsive" span={mobileResponsive ? 24 : 6}>
          <p className="heading">Deposit</p>
          <p className="value">
            <b> ₦ </b>
            {userDetails?.amount}
          </p>
        </Col>
        <Col
          span={mobileResponsive ? 24 : 6}
          className="border-class mobileresponsive"
        >
          <p className="heading">Earnings</p>
          <p className="value">
            <b> ₦ </b>
            {userDetails?.profit}
          </p>
        </Col>
        <Col
          span={mobileResponsive ? 24 : 6}
          className="border-class mobileresponsive"
        >
          <p className="heading">Promo Cash</p>
          <p className="value">
            <b> ₦ </b>
            {userDetails?.profit}
          </p>
        </Col>
        <Col
          onClick={() => showModal()}
          span={mobileResponsive ? 24 : 6}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            cursor: "pointer",
          }}
        >
          <p
            className="heading"
            style={{
              height: "40px",
              width: "40px",
              background: "#E1E9FF",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0093DD",
            }}
          >
            ?
          </p>
          <p className="value" style={{ color: "#0093DD", fontSize: "14px" }}>
            FAQs
          </p>
        </Col>
      </Row>

      <Row gutter={[20, 20]} className="ready-to-trade">
        <Col span={24}></Col>
        <Col span={mobileResponsive ? 24 : 17}>
          <Carousel
            style={mobileResponsive ? { width: "100%" } : { width: "100%" }}
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

          <Col span={24}>
            <p className="passbook">My Transactions</p>
          </Col>
          <div className="left-side">
            {userDetails?.history?.map((item, index) => (
              <div className="wellate-card">
                <div className="wellate-card-inner">
                  <div className="wellate-left">
                    <p className="first-text">Deposit Added</p>
                    <p className="second-text">Successfull Added</p>
                  </div>
                  <p className="right-text">+{item} <b> ₦ </b></p>
                </div>
              </div>
            ))}
          </div>
        </Col>
        <Col style={{ height: "100%" }} span={mobileResponsive ? 24 : 7}>
          <div className="wallet-right-side">
            <div className="wellate-buttons">
              <button
                onClick={() => setWithdrawal("deposit")}
                className={
                  withdrawal == "deposit" ? "activeButton deposit" : "deposit"
                }
              >
                Deposit
              </button>
              <button
                onClick={() => {
                  setWithdrawal("withdraw");
                }}
                className={
                  withdrawal == "withdraw" ? "activeButton deposit" : "deposit"
                }
              >
                Withdraw
              </button>
            </div>
            <p className="credits">Credits to be added (<b> ₦ </b>)</p>
            <Form form={form}>
              <Form.Item name="amout">
                <Input
                  min={0}
                  max={1000}
                  className="ant-input-affix-wrapper"
                  type="number"
                  placeholder="Enter Amout ₦"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Form.Item>
            </Form>
            {withdrawal == "deposit" ? (
              <>
                <div className="wellate-numbers">
                  {DefaultNumber?.map((item, index) => (
                    <p
                      onClick={() => {
                        setNumber(item?.number);
                        setAmount(item?.number);
                      }}
                      className={
                        number == item?.number
                          ? "wellate-default active-number"
                          : "wellate-default"
                      }
                      key={index}
                    >
                      {item?.number}<b> ₦ </b>
                    </p>
                  ))}
                </div>

                <div className="selet-network">
                  <p>Select Network Type</p>
                  <div className="selet-network-button">
                    {["FLUTTERWAVE PAY", "CRYPTO PAY"]?.map((item, index) => (
                      <button
                        onClick={() => {
                          setActiveBtn(item)
                        }}
                        className={activeBtn == item && "active-button"}
                        key={index}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* <div className="text-area">
              <p className="dec">
                All your deposits will be pro}cessed in USDT only. Actual rates
                may vary during the time of transaction.
              </p>
              <p className="dec">
                We support ERC20 & TRC20 networks. For details please{" "}
                <a>refer this .</a>
              </p>
            </div> */}

                <div className="proceed">
                  <button
                    onClick={() => {
                      typeOfPayemnt();
                    }}
                  >
                    Proceed
                  </button>
                </div>
              </>
            ) : (
              <>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p style={{ margin: "0px", color: "gray", fontSize: "14px" }}>
                    Average Price
                  </p>
                  <p style={{ margin: "0px", color: "gray", fontSize: "14px" }}>
                    {userDetails?.amount || "0"}
                  </p>
                </div>
                <div className="proceed">
                  <button onClick={() => showModalwithdraw()}>Proceed</button>
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>

      {/* WithDraw */}

      <Modal
        title="Withdraw"
        footer={false}
        onCancel={handleCancel}
        open={isModalOpenWithdraw}
        onOk={showModalwithdrawOk}
      >
        <Form
          layout="vertical"
          form={form}
          style={{
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Form.Item
            style={{ width: "100%" }}
            name="withdrawAmount"
            label="Account Number"
          >
            <Input
              min={0}
              max={1000}
              className="ant-input-affix-wrapper"
              type="number"
              placeholder="Enter Account Number"
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Item>
          <button
            onClick={() => showModalwithdrawOk()}
            style={{
              width: "100px",
              background: "#0093DD",
              border: "none",
              color: "white",
              height: "40px",
              borderRadius: "10px",
            }}
          >
            Submit
          </button>
        </Form>
      </Modal>

      {/* crypto modal */}

      {/* WithDraw */}

      <Modal
        title="Pay with crypto"
        footer={false}
        onCancel={handleCancel}
        open={isModalCrypto}
        onOk={showModalwithdrawOk}
      >
        <Form

          layout="vertical"
          form={form}
          style={{
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                style={{ width: "100%" }}
                name="cryptoamount"
                label="Amount"
                rules={[{required:true}]}
              >
                <Input
                  min={0}
                  
                  className="ant-input-affix-wrapper"
                  type="number"
                  placeholder="Enter Account Number"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item rules={[{required:true}]} style={{ width: "100%" }}  name="form" label="Form (currency)">
                <Select placeholder="Please select country">
                  {result?.map((item) => (
                    <Select.Option key={item?.to} value={item?.to}>
                      {item?.to}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item rules={[{required:true}]} style={{ width: "100%" }} name="to" label="To (currency)">
                <Select placeholder="Please select country">
                  {result?.map((item) => (
                    <Select.Option key={item?.to} value={item?.to}>
                      {item?.to}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
              rules={[{required:true}]}
                style={{ width: "100%" }}
                name="code"
                label="Blockchain network code"
              >
                <Input
                  min={0}
                  
                  className="ant-input-affix-wrapper"
                  type="number"
                  placeholder="Enter Blockchain network code"
                />
              </Form.Item>
            </Col>

          </Row>

          <button
          type='submit'
            onClick={() => cryptoPayment()}
            style={{
              width: "100px",
              background: "#0093DD",
              border: "none",
              color: "white",
              height: "40px",
              borderRadius: "10px",
            }}
          >
            Submit
          </button>
        </Form>
      </Modal>

      {/* Modal  */}
      <Modal
        footer={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row className="modal">
          <Col span={24} className="faqs-heading">
            <p
              style={{ color: "#0093DD", fontWeight: "bold", fontSize: "18px" }}
            >
              Frequently Asked Questions
            </p>
          </Col>

          <Col span={24}>
            <p style={{ color: "#000", fontWeight: "600" }}>
              Are my funds secured?
            </p>
          </Col>
          <Col span={24}>
            <p style={{ marginTop: 0 }}>Your funds are 100% secure.</p>
          </Col>

          <Col span={24}>
            <p style={{ color: "#000", fontWeight: "600" }}>
              How is TDS calculated?
            </p>
          </Col>
          <Col span={24}>
            <p style={{ marginTop: 0 }}>
              As per the new TDS (Tax deducted at source) law, effective 1st
              April 2023, tax will be deducted at 30% of your net winnings at
              the time of withdrawal.
            </p>
          </Col>

          <Col span={24}>
            <p style={{ color: "#000", fontWeight: "600" }}>
              What is deposit balance?
            </p>
          </Col>
          <Col span={24}>
            <p style={{ marginTop: 0 }}>
              The deposit balance reflects the total funds you've added, while
              any deposited balance not used for investment cannot be withdrawn.
            </p>
          </Col>

          <Col span={24}>
            <p style={{ color: "#000", fontWeight: "600" }}>
              What is earnings balance?
            </p>
          </Col>
          <Col span={24}>
            <p style={{ marginTop: 0 }}>
              Winnings from different events are credited to your earnings
              balance, and they can be withdrawn
            </p>
          </Col>

          <Col span={24}>
            <p style={{ color: "#000", fontWeight: "600" }}>
              What is promo cash balance?
            </p>
          </Col>
          <Col span={24}>
            <p style={{ marginTop: 0 }}>
              Cashbacks from promo codes are credited to your promo cash wallet.
              Part of promo cash will convert to deposits when you lose a bid.
              Promo cash will become tradable only once it gets converted to
              deposits.
            </p>
          </Col>
        </Row>
      </Modal>

      <Modal
        footer={false}
        open={isPayment}
        onOk={handleOkPayment}
        onCancel={handleCancel}
        width={mobileResponsive ? "90%" : "60%"}
      >
        <Flutterwave setIsPayment={setIsPayment} Amount={Amount} />
      </Modal>

      <Drawer
        title="Signup Bonus Added"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <Row className="drawer">
          <Col span={24}>
            <div className="transactions-profile">
              <p className="profile">+</p>
              <p className="profile_name">Signup Bonus Added</p>
              <p className="profile_point">10</p>
            </div>
          </Col>
          <Col span={24}>
            <p className="transactions_details">Transactions Details</p>
          </Col>
          <Col span={12}>
            <p className="left">Amount</p>
          </Col>
          <Col span={12}>
            <p className="right">10</p>
          </Col>
          <Col span={12}>
            <p className="left">Transaction ID</p>
          </Col>
          <Col span={12}>
            <p className="right">loram</p>
          </Col>
          <Col span={12}>
            <p className="left">Date</p>
          </Col>
          <Col span={12}>
            <p className="right">loram</p>
          </Col>
        </Row>
      </Drawer>
    </div>
  );
};

export default Wallet;
