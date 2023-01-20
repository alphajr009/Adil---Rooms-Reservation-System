import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../components/Loader'
import Error from '../components/Error'
import { Tabs, Space, Table, Tag, Button, Form, Input, Select } from 'antd';
import Swal from 'sweetalert2'

function Bookings() {

    const { TabPane } = Tabs

    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()

    const [bookings, setbookings] = useState([])
    const [booking, setBookings] = useState([])
    const [cancelledBookings, setCancelledBookings] = useState([])

    const columns = [
        {
            title: 'Booking ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'User ID',
            dataIndex: 'userid',
            key: 'userid',
        },
        {
            title: 'Room',
            dataIndex: 'room',
            key: 'room',
        },
        {
            title: 'From',
            dataIndex: 'fromdate',
            key: 'fromdate',
        },
        {
            title: 'To',
            dataIndex: 'todate',
            key: 'todate',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, booking) => {
                if (booking.status === 'cancelled') {
                    return <Tag color="red">CANCELLED</Tag>
                } else {
                    return <Tag color="green">CONFIRMED</Tag>
                }
            }
        }
        ,
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (_, booking) => {
                if (booking.status === 'cancelled') {
                    return <button disabled className='nodelete'>Delete</button>
                } else {
                    return <button className='adelete' onClick={() => {
                        Swal.fire({
                            title: 'Are you sure?',
                            text: "You won't be able to revert this!",
                            icon: 'warning',
                            showCancelButton: true,
                            cancelButtonText: 'Cancel',
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, delete it!'
                        }).then((result) => {
                            if (result.isConfirmed) {

                                cancelBooking(booking._id, booking.roomid)
                                Swal.fire(
                                    'Deleted!',
                                    'Your booking has been deleted.',
                                    'success'
                                ).then(result => {
                                    window.location.reload();
                                })
                            }
                        })
                    }}>Cancel</button>
                }
            }
        },
    ];


    useEffect(() => {
        (async () => {

            try {
                setloading(true)
                const data = (await axios.post('/api/bookings/getallbookings')).data
                setloading(false)
                const confirmedBookings = data.filter(booking => booking.status === 'booked');
                const cancelledBookings = data.filter(booking => booking.status === 'cancelled');
                setbookings(confirmedBookings);
                setCancelledBookings(cancelledBookings);


            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(error)

            }
        })();
    }, []);



    async function cancelBooking(bookingid, roomid) {
        try {
            const res = (await axios.post('/api/bookings/cancelbooking', { bookingid, roomid })).data
            console.log("Server response: ", res);
            if (res.status === 200) {
                console.log("Booking Cancelled Successfully");
                Swal.fire({
                    title: 'Success!',
                    text: 'Your booking has been deleted.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.log("Error canceling booking: ", error);
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while canceling the booking. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }


    return (

        <div className='row'>
            {loading && (<Loader />)}
            <div className='col-md-12'>
                <h1>Bookings</h1>
                <Tabs defaultActiveKey="1" size='large'  >
                    <TabPane tab="Confirmed" key='1'>

                        <Table bordered={true} dataSource={bookings} columns={columns}
                            pagination={{ pageSize: 15 }}
                            footer={() => <div className="footer-number">{`Total ${bookings.length} items`}</div>} />
                    </TabPane>

                    <TabPane tab="Cancelled" key="2">
                        {cancelledBookings.filter(booking => booking.status === 'cancelled').length > 0 ?
                            <Table dataSource={cancelledBookings}
                                columns={columns.filter(column => column.title !== 'Action')}
                                footer={() => <div className="footer-number">{`Total ${cancelledBookings.length} items`}</div>}
                                pagination={{ pageSize: 15 }} />
                            : <h3>No Cancelled bookings</h3>}
                    </TabPane>

                </Tabs>


            </div>
        </div>
    )
}

export default Bookings