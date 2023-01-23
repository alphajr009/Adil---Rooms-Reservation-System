import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'
import Warning from '../components/Warning'
import Modal from 'react-bootstrap/Modal';
import { Button, Result } from 'antd';
import Swal from 'sweetalert2'
import validator from 'password-validator';

function Registerscreen() {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [cpassword, setcpassword] = useState('')

  const [loading, setloading] = useState(false)
  const [error, seterror] = useState()
  const [success, setsuccess] = useState()
  const [warning, setwarning] = useState()

  async function register() {

    const passwordSchema = new validator(); //check password is strong or not
    passwordSchema
      .is().min(8)                     //minimum length 8   characters             
      .is().max(100)                   //maximum length 100 characters            
      .has().uppercase()               //must have uppercase letters             
      .has().lowercase()               //must have lowercase letters           
      .has().digits()                  //must have digits       
      .has().not().spaces()            //should not have spaces       


    if (!passwordSchema.validate(password)) {
      Swal.fire(
        'Oops!',
        ' Password is not strong',
        'error'
      )
      return;
    }



    if (password == cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword
      }
      try {
        setloading(true);
        const result = await axios.post('/api/users/register', user).data;

        setloading(false)
        Swal.fire({
          title: "Registration successful!",
          text: "Click here to ",
          icon: 'success',
          // showCancelButton: true,
          confirmButtonColor: '#3085d6',
          // cancelButtonColor: '#d33',
          confirmButtonText: 'Login'
        }).then(result => {
          window.location.href = '/login'
        })


        setTimeout(() => {
          setwarning(false)
        }, 0);

        setname('')
        setemail('')
        setpassword('')
        setcpassword('')


      } catch (error) {
        console.log(error)
        setloading(false);
        seterror(true)
      }

    }
    else {
      setwarning(true)
    }

  }


  return (
    <div>
      {error && (<Error />)}

      <div className="row justify-content-center mt-5">
        <div className='col-md-5'>
          {loading && (<Loader />)}

          {warning && (<Warning message='Password does not match.' />)}

          <div className='bs'>
            <h1 className='bigh'>Register</h1>
            <input type="text" className="form-control" placeholder='Name'
              value={name} onChange={(e) => { setname(e.target.value) }} />
            <input type="text" className="form-control" placeholder='Email'
              value={email} onChange={(e) => { setemail(e.target.value) }} />
            <input type="password" className="form-control" placeholder='Password'
              value={password} onChange={(e) => { setpassword(e.target.value) }} />
            <input type="password" className="form-control" placeholder='Confirm Password'
              value={cpassword} onChange={(e) => { setcpassword(e.target.value) }} />
          </div>

          <button className='btn btn-primary mt-3' onClick={register}>Register</button>
          <div className="mt-5">
            <p className="mb-0 text-muted">Already have an account?    <a className='alha' href="/login">Login</a></p>
          </div>
        </div>
      </div>



    </div>
  )
}

export default Registerscreen
