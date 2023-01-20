import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../components/Loader'
import Error from '../components/Error'
import { Space, Table, Tag, Button, Form, Input, Select } from 'antd';
import Swal from 'sweetalert2'


function Addroom() {

    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()

    const [formValid, setFormValid] = useState(false);


    const [name, setname] = useState('')
    const [rentperday, setrentperday] = useState()
    const [maxcount, setmaxcount] = useState()
    const [description, setdescription] = useState()
    const [type, settype] = useState()
    const [phonenumber, setphonenumber] = useState()
    const [imageurl1, setimageurl1] = useState()
    const [imageurl2, setimageurl2] = useState()
    const [imageurl3, setimageurl3] = useState()



    const { Option } = Select;
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    const formRef = React.useRef(null);


    const onReset = () => {
        formRef.current?.resetFields();
    };

    const onFinish = async () => {
        try {
          await formRef.current?.validateFields();
          setFormValid(true);
        } catch (error) {
          setFormValid(false);
        }
      };




    async function addRoom() {

        const newroom = {
            name,
            rentperday,
            maxcount,
            description,
            phonenumber,
            type,
            imageurls: [imageurl1, imageurl2, imageurl3]
        }


        console.log(newroom)

        try {
            setloading(true)
            const result = (await axios.post('/api/rooms/addroom', newroom)).data
            console.log(result)
            setloading(false)


        } catch (error) {
            console.log(error)
            setloading(false)

        }
    }




    return (

        <div className="row justify-content-center mt-3">
            <h1 className="row justify-content-center mb-2">Add Room</h1>

            <Form className="row justify-content-center mt-3" {...layout} ref={formRef} name="control-ref" onFinish={onFinish}>

                <div className='col-md-5 '>

                    <Form.Item

                        name="Title"
                        label="Title"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input value={name} onChange={(e) => { setname(e.target.value) }} placeholder="Title of the Room" />
                    </Form.Item>

                    <Form.Item

                        name="Rent per  day"
                        label="Rent per day"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input value={rentperday} onChange={(e) => { setrentperday(e.target.value) }} placeholder="Title of the Room" />
                    </Form.Item>

                    <Form.Item

                        name="Max Count"
                        label="Max Count"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input value={maxcount} onChange={(e) => { setmaxcount(e.target.value) }} placeholder="Max Count " />
                    </Form.Item>

                    <Form.Item

                        name="Phone Number"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input value={phonenumber} onChange={(e) => { setphonenumber(e.target.value) }} placeholder="Phone Number" />
                    </Form.Item>


                    <Form.Item
                        name="Description"
                        label="Description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Description',
                            },
                        ]}
                    >
                        <Input.TextArea value={description} onChange={(e) => { setdescription(e.target.value) }} style={{ height: "150px" }} showCount maxLength={500} />
                    </Form.Item>

                </div>



                <div className='col-md-5 '>

                    <Form.Item
                        name="type"
                        label="Type"
                        rules={[
                            {
                                required: true,
                                message: 'Please select the Type!',
                            },
                        ]}
                    >
                        <Select value={type} onChange={(value) => { settype(value) }} placeholder="Select the Type">
                            <Option value='Delux' >Delux</Option>
                            <Option value='Non-Delux' >Non-Delux</Option>

                        </Select>
                    </Form.Item>

                    <Form.Item

                        name="Image URL 1"
                        label="Image URL 1"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input value={imageurl1} onChange={(e) => { setimageurl1(e.target.value) }} placeholder="Image URL 1 " />
                    </Form.Item>

                    <Form.Item

                        name="Image URL 2"
                        label="Image URL 2"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input value={imageurl2} onChange={(e) => { setimageurl2(e.target.value) }} placeholder="Image URL 2 " />
                    </Form.Item>


                    <Form.Item

                        name="Image URL 3"
                        label="Image URL 3"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input value={imageurl3} onChange={(e) => { setimageurl3(e.target.value) }} placeholder="Image URL 3 " />
                    </Form.Item>




                    <Form.Item {...tailLayout}>

                        <Button type="primary" htmlType="submit" onClick={() => {

                            if (!formValid) {
                                return <button disabled className='nodelete'>Delete</button>
                            } else {

                                Swal.fire({
                                    title: 'Are you sure?',
                                    text: "You're about to add a new room",
                                    icon: 'warning',
                                    showCancelButton: true,
                                    cancelButtonText: 'No',
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Yes, Add new room!'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        addRoom()
                                        Swal.fire(
                                            'Congratulations!',
                                            'Your new Room has been Added.',
                                            'success'
                                        ).then(result => {
                                            window.location.reload();
                                        })

                                    }
                                })


                            }


                            }
                        }>
                            Add Room
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Reset
                        </Button>

                    </Form.Item>

                </div>
            </Form>
        </div>
    )
}


export default Addroom