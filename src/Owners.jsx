import { useMemo, useState } from 'react'
import { Card, Button, Input, Modal, Form, Row, Col, Empty, } from 'antd'
import { SearchOutlined, PlusOutlined, UserOutlined, EditOutlined, DeleteOutlined, } from '@ant-design/icons'
import Header from './app/components/Header.jsx'

const initialOwners = [
    
]

function Owners() {
  const [owners, setOwners] = useState(initialOwners)
  const [searchText, setSearchText] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingOwner, setEditingOwner] = useState(null)
  const [form] = Form.useForm()

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

  const handleDelete = (id) => {
    setOwners((prev) => prev.filter((owner) => owner.id !== id))
  }

  const handleSave = async () => {
    try {
      const values = await form.validateFields()

      if (editingOwner) {
        setOwners((prev) =>
          prev.map((owner) =>
            owner.id === editingOwner.id ? { ...owner, ...values } : owner
          )
        )
      } else {
        const newOwner = {
          id: Date.now(),
          ...values,
        }
        setOwners((prev) => [newOwner, ...prev])
      }

      form.resetFields()
      setEditingOwner(null)
      setIsModalOpen(false)
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      // validation error
    }
  }

  const handleCancel = () => {
    form.resetFields()
    setEditingOwner(null)
    setIsModalOpen(false)
  }

  return (
    <>
      <Header />

      <div style={{ padding: 24 }}>
        <Card
          bordered={false}
          style={{
            borderRadius: 28,
            marginBottom: 24,
            background: '#f4f8ff',
            boxShadow: '0 8px 24px rgba(15,23,42,0.06)',
          }}
          bodyStyle={{ padding: 32 }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 42,
                  color: '#0f172a',
                }}
              >
                Эзний мэдээлэл
              </h1>
              <p
                style={{
                  margin: '10px 0 0',
                  fontSize: 16,
                  color: '#475569',
                }}
              >
                Эздийн мэдээллийг удирдах
              </p>
            </div>

            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={openAddModal}
              style={{
                height: 52,
                borderRadius: 16,
                paddingInline: 24,
              }}
            >
              Эзэн нэмэх
            </Button>
          </div>
        </Card>

        <Card
          bordered={false}
          style={{
            borderRadius: 28,
            marginBottom: 24,
            boxShadow: '0 8px 24px rgba(15,23,42,0.06)',
          }}
          bodyStyle={{ padding: 28 }}
        >
          <Input
            size="large"
            placeholder="Эзэн хайх..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              height: 56,
              borderRadius: 18,
            }}
          />
        </Card>

        {filteredOwners.length === 0 ? (
          <Card
            bordered={false}
            style={{
              borderRadius: 28,
              boxShadow: '0 8px 24px rgba(15,23,42,0.06)',
            }}
            bodyStyle={{ padding: 40 }}
          >
            <Empty description="Одоогоор бүртгэсэн эзэн байхгүй" />
          </Card>
        ) : (
          <Card
            bordered={false}
            style={{
              borderRadius: 28,
              boxShadow: '0 8px 24px rgba(15,23,42,0.06)',
              overflow: 'hidden',
            }}
            bodyStyle={{ padding: 0 }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr 1fr 1.4fr 120px',
                gap: 16,
                padding: '22px 28px',
                background: '#f8fafc',
                fontWeight: 700,
                color: '#475569',
                fontSize: 14,
                textTransform: 'uppercase',
              }}
            >
              <div>Нэр</div>
              <div>Утас</div>
              <div>Имайл</div>
              <div>Гэрийн хаяг</div>
              <div>Үйлдэл</div>
            </div>

            {filteredOwners.map((owner, index) => (
              <div
                key={owner.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1fr 1fr 1.4fr 120px',
                  gap: 16,
                  padding: '20px 28px',
                  alignItems: 'center',
                  borderTop: index === 0 ? 'none' : '1px solid #eef2f7',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 18,
                      background:
                        'linear-gradient(135deg, #60a5fa 0%, #6366f1 100%)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 24,
                      flexShrink: 0,
                      boxShadow: '0 10px 24px rgba(99,102,241,0.18)',
                    }}
                  >
                    <UserOutlined />
                  </div>

                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: '#0f172a',
                    }}
                  >
                    {owner.name}
                  </div>
                </div>

                <div style={{ color: '#0f172a' }}>{owner.phone}</div>
                <div style={{ color: '#0f172a', wordBreak: 'break-word' }}>
                  {owner.email || '-'}
                </div>
                <div style={{ color: '#0f172a', wordBreak: 'break-word' }}>
                  {owner.address}
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => openEditModal(owner)}
                  />
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(owner.id)}
                  />
                </div>
              </div>
            ))}
          </Card>
        )}

        <Modal
          title={editingOwner ? 'Edit Owner' : 'Add Owner'}
          open={isModalOpen}
          onOk={handleSave}
          onCancel={handleCancel}
          okText="Save"
          cancelText="Cancel"
          centered
          destroyOnHidden
        >
          <Form form={form} layout="vertical" style={{ marginTop: 20 }}>
            <Form.Item
              label="Эзний нэр"
              name="name"
              rules={[{ required: true, message: 'Эзний нэрийг оруулна уу' }]}
            >
              <Input placeholder="А. Бат" />
            </Form.Item>

            <Form.Item
              label="Утас"
              name="phone"
              rules={[{ required: true, message: 'Утасны дугаараа оруулна уу' }]}
            >
              <Input placeholder="+976 99112233" />
            </Form.Item>

            <Form.Item 
            label="Имэйл (optional)" 
            name="email"
            rules={[{ required: true, message: 'Имэйл хаягаа оруулна уу' }]}
            >
              <Input placeholder="owner@email.com" />
            </Form.Item>

            <Form.Item
              label="Гэрийн хаяг"
              name="address"
              rules={[{ required: true, message: 'Гэрийн хаягаа оруулна уу' }]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Ulaanbaatar, Sukhbaatar district..."
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  )
}

export default Owners