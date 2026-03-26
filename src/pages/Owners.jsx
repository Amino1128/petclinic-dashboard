import { useMemo, useState, useEffect } from 'react'
import { Card, Button, Input, Modal, Form, Empty, message, Popconfirm } from 'antd'
import { SearchOutlined, PlusOutlined, UserOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons'
import axios from 'axios'

function Owners({ isDarkMode }) {
  const [owners, setOwners] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingOwner, setEditingOwner] = useState(null)
  const [form] = Form.useForm()

  // 1. Баазаас эздийн мэдээллийг татах функц
  const fetchOwners = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/owners');
      setOwners(res.data);
    } catch (error) {
      message.error("Мэдээлэл татахад алдаа гарлаа");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  // 2. Хайлт хийх логик
  const filteredOwners = useMemo(() => {
    const keyword = searchText.trim().toLowerCase()
    if (!keyword) return owners
    return owners.filter((owner) =>
      [owner.name, owner.phone, owner.email, owner.address]
        .join(' ')
        .toLowerCase()
        .includes(keyword)
    )
  }, [owners, searchText])

  // 3. Модал нээх (Нэмэх / Засах)
  const openAddModal = () => {
    setEditingOwner(null)
    form.resetFields()
    setIsModalOpen(true)
  }

  const openEditModal = (owner) => {
    setEditingOwner(owner)
    form.setFieldsValue({
      name: owner.name,
      phone: owner.phone,
      email: owner.email,
      address: owner.address,
    })
    setIsModalOpen(true)
  }

  // 4. Устгах функц (Баазаас устгана)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/owners/${id}`);
      message.success("Амжилттай устгагдлаа");
      fetchOwners(); // Жагсаалтыг шинэчлэх
    } catch (error) {
      message.error("Устгахад алдаа гарлаа");
    }
  }

  // 5. Хадгалах функц (Шинээр нэмэх эсвэл Засварлах)
  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      if (editingOwner) {
        // Засварлах API
        await axios.put(`http://localhost:5000/api/owners/${editingOwner.id}`, values);
        message.success("Мэдээлэл шинэчлэгдлээ");
      } else {
        // Шинээр нэмэх API
        await axios.post('http://localhost:5000/api/owners', values);
        message.success("Шинэ эзэн бүртгэгдлээ");
      }
      setIsModalOpen(false)
      fetchOwners(); // Жагсаалтыг шинэчлэх
    } catch (error) {
      console.error("Save error:", error);
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <Card
        bordered={false}
        style={{
          borderRadius: 28,
          marginBottom: 24,
          background: isDarkMode ? '#1f2937' : '#f4f8ff',
          boxShadow: '0 8px 24px rgba(15,23,42,0.06)',
        }}
        bodyStyle={{ padding: 32 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 36, color: isDarkMode ? '#fff' : '#0f172a' }}>Эзний мэдээлэл</h1>
            <p style={{ margin: '8px 0 0', fontSize: 16, color: '#475569' }}>Системд бүртгэлтэй эздийн жагсаалт</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Button icon={<ReloadOutlined />} onClick={fetchOwners} size="large" style={{ borderRadius: 12, height: 52 }} />
            <Button type="primary" size="large" icon={<PlusOutlined />} onClick={openAddModal} style={{ height: 52, borderRadius: 16, paddingInline: 24 }}>
              Эзэн нэмэх
            </Button>
          </div>
        </div>
      </Card>

      <Card
        bordered={false}
        style={{ borderRadius: 28, marginBottom: 24, boxShadow: '0 8px 24px rgba(15,23,42,0.06)' }}
        bodyStyle={{ padding: 28 }}
      >
        <Input
          size="large"
          placeholder="Нэр, утас эсвэл хаягаар хайх..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ height: 56, borderRadius: 18 }}
        />
      </Card>

      {filteredOwners.length === 0 ? (
        <Card bordered={false} style={{ borderRadius: 28, textAlign: 'center' }} bodyStyle={{ padding: 60 }}>
          <Empty description="Мэдээлэл олдсонгүй" />
        </Card>
      ) : (
        <Card bordered={false} style={{ borderRadius: 28, overflow: 'hidden', boxShadow: '0 8px 24px rgba(15,23,42,0.06)' }} bodyStyle={{ padding: 0 }}>
          {/* Хүснэгтийн толгой */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1.4fr 120px', gap: 16, padding: '22px 28px', background: isDarkMode ? '#374151' : '#f8fafc', fontWeight: 700, color: isDarkMode ? '#9ca3af' : '#475569', fontSize: 13, textTransform: 'uppercase' }}>
            <div>Нэр</div><div>Утас</div><div>Имайл</div><div>Гэрийн хаяг</div><div>Үйлдэл</div>
          </div>

          {/* Хүснэгтийн мөрүүд */}
          {filteredOwners.map((owner, index) => (
            <div key={owner.id} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1.4fr 120px', gap: 16, padding: '20px 28px', alignItems: 'center', borderTop: index === 0 ? 'none' : '1px solid #eef2f7' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: 'linear-gradient(135deg, #60a5fa 0%, #6366f1 100%)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                  <UserOutlined />
                </div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{owner.name}</div>
              </div>
              <div>{owner.phone}</div>
              <div style={{ color: '#64748b' }}>{owner.email || '-'}</div>
              <div style={{ fontSize: 14 }}>{owner.address}</div>
              <div style={{ display: 'flex', gap: 4 }}>
                <Button type="text" icon={<EditOutlined />} onClick={() => openEditModal(owner)} />
                <Popconfirm title="Устгахдаа итгэлтэй байна уу?" onConfirm={() => handleDelete(owner.id)} okText="Тийм" cancelText="Үгүй">
                  <Button type="text" danger icon={<DeleteOutlined />} />
                </Popconfirm>
              </div>
            </div>
          ))}
        </Card>
      )}

      {/* Нэмэх/Засах Модал */}
      <Modal title={editingOwner ? 'Эзний мэдээлэл засах' : 'Шинэ эзэн бүртгэх'} open={isModalOpen} onOk={handleSave} onCancel={() => setIsModalOpen(false)} okText="Хадгалах" cancelText="Болих" centered destroyOnClose>
        <Form form={form} layout="vertical" style={{ marginTop: 20 }}>
          <Form.Item label="Эзний нэр" name="name" rules={[{ required: true, message: 'Нэр оруулна уу' }]}><Input placeholder="А. Бат" /></Form.Item>
          <Form.Item label="Утас" name="phone" rules={[{ required: true, message: 'Утас оруулна уу' }]}><Input placeholder="99112233" /></Form.Item>
          <Form.Item label="Имэйл" name="email"><Input placeholder="owner@email.com" /></Form.Item>
          <Form.Item label="Гэрийн хаяг" name="address" rules={[{ required: true, message: 'Хаяг оруулна уу' }]}><Input.TextArea rows={3} placeholder="Дүүрэг, хороо..." /></Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Owners