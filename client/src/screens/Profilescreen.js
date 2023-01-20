import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'
import MyBookings from '../components/MyBookings';
import MyProfile from '../components/MyProfile';
import Swal from 'sweetalert2'
import { Tag } from 'antd';


const { TabPane } = Tabs

function Profilescreen() {

    const user = JSON.parse(localStorage.getItem("currentUser"))

    useEffect(() => {


        if (!user) {
            window.location.href = "/login"
        }

    }, [])

    const onChange = (key: string) => {
        console.log(key);
    };

    return (
        <div className='m-3 mt-3'>
            <Tabs defaultActiveKey="2" onChange={onChange} >
                <TabPane tab="Profile" key='1'>
                    <MyProfile />
                </TabPane>

                <TabPane tab="Bookings" key='2'>
                    <MyBookings />
                </TabPane>
            </Tabs>
        </div>
    )
}



export default Profilescreen












