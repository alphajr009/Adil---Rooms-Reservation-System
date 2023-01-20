import React from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { duration } from 'moment';
// ..
AOS.init(
);

function Landingscreen() {
  return (
    <div className='row landing'  data-aos="zoom-out" data-aos-duration="1100">

        <div className='col-md-12 text-center mt-5 '>
            <h2 data-aos ='zoom-in' data-aos-duration="1200" style={{color:'white' , fontSize:'130px' ,fontWeight:'normal', fontFamily:'cursive'}}>AdilRooms</h2>
            <h1 data-aos ='zoom-out' data-aos-duration="1000" className='mt-5' style={{color:'white'}} >"More Destinations. More Ease. More Affordable."</h1>

            <Link to = '/home' > <button className='btnlan' style={{color : 'black' , backgroundColor:'white'}}>Get Started</button></Link>
            
        </div>

    </div>
  )
}

export default Landingscreen