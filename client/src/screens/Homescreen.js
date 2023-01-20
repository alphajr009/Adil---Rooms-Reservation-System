import React, { useState, useEffect } from 'react'
import { DatePicker, Space } from 'antd';
import moment from 'moment'
import axios from 'axios'
import Room from '../components/Room'
import Loader from '../components/Loader'
import Error from '../components/Error'
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();


function Homescreen() {

  const [rooms, setrooms] = useState([])
  const [loading, setloading] = useState()
  const [error, seterror] = useState()
  const { RangePicker } = DatePicker;

  const [fromdate, setfromdate] = useState()
  const [todate, settodate] = useState()
  const [duplicaterooms, setduplicaterooms] = useState([])

  const [searchkey, setsearchkey] = useState('')
  const [type, settype] = useState('all')



  function clearRange() {
    window.location.assign('/home');
  }


  useEffect(() => {

    (async () => {

      try {
        setloading(true)
        const data = (await axios.get("/api/rooms/getallrooms")).data

        setrooms(data.rooms)
        setduplicaterooms(data.rooms)
        setloading(false)


      } catch (error) {
        seterror(true)
        console.log(error)
        setloading(false)

      }
    })();
  }, []);

  function filterByDate(dates) {
    const dateFrom = new Date(dates[0]);
    const dateTo = new Date(dates[1]);
    setfromdate(moment(dateFrom).format('DD-MM-YYYY'))
    settodate(moment(dateTo).format('DD-MM-YYYY'))

    var temprooms = []

    for (const room of duplicaterooms) {
      var availability = true;

      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {

          const start = moment(booking.fromdate, 'DD-MM-YYYY');
          const end = moment(booking.todate, 'DD-MM-YYYY');

          if (moment(dateFrom).isBetween(start, end) ||
            moment(dateTo).isBetween(start, end)

            ||
            (moment(start).isBetween(dateFrom, dateTo) ||
              moment(end).isBetween(dateFrom, dateTo))

            ||
            (
              moment(dateFrom).isSame(start) &&
              moment(dateTo).isSame(end)
            )
            ||
            (
              moment(dateFrom).isSameOrAfter(start) &&
              moment(dateTo).isSameOrBefore(end))
          ) {
            availability = false;
            break;
          }
        }
      }
      if (availability) {
        temprooms.push(room)
      }
    }
    setrooms(temprooms)
  }

  function filterBySearch() {

    const temprooms = duplicaterooms.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase()))

    setrooms(temprooms)
  }


  function filterByType(e) {
    settype(e)

    if (e !== 'all') {
      const temprooms = duplicaterooms.filter(room => room.type.toLowerCase() == e.toLowerCase())
      setrooms(temprooms)
    }
    else {
      setrooms(duplicaterooms)
    }


  }


  return (
    <div className='container'>

      <div className='row mt-5 d-flex align-items-center bs'>
        <div className='col-md-3'>
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate} onCalendarChange={(dates) => !dates ? clearRange() : null} />
        </div>
        <div className='col-md-5'>
          <input type="text" className="form-control" placeholder='Search Rooms'
            value={searchkey} onChange={(e) => { setsearchkey(e.target.value) }} onKeyUp={filterBySearch} />
        </div>

        <div className='col-md-4'>
          <select className='form-control' value={type} onChange={(e) => { filterByType(e.target.value) }}>
            <option value="all" className='formho'>All</option>
            <option value="delux" className='formho'> Delux</option>
            <option value="non-delux" className='formho'>Non-Delux</option>
          </select>
        </div>
      </div>


      <div className='row justify-content-center mt-5'>
        {loading ? (<Loader />) : (rooms.map(room => {

          return <div className='col-md-9 mt-2' data-aos="fade-up" data-aos-duration="1000">
            <Room room={room} fromdate={fromdate} todate={todate} />

          </div>;

        }))}

      </div>
    </div>
  )
}

export default Homescreen






