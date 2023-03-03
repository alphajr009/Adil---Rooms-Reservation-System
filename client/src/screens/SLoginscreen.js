import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'

function Loginscreen() {

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()

    async function Login() {

        const user = {
            email,
            password,
        }
        try {
            setloading(true)
            const { data, status } = await axios.post('/api/sellers/slogin', user)
            setloading(false)

            if (status === 200) {
                localStorage.setItem('currentUser', JSON.stringify(data));
                window.location.href = '/dashboard'
            } else {
                seterror(true);
            }
        } catch (error) {
            console.log(error)
            setloading(false)
            seterror(true)
        }
    }

    return (
        <div>
            {loading && (<Loader />)}
            <div className="row justify-content-center mt-5">
                <div className='col-md-5 '>
                    {error && (<Error message='Invalid Credentials' />)}
                    <div className='bs'>
                        <h1 className='bigh'> Seller Login</h1>
                        <input type="text" className="form-control" placeholder='Email'
                            value={email} onChange={(e) => { setemail(e.target.value) }} />
                        <input type="text" className="form-control" placeholder='Password'
                            value={password} onChange={(e) => { setpassword(e.target.value) }} />
                    </div>

                    <button className='btn btn-primary mt-3' onClick={Login}>Login</button>

                    <div className="mt-5">
                        <p className="mb-0 text-muted">Not registered yet? Click here to <a className='alha' href="/sregister">Register</a></p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Loginscreen  