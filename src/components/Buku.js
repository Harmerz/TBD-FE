import React, { useEffect } from 'react'
import { Button, Select, Form, Input } from 'antd'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
export function Book() {
  const formRef = React.useRef(null)
  const history = useHistory()
  const [WriterData, setWriterData] = React.useState([])
  const [StoreData, setStoreData] = React.useState([])
  const [writerName, setWriterName] = React.useState('')
  const onFinish = (values) => {
    axios.post(`https://tbd-be.vercel.app/api/book`, {
      title: values.title,
      WriterID: values.WriterID,
      price: values.price,
      StoreID: values.StoreID,
      ReleaseDate: values.ReleaseDate,
      Description: values.Description,
      Publisher: values.Publisher,
    })
    history.push('/dashboard')
  }

  const Writer = () => {
    axios.get(`https://tbd-be.vercel.app/api/writer`).then((res) => {
      const data = res.data
      setWriterData(data)
    })
  }

  const Store = () => {
    axios.get(`https://tbd-be.vercel.app/api/store`).then((res) => {
      const data = res.data
      setStoreData(data)
    })
  }

  const AddWriter = async (values) => {
    try {
      await axios.post(`https://tbd-be.vercel.app/api/writer`, {
        WriterName: values,
      })
      Writer()
    } catch (error) {
      console.log(error)
    }
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
      <Form.Item label="Title" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Writer" name="WriterID" rules={[{ required: true }]}>
        <Select
          allowClear
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          onSearch={(e) => setWriterName(e)}
          notFoundContent={
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => AddWriter(writerName)}
            >
              Tambahkan Penulis Baru
            </Button>
          }
          options={WriterData.map((item) => ({
            value: item.WriterID,
            label: item.WriterName,
          }))}
        />
      </Form.Item>

      <Form.Item label="Price" name="price" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Store" name="StoreID" rules={[{ required: true }]}>
        <Select
          allowClear
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          showSearch
          placeholder="Select a person"
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
        label="ReleaseDate"
        name="ReleaseDate"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="Description"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Publisher"
        name="Publisher"
        rules={[{ required: true }]}
      >
        <Input />
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
