import React from 'react'
import { Button, Form, Input } from 'antd'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
export function Store() {
  const formRef = React.useRef(null)
  const history = useHistory()
  const onFinish = async (values) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/address`, {
        address: values.address,
        address2: values.address2,
        City: values.city,
        PostalZip: values.postalzip,
      })
      await axios.post(`http://localhost:5000/api/store`, {
        StoreName: values.storename,
        addressID: res.data.addressID,
      })
      // history.push('/dashboard')
    } catch (error) {
      console.log(error)
    }

    history.push('/dashboard')
  }

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
      <Form.Item
        label="Store Name"
        name="storename"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Address" name="address" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Address 2" name="address2">
        <Input />
      </Form.Item>

      <Form.Item label="City" name="city" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Postal Zip"
        name="postalzip"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{ offset: 8, span: 16 }}
        labelCol={{
          span: 24,
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
