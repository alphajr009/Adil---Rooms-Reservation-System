import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader'
import Error from '../components/Error'
import { Space, Table, Tag, Button, Form, Input, Select } from 'antd';
import Swal from 'sweetalert2'
import Home from '../Dashboard/Home';
import Reservations from '../Dashboard/Reservations';
import Property from '../Dashboard/Property';
import Marketing from '../Dashboard/Marketing';
import Performance from '../Dashboard/Performance';
import Blog from '../Dashboard/Blog';

const { TabPane } = Tabs

function Dashboard() {
  return (
    <div className='m-3 ml-3 bs'>
    <h1 className='text-center '>Seller Central</h1>
    <Tabs defaultActiveKey="1" size='large'  >
        <TabPane tab="Home" key='1'>
            <Home />
        </TabPane>

        <TabPane tab="Reservations" key='2' size='large'>
            <Reservations />
        </TabPane>

        <TabPane tab="Property" key='3' size='large'>
            < Property/>
        </TabPane>

        <TabPane tab="Blog" key='4' size='large'>
            <Blog />
        </TabPane>

        <TabPane tab="Marketing" key='5' size='large'>
            <Marketing />
        </TabPane>


        <TabPane tab="Perfomance" key='6' size='large'>
            <Performance />
        </TabPane>

    </Tabs>
</div>
  )
}

export default Dashboard