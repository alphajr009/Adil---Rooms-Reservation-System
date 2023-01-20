import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams  } from 'react-router-dom'
import Loader from '../components/Loader'
import Error from '../components/Error'
import moment from 'moment'
import StripeCheckout from 'react-stripe-checkout'
import Swal from 'sweetalert2'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { duration } from 'moment';
// ..
AOS.init(
);

function Bookingscreen({ match }) {

    let params = useParams();
    console.log(params.fromdate);
    console.log(params.todate);

    const [loading, setloading] = useState(true)
    const [room, setroom] = useState()
    const [error, seterror] = useState()

    const roomid = params.roomid

    let fromdate = moment(params.fromdate, 'DD-MM-YYYY')
    let todate = moment(params.todate, 'DD-MM-YYYY')


    const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1;
    const [totalamount, settotalamount] = useState()


    useEffect(() => {

        (async () => {

            if(!localStorage.getItem('currentUser')){
                window.location.reload = '/login'

            }


            try {
                setloading(true)

                const data = (await axios.post("/api/rooms/getroombyid", { roomid: params.roomid })).data
                settotalamount(data.room.rentperday * totaldays)

                setroom(data.room)
                setloading(false)

            } catch (error) {
                setloading(false)
                seterror(true)

            }
        })();
    }, []);


    async function onToken(token) {

        console.log(token)
        const bookingDetails = {
            room,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            fromdate,
            todate,
            totalamount,
            totaldays,
            token
        }

        try {
            setloading(true);
            const result = await axios.post('/api/bookings/bookroom', bookingDetails)
            setloading(false);
            Swal.fire('Congratulations!', 'Your Room Booked Successfully', 'success').then(result => {
                window.location.href = '/profile'
            })
        } catch (error) {
            setloading(false)
            Swal.fire('Oops!', 'Something Went wrong', 'error')
        }
    }


    return (
        <div className='m-5' data-aos='flip-left' data-aos-duration="1000">

            {loading ? (<Loader />) : room ? (<div>
                <div className='row justify-content-center mt-5 bs'>
                    <div className='col-md-6'>
                        <h1>{room.name}</h1>
                        <img src={room.imageurls[0]} className='bigimg' />
                    </div>
                    <div className='col-md-6'>

                        <div style={{ textAlign: 'right' }}>
                            <h1>Booking Details</h1>
                            <hr />
                            <b>
                                <p>Name : {JSON.parse(localStorage.getItem('currentUser')).name} </p>
                                <p>From Date : {params.fromdate}</p>
                                <p>To Date : {params.todate}</p>
                                <p>Max Count : {room.maxcount}</p>
                            </b>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <b>
                                <h1>Amount</h1>
                                <hr />
                                <p>Total Days : {totaldays}</p>
                                <p>Rent per day :{room.rentperday}</p>
                                <p>Total Amount : Rs.{totalamount} </p>
                            </b>
                        </div>
                        <div style={{ float: 'right' }}>


                            <StripeCheckout
                                amount={totalamount * 100}
                                token={onToken}
                                currency='LKR'
                                stripeKey="pk_test_51MPGi4CtZNkPMxHGfgC8RkiVKXgM8JBdbe77y2ucY7hYVGjykSGuAMyM9GGDjJ5dH3FvxLLReGnAkq7GZ0fKQ2Zp00rX43d9DM"
                            >
                                <button className="btn " >Pay Now</button>
                            </StripeCheckout>
                        </div>
                    </div>
                </div>
            </div>) : (<Error />)}
        </div>
    );
}


export default Bookingscreen;



