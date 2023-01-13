import React from 'react'
import { Button, Select, Form, Input } from 'antd'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
export function Karyawan() {
  const formRef = React.useRef(null)
  const history = useHistory()
  const onFinish = (values) => {
    axios.post(`http://localhost:5000/karyawan`, {
      nama: values.nama,
      age: values.age,
      no_telp: values.no_telp,
      alamat: values.alamat,
      tags: values.tags.toString(),
    })
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
      <Form.Item label="Nama" name="nama" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Age" name="age" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name="no_telp"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Address" name="alamat" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Tags" name="tags" rules={[{ required: true }]}>
        <Select mode="multiple" allowClear>
          <Select.Option value="Frontend">Frontend</Select.Option>
          <Select.Option value="Backend">Backend</Select.Option>
          <Select.Option value="Database">Database</Select.Option>
        </Select>
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
