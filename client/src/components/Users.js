import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../components/Loader'
import Error from '../components/Error'
import { Space, Table, Tag, Button, Form, Input, Select } from 'antd';
import Swal from 'sweetalert2'


function Users() {

    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()

    const [users, setusers] = useState([])
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    const columns = [
        {
            title: 'User ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Name ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'isAdmin',
            dataIndex: 'isAdmin',
            key: 'isAdmin',
            render: (_, users) => {
                if (users.isAdmin) {
                    return <Tag color="blue">YES</Tag>
                } else {
                    return <Tag color="green">NO</Tag>
                }
            }
        },
        {
            title: 'Admin Access',
            dataIndex: '',
            width: '7%',
            key: 'x',
            render: (_, users) => {
                if (users.isAdmin) {
                    return <button disabled className='aupdate'>Update</button>
                } else {
                    return <button className='aupdate' onClick={() => {
                        Swal.fire({
                            title: 'Confirm making this user an Admin?',
                            icon: 'question',
                            showCancelButton: true,
                            cancelButtonText: 'Cancel',
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, do it!'
                        })
                            .then((result) => {
                                if (result.isConfirmed) {

                                    updateAdmin(users._id, true)
                                    Swal.fire(
                                        'Updated!',
                                        `${users.name} is now an Admin`,
                                        'success'
                                    )
                                        .then(result => {
                                            window.location.reload();
                                        })
                                }
                            })
                    }}>Update</button>
                }
            }
        },
        {
            title: 'Action',
            dataIndex: '',
            width: '7%',
            key: 'x',
            render: (_, users) => {

                if (currentUser._id === users._id) {
                    return <button disabled className='nodelete'>Delete</button>
                }
                else{
                    return <button className='adelete' onClick={() => {

               


                        Swal.fire({
                            title: 'Are you sure?',
                            text: "You won't be able to revert this!",
                            icon: 'warning',
                            showCancelButton: true,
                            cancelButtonText: 'Cancel',
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, delete User!'
                        }).then((result) => {
                            if (result.isConfirmed) {
    
                                deleteUser(users._id)
                                Swal.fire(
                                    'Deleted!',
                                    'User has been deleted.',
                                    'success'
                                ).then(result => {
                                    window.location.reload();
                                })
                            }
                        })
                    }}>Delete</button>
                }

       
            }
        },
    ];



    useEffect(() => {
        (async () => {

            try {
                setloading(true)
                const data = (await axios.get("/api/users/getallusers")).data
                setusers(data.users)
                setloading(false)



            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(error)

            }
        })();
    }, []);


    async function updateAdmin(_id, isAdmin) {


        try {
            const res = (await axios.patch('/api/users/changeadmin', { _id, isAdmin })).data;
            console.log("Admin update Successfully");
        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }



    async function deleteUser(_id) {


        try {
            const res = (await axios.patch('/api/users/deleteuser', { _id })).data;
            console.log("User Deleted Successfully");
        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }





    return (

        <div className='row'>
            {loading && (<Loader />)}
            <div className='col-md-12'>
                <h1>Users</h1>
                <Table bordered={true} dataSource={users} columns={columns}
                    pagination={{ pageSize: 15 }}
                    footer={() => <div className="footer-number">{`Total ${users.length} items`}</div>} />
            </div>
        </div>
    )
}


export default Users