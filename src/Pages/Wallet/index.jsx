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
} from "antd";
import React, { useEffect, useState } from "react";
import "./wallet.scss";
import { useNavigate } from "react-router-dom";
import { DefaultNumber } from "./constant";
import { useMediaQuery } from "react-responsive";
import { image1, image2, image3, image4, image5 } from "../../assets";

const Wallet = () => {
  const [active, setActive] = useState("live");

  const eventHandler = (tab) => {
    setActive(tab);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [withdrawal, setWithdrawal] = useState("deposit");
  const [dollor, setDollor] = useState("");
  let [number, setNumber] = useState("");
  const [activeBtn, setActiveBtn] = useState("");

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

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

  const valueToDoller = (e) => {
    setDollor((e /= 82.62).toFixed(2));
  };

  const navigate = useNavigate();

  const [form] = Form.useForm();

  useEffect(() => {
    form?.setFieldValue({
      amout: number,
    });
  }, [number]);

  const mobileResponsive = useMediaQuery({
    query: "(max-width: 900px)",
  });

  return (
    <div className="wallet">
      <Row className="wallet-top">
        <Col className="mobileresponsive" span={mobileResponsive ? 24 : 6}>
          <p className="heading">Deposit (1$ ≈ 82.62 credits)</p>
          <p className="value">10</p>
          <p className="heading" style={{ color: "#0093DD", fontSize: "14px" }}>
            (Incl. 10.00 bonus amount)
          </p>
        </Col>
        <Col
          span={mobileResponsive ? 24 : 6}
          className="border-class mobileresponsive"
        >
          <p className="heading">Earnings</p>
          <p className="value">0.00</p>
        </Col>
        <Col
          span={mobileResponsive ? 24 : 6}
          className="border-class mobileresponsive"
        >
          <p className="heading">Promo Cash</p>
          <p className="value">0.00</p>
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
      <Row>
        <Col span={24}>
          <p className="passbook">My Transactions</p>
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
                <img
                style={{ borderRadius: "10px" }}
                width={"100%"}
                src={image5}
              />
            </div>
          </Carousel>
          <div className="left-side">
            {[1, 2, 3].map((item, index) => (
              <div onClick={() => showDrawer()} className="wellate-card">
                <div className="wellate-card-inner">
                  <div className="wellate-left">
                    <p className="first-text">Signup Bonus Added</p>
                    <p className="second-text">Signup Bonus Added</p>
                  </div>
                  <p className="right-text">+10</p>
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
                onClick={() => setWithdrawal("withdraw")}
                className={
                  withdrawal == "withdraw" ? "activeButton deposit" : "deposit"
                }
              >
                Withdraw
              </button>
            </div>
            <p className="credits">Credits to be added (1$ ≈ 82.62 credits)</p>
            <Form form={form}>
              <Form.Item name="amout">
                <Input
                  onChange={(e) => valueToDoller(e.target.value)}
                  min={0}
                  suffix={
                    dollor && (
                      <p style={{ color: "#0093DD", margin: "0px" }}>
                        = {dollor} USDT*
                      </p>
                    )
                  }
                  className="ant-input-affix-wrapper"
                  type="number"
                  placeholder="Enter Amout"
                />
              </Form.Item>
            </Form>
            <div className="wellate-numbers">
              {DefaultNumber?.map((item, index) => (
                <p
                  onClick={() => {
                    setNumber(item?.number);
                  }}
                  className={
                    number == item?.number
                      ? "wellate-default active-number"
                      : "wellate-default"
                  }
                  key={index}
                >
                  {item?.number}
                </p>
              ))}
            </div>

            <div className="selet-network">
              <p>Select Network Type</p>
              <div className="selet-network-button">
                {["BINANCE PAY", "TRC20", "ERC20"]?.map((item, index) => (
                  <button
                    onClick={() => setActiveBtn(item)}
                    className={activeBtn == item && "active-button"}
                    key={index}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-area">
              <p className="dec">
                All your deposits will be processed in USDT only. Actual rates
                may vary during the time of transaction.
              </p>
              <p className="dec">
                We support ERC20 & TRC20 networks. For details please{" "}
                <a>refer this .</a>
              </p>
            </div>

            <div className="proceed">
              <button>Proceed</button>
            </div>
          </div>
        </Col>
      </Row>
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
