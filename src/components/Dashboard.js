/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Space, Table } from 'antd'
import { Link } from 'react-router-dom'

import { Button, Popconfirm } from 'antd'
const Dashboard = () => {
  const [Book, setBook] = useState([])
  const [name, setName] = useState('')
  const [WriterData, setWriterData] = useState([])
  const [StoreData, setStoreData] = useState([])
  const [paymemt, setPayment] = useState([])
  const [staff, setStaff] = useState([])

  const history = useHistory()

  useEffect(() => {
    Auth()
    Writer()
    getStaff()
    getPayment()
  }, [])

  const Auth = async () => {
    const data = JSON.parse(localStorage.getItem('data'))
    try {
      await axios
        .post('https://tbd-be.vercel.app/api/login', {
          data: JSON.stringify({
            username: data.username,
            password: data.password,
          }),
        })
        .then((res) => {
          if(res.data === "User not found"){
            history.push('/login')
          } else {
            setName(res.data.username)
          }
        })
      history.push('/dashboard')
    } catch (error) {
      history.push('/login')
      if (error.response) {
        console.log(error.response.data.msg)
      }
    }
  }

  const Writer = async () => {
    await axios
      .get('https://tbd-be.vercel.app/api/writer')
      .then((res) => setWriterData(res.data))
      .finally(() => Store())
  }

  const Store = async () => {
    await axios
      .get('https://tbd-be.vercel.app/api/store')
      .then((res) => setStoreData(res.data))
      .finally(() => getBook())
  }

  const getBook = async () => {
    await axios
      .get('https://tbd-be.vercel.app/api/book')
      .then((res) => setBook(res.data))
  }

  const getPayment = async () => {
    await axios
      .get('https://tbd-be.vercel.app/api/payment')
      .then((res) => setPayment(res.data))
  }

  const getStaff = async () => {
    await axios
      .get('https://tbd-be.vercel.app/api/staff')
      .then((res) => setStaff(res.data))
  }

  const handleDeleteUser = (id) => async () => {
    await axios.delete(`https://tbd-be.vercel.app/api/book/${id}`)
    Auth()
    Writer()
  }

  const BookData = useMemo(
    () =>
      Book.map((data) => {
        let writerName = WriterData.find((x) => x.WriterID === data.WriterID)
        let storeName = StoreData.find((x) => x.storeID === data.StoreID)
        return {
          bookID: data?.bookID ?? '',
          title: data?.title ?? '',
          Writer: writerName?.WriterName ?? '',
          price: data?.price ?? '',
          Store: storeName?.StoreName ?? '',
          ReleaseDate: data?.ReleaseDate ?? '',
          Description: data?.Description ?? '',
          Publisher: data?.Publisher ?? '',
        }
      }),
    [Book]
  )

  const StaffData = useMemo(
    () =>
      staff.map((data) => {
        let storeName = StoreData.find((x) => x.storeID === data.StoreID)
        return {
          staffId: data?.StaffID ?? '',
          name: data?.StaffName ?? '',
          email: data?.StaffEmail ?? '',
          phone: data?.StaffPhone ?? '',
          store: storeName?.StoreName ?? '',
        }
      }),
    [staff]
  )

  const PaymentData = useMemo(
    () =>
      paymemt.map((data) => {
        return {
          date: data?.date ?? '',
          total: data?.total ?? '',
          paymentMethod: data?.paymentMethod ?? '',
          status: data?.status ?? '',
        }
      }),
    [paymemt]
  )

  console.log(staff)
  console.log(paymemt)
  

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Writer',
      dataIndex: 'Writer',
      key: 'Writer',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => <p>Rp{price}</p>,
    },
    {
      title: 'Store',
      dataIndex: 'Store',
      key: 'Store',
    },
    {
      title: 'Release Date',
      dataIndex: 'ReleaseDate',
      key: 'ReleaseDate',
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'Description',
    },
    {
      title: 'Publisher',
      dataIndex: 'Publisher',
      key: 'Publisher',
    },
    {
      dataIndex: 'bookID',
      width: 70,
      render: (userId) => (
        <Space>
          <Link to={`/Update/${userId}`}>
            <Button icon={<EditOutlined />} />
          </Link>

          <Popconfirm
            title={'Delete Confirm'}
            onConfirm={handleDeleteUser(userId)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const coloumsStaff = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email) => <p>{email}</p>,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Store',
      dataIndex: 'store',
      key: 'store',
    },
    {
      dataIndex: 'StaffID',
      width: 70,
      render: (userId) => (
        <Space>
          <Link to={`/Update/${userId}`}>
            <Button icon={<EditOutlined />} />
          </Link>

          <Popconfirm
            title={'Delete Confirm'}
            onConfirm={handleDeleteUser(userId)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const coloumsPayment = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (total) => <p>Rp{total}</p>,
    },
    {
      title: 'Book',
      dataIndex: 'book',
      key: 'book',
    },
    {
      title: 'Store',
      dataIndex: 'store',
      key: 'store',
    },
  ]



  const Create = () => {
    history.push('/Book')
  }

  return (
    <div className="container mt-5">
      <div className="flex flex-col">
        <div>
          <h1>Welcome Back: {name}</h1>
          <button
            onClick={() => {
              Auth()
              Writer()
            }}
            className="button is-info"
          >
            Get Book
          </button>
          <Table columns={columns} dataSource={BookData} />
          <Button onClick={Create} type="primary">
            Create Book
          </Button>
        </div>
        <div className="flex flex-row w-full">
          <div className="w-1/2">
            <Table columns={coloumsStaff} dataSource={StaffData} />
            <Button onClick={()=> history.push("/Staff")} type="primary">
              Add Staff
            </Button>
          </div>
          <div className="w-1/2">
            <Table columns={coloumsPayment} dataSource={PaymentData} />
            <Button onClick={()=> history.push("/Payment")} type="primary">
              Add Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
