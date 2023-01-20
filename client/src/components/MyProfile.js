import React, { useState, useEffect, useMemo } from 'react'
import { Tabs } from 'antd';
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'
import MyBookings from '../components/MyBookings';
import Swal from 'sweetalert2'
import { FloatButton, Button, Modal, Tag, Form, Input, Divider, notification, Space } from 'antd';
import {
    CheckCircleOutlined,
    DeleteFilled
} from '@ant-design/icons';


function MyProfile() {


    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);


    const [formValid, setFormValid] = useState(false);

    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()


    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 18,
        },
    };

    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
            style: {
                textAlign: 'right',
            },
        },
    };



    const formRef = React.useRef(null);


    const onReset = () => {
        formRef.current?.resetFields();
    };

    const onFinish = async () => {
        try {
            await formRef.current?.validateFields();
            setFormValid(true);
        } catch (error) {
            setFormValid(false);
        }
    };



    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        changeUserDetails(formRef.current.getFieldValue("Name"), formRef.current.getFieldValue("Email"))
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
        notification.open({
            message: 'Your Profile is Updated',
            description: '',
            placement: 'topRight',
            icon: <CheckCircleOutlined />
        });
    };


    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };


    const [changePassOpen, setChangePassOpen] = useState(false);
    const [changePassLoading, setChangePassLoading] = useState(false);

    const showChangePassModal = () => {
        setChangePassOpen(true);
    };

    const handleChangePassOk = () => {
        changePassword(formRef.current.getFieldValue("currentPassword"), formRef.current.getFieldValue("newPassword"), formRef.current.getFieldValue("confirmPassword"))
        setChangePassLoading(true);
        setChangePassOpen(false);
        setChangePassLoading(false);

        if (formRef.current.getFieldValue("newPassword") == formRef.current.getFieldValue("confirmPassword")) {
            notification.open({
                message: 'Password Changed',
                description: '',
                placement: 'topRight',
                icon: <CheckCircleOutlined />
            });
        }
        else {
            Swal.fire('Oops!', 'Password not match', 'error')

        }

    };

    const handleChangePassCancel = () => {
        setChangePassOpen(false);
    };



    const user = JSON.parse(localStorage.getItem("currentUser"))


    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("currentUser"))

        if (!user) {
            window.location.href = "/login"
        }

    }, [])

    async function changeUserDetails(name, email) {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"))
        if (!currentUser) throw new Error('User not found in local storage');

        const _id = currentUser._id;
        try {
            const res = (await axios.patch('/api/users/edituser', { _id, name, email })).data;
            console.log("User details updated successfully");

            localStorage.setItem("currentUser", JSON.stringify({
                _id: currentUser._id,
                name: name ? name : currentUser.name,
                email: email ? email : currentUser.email,
                isAdmin: currentUser.isAdmin
            }));


        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }



    async function changePassword(currentPassword, newPassword, confirmPassword) {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"))
        if (!currentUser) throw new Error('User not found in local storage');

        const _id = currentUser._id;
        if (newPassword !== confirmPassword) {
            throw new Error('New password and confirm password do not match');

        }

        try {
            const res = (await axios.patch('/api/users/changepassword', { _id, currentPassword, newPassword })).data;
            console.log("Password updated successfully");
        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }

    async function deleteUser(_id) {


        try {
            const res = (await axios.patch('/api/users/deleteuser', { _id })).data;
            console.log("User Deleted Successfully");
        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }




    return (
        <div className='row'>
            <div className='col-md-6'>
                <div className='bs '>
                    <h1 className='text-center mt-1 '>My Profile</h1>
                    <br />
                    <h1>Name : {user.name}</h1>
                    <h1>Email : {user.email}</h1>
                    <br />
                    <h1>Profile Status : {user.isAdmin ? <Tag color="red">ADMIN</Tag> : <Tag color="green">USER</Tag>} </h1>

                    <div className="button-container">
                        <button className='btn2 m-3 ' onClick={showModal} >Edit Details</button>
                        <button className='btn2 ' onClick={showChangePassModal}>Change Password</button>


                        <Modal
                            title="Edit Details"
                            open={open}
                            onOk={handleOk}
                            confirmLoading={confirmLoading}
                            onCancel={handleCancel}
                        >
                            <Form ref={formRef} name="control-ref" onFinish={(values) => changeUserDetails(values.Name, values.Email)}
                                size='large'
                                initialValues={{ Name: user.name, Email: user.email }}>
                                <Form.Item
                                    name="Name"
                                    label="Name"
                                >
                                    <Input placeholder={user.name} />
                                </Form.Item>
                                <Form.Item
                                    name="Email"
                                    label="Email"
                                >
                                    <Input placeholder={user.email} />
                                </Form.Item>
                            </Form>
                        </Modal>


                        <Modal
                            title="Change Password"
                            open={changePassOpen}
                            onOk={handleChangePassOk}
                            confirmLoading={changePassLoading}
                            onCancel={handleChangePassCancel}
                        >
                            <Form ref={formRef} name="control-ref" onFinish={() => handleChangePassOk()} size='large'>
                                <Form.Item
                                    wrapperCol={{
                                        offset: 0,
                                        span: 16,
                                    }}
                                    name="currentPassword"
                                    label="Current Password"
                                    rules={[{ required: true, message: 'Please input your current password!' }]}
                                >
                                    <Input.Password placeholder="  Current Password" className="no-border" />
                                </Form.Item>
                                <Form.Item
                                    wrapperCol={{
                                        offset: 1,
                                        span: 16,
                                    }}
                                    name="newPassword"
                                    label="New Password"
                                    rules={[{ required: true, message: 'Please input your new Password!' }]}
                                >
                                    <Input.Password placeholder="  New Password" className="no-border" />
                                </Form.Item>
                                <Form.Item
                                    wrapperCol={{
                                        offset: 0,
                                        span: 16,
                                    }}
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    rules={[{ required: true, message: 'Please confirm  Password!' }]}
                                >
                                    <Input.Password placeholder="  Confirm Password" className="no-border" />
                                </Form.Item>

                                <Form.Item  {...tailLayout}
                                    className="text-center"
                                    wrapperCol={{
                                        offset: 6,
                                        span: 16,
                                    }}
                                >

                                    <button className='adelete2' type="primary" onClick={onReset} >
                                        Reset
                                    </button>
                                </Form.Item>


                            </Form>
                        </Modal>

                    </div>

                    <FloatButton
                    tooltip={<div>Delete User</div>}
                    shape="circle"
                    type="primary"
                    style={{ left: 700, top: 180 }}
                    icon={<DeleteFilled style={{ color: 'white' }} onClick={() => {
                        Swal.fire({
                            title: 'Are you sure?',
                            text: "You won't be able to revert this!",
                            icon: 'warning',
                            showCancelButton: true,
                            cancelButtonText: 'Cancel',
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, delete User!'
                        }).then((result) => {
                            if (result.isConfirmed) {

                                deleteUser(user._id)
                                Swal.fire(
                                    'Deleted!',
                                    'User has been deleted.',
                                    'success'
                                )
                                .then(result => {
                                    localStorage.clear();
                                    window.location.href = '/login'
                                })
                            }
                        })
                    }} />}
                />

                </div>

            </div>

           

            
        </div>


    )



}

export default MyProfile



