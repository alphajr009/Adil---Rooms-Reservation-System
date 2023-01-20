import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../components/Loader'
import Error from '../components/Error'
import { Space, Table, Tag, Button, Form, Input, Select } from 'antd';
import Swal from 'sweetalert2'


function Rooms() {

    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()

    const [rooms, setrooms] = useState([])

    const columns = [
        {
            title: 'Room ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Name ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Phone number',
            dataIndex: 'phonenumber',
            key: 'phonenumber',
        },
        {
            title: 'Rent per day',
            dataIndex: 'rentperday',
            key: 'rentperday',
        },
        {
            title: 'Max Count',
            dataIndex: 'maxcount',
            key: 'maxcount',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Action',
            dataIndex: '',
            width: '7%',
            key: 'x',
            render: (_, rooms) => {

                return <button className='adelete' onClick={() => {
                    Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        cancelButtonText: 'Cancel',
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete Room!'
                    }).then((result) => {
                        if (result.isConfirmed) {

                            deleteRoom(rooms._id)
                            Swal.fire(
                                'Deleted!',
                                'User has been deleted.',
                                'success'
                            )
                                .then(result => {
                                    window.location.reload();
                                })
                        }
                    })
                }}>Delete</button>
            }
        },
    ];


    useEffect(() => {
        (async () => {

            try {
                setloading(true)
                const data = (await axios.get("/api/rooms/getallrooms")).data
                setrooms(data.rooms)
                setloading(false)



            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(error)

            }
        })();
    }, []);

    async function deleteRoom(_id) {


        try {
            const res = (await axios.patch('/api/rooms/deleteroom', { _id })).data;
            console.log("Room Deleted Successfully");
        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }



    return (

        <div className='row'>
            {loading && (<Loader />)}
            <div className='col-md-12'>
                <h1>Rooms</h1>
                <Table bordered={true} dataSource={rooms} columns={columns}
                    pagination={{ pageSize: 15 }}
                    footer={() => <div className="footer-number">{`Total ${rooms.length} items`}</div>} />
            </div>
        </div>
    )
}

export default Rooms