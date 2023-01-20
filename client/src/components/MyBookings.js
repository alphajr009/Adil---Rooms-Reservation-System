import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'
import Swal from 'sweetalert2'
import { Tag } from 'antd';
import jsPDF from 'jspdf'
import qrcode from 'qrcode';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Divider, Radio, Space } from 'antd';

const { TabPane } = Tabs

function MyBookings() {

    const user = JSON.parse(localStorage.getItem("currentUser"))
    const [bookings, setBookings] = useState([])
    const [cancelledBookings, setCancelledBookings] = useState([])

    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()
    const [size, setSize] = useState('large');


    useEffect(() => {
        (async () => {

            try {
                setloading(true)
                const data = (await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id })).data
                setloading(false)
                const confirmedBookings = data.filter(booking => booking.status === 'booked');
                const cancelledBookings = data.filter(booking => booking.status === 'cancelled');
                setBookings(confirmedBookings)
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
            setloading(true)
            const result = (await axios.post('/api/bookings/cancelbooking', { bookingid, roomid })).data
            console.log(result)
            setloading(false)

        } catch (error) {
            console.log(error)
            setloading(false)
            Swal.fire('OOps ', 'Something went wrong', 'error')

        }
    }


    async function downloadReceipt(booking) {

        const currentUser = JSON.parse(localStorage.getItem("currentUser"))
        const qrCodeUrl = await qrcode.toDataURL(`${booking._id}`);
        var imgData = 'https://i.imgur.com/WVhdC6g.png';

        const doc = new jsPDF();

        doc.addImage(imgData, 'PNG', 0, 0, 215, 300);
        doc.addImage(qrCodeUrl, 'PNG', 170, 196,38, 38);




        doc.setFont("helvetica")
        doc.setFontSize(17);
        doc.text(`${booking._id}`, 52, 85);
        doc.text(`${booking._id}`, 52, 85);

        doc.setFontSize(17);
        doc.text(`${currentUser.name}`, 52.5, 96.7);
        doc.text(`${currentUser.name}`, 52.5, 96.7);
        
        doc.setFont("helvetica")
        doc.setFontSize(14);
        doc.text(`${booking.room}`, 49, 115.5);
        doc.text(`${booking.fromdate}`, 49, 126.5);
        doc.text(`${booking.todate}`, 49.7, 137.5);
        doc.text(`0${booking.totaldays}`, 50, 148.7);
        doc.text(`Rs. ${booking.totalamount}/-`, 50, 159.6);
        





        doc.save(`Invoice_${booking._id}.pdf`);
    }



    return (
        <div>
            <div className='row'>
                <Tabs defaultActiveKey="1" size='large'  >
                    <TabPane tab="Confirmed" key='1'>
                        <div className='col-md-6'>

                            {loading && (<Loader />)}
                            {bookings && (bookings.map(booking => {

                                return <div className='bs'>

                                    <h1 className='bh1'> {booking.room}</h1>
                                    <br />
                                    <p className='pid1'>Booking ID : {booking._id}</p>
                                    <p className='pbook'><b>Checking Date :</b> {booking.fromdate}</p>
                                    <p className='pbook'><b>Checkout Date :</b> {booking.todate}</p>
                                    <p className='pbook'><b>Amount :</b> Rs. {booking.totalamount}</p>
                                    <p className='pbook'><b>Status :</b> {booking.status == 'cancelled' ? <Tag color="red">CANCELLED</Tag> : <Tag color="green">CONFIRMED</Tag>}</p>



                                    <div className="button-container">

                                        <Button type="primary" icon={<DownloadOutlined />} size={'middle'} onClick={() => downloadReceipt(booking)}>
                                            Download
                                        </Button>

                                        <Divider type="vertical" />

                                        <button className='adelete1' onClick={() => {
                                            Swal.fire({
                                                title: 'Are you sure?',
                                                text: "You won't be able to revert this!",
                                                icon: 'warning',
                                                showCancelButton: true,
                                                cancelButtonText: 'No',
                                                confirmButtonColor: '#3085d6',
                                                cancelButtonColor: '#d33',
                                                confirmButtonText: 'Yes, cancel it!'
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    cancelBooking(booking._id, booking.roomid)
                                                    Swal.fire(
                                                        'Cancelled!',
                                                        'Your booking has been cancelled.',
                                                        'success'
                                                    ).then(result => {
                                                        window.location.reload();
                                                    })

                                                }
                                            })
                                        }}>CANCEL BOOKING</button>

                                    </div>


                                </div>
                            }))}

                        </div>

                    </TabPane>

                    <TabPane tab="Cancelled" key='2'>
                        <div className='col-md-6'>

                            {loading && (<Loader />)}
                            {bookings && (cancelledBookings.map(booking => {

                                return <div className='bs'>

                                    <h1 className='bh1'> {booking.room}</h1>
                                    <br />
                                    <p className='pid1'>Booking ID : {booking._id}</p>
                                    <p className='pbook'><b>Checking Date :</b> {booking.fromdate}</p>
                                    <p className='pbook'><b>Checkout Date :</b> {booking.todate}</p>
                                    <p className='pbook'><b>Amount :</b> Rs. {booking.totalamount}</p>
                                    <p className='pbook'><b>Status :</b> {booking.status == 'cancelled' ? <Tag color="red">CANCELLED</Tag> : <Tag color="green">CONFIRMED</Tag>}</p>

                                </div>
                            }))}
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default MyBookings