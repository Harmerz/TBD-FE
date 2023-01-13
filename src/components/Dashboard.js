/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useHistory } from 'react-router-dom'
import { Space, Table, Tag } from 'antd'
import { Link } from 'react-router-dom'

import { Button, Popconfirm } from 'antd'
const Dashboard = () => {
  const [karyawan, setKaryawan] = useState([])
  const [name, setName] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState('')
  const [expire, setExpire] = useState('')
  const history = useHistory()

  useEffect(() => {
    refreshToken()
    getKaryawan()
  }, [])
  // const handleDeleteUser = useCallback(
  //     (userId) => async () => {
  //       await deleteUser(userId)
  //       notification.success({
  //         message: t('delete_success'),
  //       })
  //     },
  //     [deleteUser, t]
  //   )
  const getKaryawan = async () => {
    await axios
      .get('http://localhost:5000/karyawan')
      .then((res) => setKaryawan(res.data))
  }
  console.log(karyawan)
  const columns = [
    {
      title: 'Name',
      dataIndex: 'nama',
      key: 'nama',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Phone Number',
      dataIndex: 'no_telp',
      key: 'no_telp',
    },
    {
      title: 'Address',
      dataIndex: 'alamat',
      key: 'alamat',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => {
        const temp = tags.split(',')
        return (
          <>
            {temp.map((tag) => {
              let color = tag.length > 7 ? 'geekblue' : 'green'
              if (tag === 'database') {
                color = 'volcano'
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              )
            })}
          </>
        )
      },
    },
    {
      dataIndex: 'id',
      width: 70,
      render: (userId) => (
        <Space>
          <Link to={`/karyawan/${userId}`}>
            <Button icon={<EditOutlined />} />
          </Link>

          <Popconfirm
            title={'Delete Confirm'}
            // onConfirm={handleDeleteUser(userId)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/token')
      setToken(response.data.accessToken)
      const decoded = jwt_decode(response.data.accessToken)
      setName(decoded.name)
      setExpire(decoded.exp)
    } catch (error) {
      if (error.response) {
        history.push('/')
      }
    }
  }

  const axiosJWT = axios.create()

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date()
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get('http://localhost:5000/token')
        config.headers.Authorization = `Bearer ${response.data.accessToken}`
        setToken(response.data.accessToken)
        const decoded = jwt_decode(response.data.accessToken)
        setName(decoded.name)
        setExpire(decoded.exp)
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  const Create = () => {
    history.push('/karyawan')
  }

  return (
    <div className="container mt-5">
      <h1>Welcome Back: {name}</h1>
      <button onClick={null} className="button is-info">
        Get Users
      </button>
      <Table columns={columns} dataSource={karyawan} />
      <Button onClick={Create} type="primary">
        Create karyawan
      </Button>
    </div>
  )
}

export default Dashboard
