import React, { useEffect } from 'react'
import { Button, Select, Form, Input } from 'antd'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
export function Staff() {
  const formRef = React.useRef(null)
  const history = useHistory()
  const [StoreData, setStoreData] = React.useState([])
  const [UserData, setUserData] = React.useState([])
  const onFinish = (values) => {
    axios.post(`http://localhost:5000/api/staff`, {
        StaffName: values.StaffName,
        StaffEmail: values.StaffEmail,
        StaffPhone: values.StaffPhone,
        UserId: values.UserId,
        StoreId: values.StoreID,
    })
    history.push('/dashboard')
  }

  const Writer = () => {
    axios.get(`http://localhost:5000/api/store`).then((res) => {
      const data = res.data
      setStoreData(data)
    })
  }

  const Store = () => {
    axios.get(`http://localhost:5000/api/user`).then((res) => {
      const data = res.data
      setUserData(data)
    })
  }

  useEffect(() => {
    Writer()
    Store()
  }, [])

  const Back = () => {
    history.push('/dashboard')
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      ref={formRef}
      name="control-ref"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item label="Staff Name" name="StaffName" rules={[{ required: true }]}>
        <Input />
          </Form.Item>
           <Form.Item label="Staff Email" name="StaffEmail" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Username" name="UserId" rules={[{ required: true }]}>
        <Select
          allowClear
          showSearch
          placeholder="Select a Username"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={UserData.map((item) => ({
            value: item.id,
            label: item.username,
          }))}
        />
      </Form.Item>

      <Form.Item label="Staff Phone" name="StaffPhone" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Store" name="StoreID" rules={[{ required: true }]}>
        <Select
          allowClear
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          showSearch
          placeholder="Select a Store"
          optionFilterProp="children"
          notFoundContent={
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => history.push('/Store')}
            >
              Tambahkan Toko Baru
            </Button>
          }
          options={StoreData.map((item) => ({
            value: item.storeID,
            label: item.StoreName,
          }))}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{ offset: 8, span: 16 }}
        labelCol={{
          span: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={Back}>
          Back
        </Button>
      </Form.Item>
    </Form>
  )
}
