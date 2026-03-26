import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Space, message, Card, Tag, Select, Popconfirm } from 'antd';
import { PlusOutlined, ReloadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const Animals = () => {
  const [animals, setAnimals] = useState([]);
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null); // Засвар хийж буй ID-г хадгалах
  const [form] = Form.useForm();

  // Баазаас амьтдаа татаж авах
  const fetchAnimals = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/animals');
      setAnimals(res.data);
    } catch (error) {
      message.error("Мэдээлэл татахад алдаа гарлаа");
    }
    setLoading(false);
  };

  // Эздийн жагсаалт татах
  const fetchOwners = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/owners');
      setOwners(res.data);
    } catch (error) {
      console.error("Эздийн мэдээллийг татаж чадсангүй");
    }
  };

  useEffect(() => {
    fetchAnimals();
    fetchOwners();
  }, []);

  // Нэмэх болон Засах үйлдлийг нэгтгэсэн функц
  const handleSubmit = async (values) => {
    try {
      if (editingId) {
        // Засвар хийх (UPDATE)
        await axios.put(`http://localhost:5000/api/animals/${editingId}`, values);
        message.success("Мэдээлэл амжилттай шинэчлэгдлээ!");
      } else {
        // Шинээр нэмэх (CREATE)
        await axios.post('http://localhost:5000/api/animals', values);
        message.success("Амжилттай нэмэгдлээ!");
      }
      setIsModalVisible(false);
      setEditingId(null);
      form.resetFields();
      fetchAnimals(); 
    } catch (error) {
      message.error("Үйлдэл хийхэд алдаа гарлаа");
    }
  };

  // Устгах функц
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/animals/${id}`);
      message.success("Устгагдлаа");
      fetchAnimals();
    } catch (error) {
      message.error("Устгахад алдаа гарлаа");
    }
  };

  const columns = [
    { 
      title: 'Нэр', 
      dataIndex: 'name', 
      key: 'name', 
      render: (text) => <b>{text}</b> 
    },
    { 
      title: 'Төрөл', 
      dataIndex: 'species', 
      key: 'species', 
      render: (s) => <Tag color="blue">{s}</Tag> 
    },
    { title: 'Үүлдэр', dataIndex: 'breed', key: 'breed' },
    { title: 'Нас', dataIndex: 'age', key: 'age' },
    { 
      title: 'Эзэн', 
      dataIndex: 'owner_name', 
      key: 'owner_name', 
      render: (n) => n ? <Tag color="green">{n}</Tag> : <Tag color="default">Эзэнгүй</Tag> 
    },
    {
      title: 'Үйлдэл',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            icon={<EditOutlined />} 
            onClick={() => {
              setEditingId(record.id); // Засах ID-г тохируулах
              form.setFieldsValue(record);
              setIsModalVisible(true);
            }} 
          />
          <Popconfirm
            title="Устгахдаа итгэлтэй байна уу?"
            onConfirm={() => handleDelete(record.id)}
            okText="Тийм"
            cancelText="Үгүй"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Card 
        title={<span style={{ fontSize: 20 }}>🐾 Амьтдын бүртгэл</span>} 
        extra={
          <Space>
            <Button icon={<ReloadOutlined />} onClick={fetchAnimals} />
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={() => {
                setEditingId(null); // Шинээр нэмэх горим
                form.resetFields();
                setIsModalVisible(true);
              }}
            >
              Амьтан нэмэх
            </Button>
          </Space>
        }
        styles={{ body: { padding: '24px' } }}
        style={{ borderRadius: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
      >
        <Table 
          columns={columns} 
          dataSource={animals} 
          rowKey="id" 
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </Card>

      <Modal 
        title={editingId ? "Мэдээлэл засах" : "Шинэ амьтан бүртгэх"} 
        open={isModalVisible} 
        onCancel={() => {
          setIsModalVisible(false);
          setEditingId(null);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        okText={editingId ? "Шинэчлэх" : "Нэмэх"}
        cancelText="Болих"
        centered
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Амьтны нэр" rules={[{ required: true, message: 'Нэрийг оруулна уу' }]}>
            <Input placeholder="Жишээ: Басар" />
          </Form.Item>

          <Form.Item name="species" label="Төрөл" rules={[{ required: true, message: 'Төрлийг сонгоно уу' }]}>
            <Select placeholder="Сонгох">
              <Select.Option value="Нохой">Нохой</Select.Option>
              <Select.Option value="Муур">Муур</Select.Option>
              <Select.Option value="Тэх">Тэх</Select.Option>
              <Select.Option value="Бусад">Бусад</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="breed" label="Үүлдэр">
            <Input placeholder="Жишээ: Хаски" />
          </Form.Item>

          <Form.Item name="age" label="Нас">
            <InputNumber min={0} style={{ width: '100%' }} placeholder="0" />
          </Form.Item>

          <Form.Item 
            name="owner_id" 
            label="Эзэн сонгох" 
            rules={[{ required: true, message: 'Эзнийг заавал сонгоно уу' }]}
          >
            <Select 
              placeholder="Системд бүртгэлтэй эзнийг сонгох" 
              showSearch 
              optionFilterProp="children"
            >
              {owners.map(owner => (
                <Select.Option key={owner.id} value={owner.id}>
                  {owner.name} ({owner.phone})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Animals;