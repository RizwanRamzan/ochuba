import { Checkbox, Col, DatePicker, Form, Input, Row } from 'antd'
import React, { useState } from 'react'
import './profile.scss'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Google from '../../Component/Google/google'
import { Profileeee } from '../../assets'
import { useMediaQuery } from 'react-responsive'

const Profile = () => {


    const [formState, setFormState] = useState({
        image: null,
    });


    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        console.log(file, "filefilefilefilefile")
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFormState({ image: reader.result });
        };
    };

    const mobileResponsive = useMediaQuery({
        query: '(max-width: 900px)'
    })



    return (
        <div className='profile'>
            <div className='left-side'>
                <div className='left-side-inner'>
                    <Form layout='vertical'>
                        <Row >
                            <Col span={24}>
                                <Form.Item name="full_name" label="Full Name" rules={[{ required: true, message: "Please Enter Your Name" }]}>
                                    <Input className='ant-input-affix-wrapper' placeholder='Enter Your Name' />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item name="phone" label="Phone Name" rules={[{ required: true, message: "Please Enter Your Phone Number" }]}>
                                    <Input className='ant-input-affix-wrapper' type='number' placeholder='Enter Your Phone Number' />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item name="Address" label="Residential Address Pincode" rules={[{ required: true, message: "Please Enter Your Address Pincode" }]}>
                                    <Input className='ant-input-affix-wrapper' type='number' placeholder='Enter Your Address Pincode' />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item name="Date of birth" label="Residential Address Pincode" rules={[{ required: true, message: "Please Enter Your Address Pincode" }]}>
                                    <DatePicker className='ant-input-affix-wrapper' />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <GoogleOAuthProvider clientId="739106075686-o3iq57fl19qmf50planckptdekklb1du.apps.googleusercontent.com">
                                    <Google />
                                </GoogleOAuthProvider>
                            </Col>
                            <Col style={{ marginTop: "20px" }} span={24}>
                                <Checkbox>
                                    loram iphsam
                                </Checkbox>
                            </Col>
                            <Col span={24}>
                                <button className='submit-button' >Submit</button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
            <div className='right-side'>
                <div className='right-side-inner'>
                    <label className='profile-image' htmlFor="image-upload">
                        <img src={formState?.image ? formState?.image : Profileeee} />
                    </label>
                    <input
                        style={{ display: "none" }}
                        required
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    <div className='profile-details'>
                        <p style={{textAlign:"center",fontWeight:"600"}}>Profile Update Pending</p>
                        <p style={{textAlign:"center"}}>Please complete your profile</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile