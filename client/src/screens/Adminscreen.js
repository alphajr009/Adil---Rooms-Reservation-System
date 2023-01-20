import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader'
import Error from '../components/Error'
import Bookings from '../components/Bookings'
import Rooms from '../components/Rooms'
import Users from '../components/Users'
import Addroom from '../components/Addroom'
import { Space, Table, Tag, Button, Form, Input, Select } from 'antd';
import Swal from 'sweetalert2'

const { TabPane } = Tabs

function Adminscreen() {

    useEffect(() => {

        if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
            window.location.href = "/home"
        }
    }, []);





    return (
        <div className='m-3 ml-3 bs'>
            <h1 className='text-center '>Admin Panel</h1>
            <Tabs defaultActiveKey="1" size='large'  >
                <TabPane tab="Bookings" key='1'>
                    <Bookings />
                </TabPane>

                <TabPane tab="Rooms" key='2' size='large'>
                    <Rooms />
                </TabPane>

                <TabPane tab="Add Rooms" key='3' size='large'>
                    <Addroom />
                </TabPane>

                <TabPane tab="Users" key='4' size='large'>
                    <Users />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Adminscreen;

