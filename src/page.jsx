import { useMemo, useState } from 'react'
import { Card, Button, Input, Modal, Form, Select, InputNumber, Row, Col, Empty, } from 'antd'
import { SearchOutlined, PlusOutlined, HeartOutlined, EditOutlined, DeleteOutlined, } from '@ant-design/icons'
import Header from "./app/components/Header";

const initialAnimals = [
]

function Page() {
  const [animals, setAnimals] = useState(initialAnimals)
  const [searchText, setSearchText] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAnimal, setEditingAnimal] = useState(null)
  const [form] = Form.useForm()

  const filteredAnimals = useMemo(() => {
    const keyword = searchText.trim().toLowerCase()

    if (!keyword) return animals

    return animals.filter((animal) =>
      [
        animal.name,
        animal.species,
        animal.breed,
        animal.gender,
        animal.owner,
      ]
        .join(' ')
        .toLowerCase()
        .includes(keyword)
    )
  }, [animals, searchText])

  const openAddModal = () => {
    setEditingAnimal(null)
    form.resetFields()
    setIsModalOpen(true)
  }

  const openEditModal = (animal) => {
    setEditingAnimal(animal)
    form.setFieldsValue({
      name: animal.name,
      species: animal.species,
      breed: animal.breed,
      gender: animal.gender,
      age: animal.age,
      weight: animal.weight,
      owner: animal.owner,
    })
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    setAnimals((prev) => prev.filter((animal) => animal.id !== id))
  }

  const handleSave = async () => {
    try {
      const values = await form.validateFields()

      if (editingAnimal) {
        setAnimals((prev) =>
          prev.map((animal) =>
            animal.id === editingAnimal.id
              ? { ...animal, ...values }
              : animal
          )
        )
      } else {
        const newAnimal = {
          id: Date.now(),
          ...values,
        }

        setAnimals((prev) => [newAnimal, ...prev])
      }

      form.resetFields()
      setEditingAnimal(null)
      setIsModalOpen(false)
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      // validation error
    }
  }

  const handleCancel = () => {
    form.resetFields()
    setEditingAnimal(null)
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
            background: '#fff6f9',
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
                Амьтад
              </h1>
              <p
                style={{
                  margin: '10px 0 0',
                  fontSize: 16,
                  color: '#5147c1',
                }}
              >
                Амьтадын бүртгэлийг удирдах
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
              Амьтан нэмэх
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
            placeholder="Амьтан хайх..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              height: 56,
              borderRadius: 18,
            }}
          />
        </Card>

        {filteredAnimals.length === 0 ? (
          <Card
            bordered={false}
            style={{
              borderRadius: 28,
              boxShadow: '0 8px 24px rgba(15,23,42,0.06)',
            }}
            bodyStyle={{ padding: 40 }}
          >
            <Empty description="Одоогоор бүртгэгдсэн амьтан байхгүй" />
          </Card>
        ) : (
          <Row gutter={[24, 24]}>
            {filteredAnimals.map((animal) => (
              <Col xs={24} md={12} xl={8} key={animal.id}>
                <Card
                  bordered={false}
                  style={{
                    borderRadius: 28,
                    boxShadow: '0 10px 30px rgba(15,23,42,0.06)',
                    height: '100%',
                  }}
                  bodyStyle={{ padding: 28 }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: 14,
                      marginBottom: 24,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        gap: 16,
                        alignItems: 'flex-start',
                      }}
                    >
                      <div
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: 20,
                          background:
                            'linear-gradient(135deg, #fb7185 0%, #f43f5e 100%)',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 28,
                          boxShadow: '0 10px 24px rgba(244,63,94,0.25)',
                          flexShrink: 0,
                        }}
                      >
                        <HeartOutlined />
                      </div>

                      <div>
                        <div
                          style={{
                            fontSize: 24,
                            fontWeight: 800,
                            color: '#0f172a',
                            lineHeight: 1.2,
                          }}
                        >
                          {animal.name}
                        </div>
                        <div
                          style={{
                            marginTop: 6,
                            fontSize: 15,
                            color: '#475569',
                            lineHeight: 1.5,
                          }}
                        >
                          {animal.species} • {animal.breed}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 10 }}>
                      <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => openEditModal(animal)}
                      />
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(animal.id)}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gap: 14,
                    }}
                  >
                    <InfoRow label="Хүйс" value={animal.gender} />
                    <InfoRow label="Нас" value={`${animal.age} настай`} />
                    <InfoRow label="Жин" value={`${animal.weight} kg`} />
                    <InfoRow label="Эзэн" value={animal.owner} />
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        <Modal
          title={editingAnimal ? 'Edit Animal' : 'Add Animal'}
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
              label="Амьтаны нэр"
              name="name"
              rules={[{ required: true, message: 'Амьтаны нэрийг оруулна уу' }]}
            >
              <Input placeholder="Tom" />
            </Form.Item>

            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  label="Амьтаны төрөл"
                  name="species"
                  rules={[{ required: true, message: 'Амьтаны төрлийг оруулна уу' }]}
                >
                  <Select
                    placeholder="Төрөл сонгох"
                    options={[
                      { value: 'Нохой', label: 'Нохой' },
                      { value: 'Муур', label: 'Муур' },
                      { value: 'Шувуу', label: 'Шувуу' },
                      { value: 'Туулай', label: 'Туулай' },
                      { value: 'Бусад', label: 'Бусад'},
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Үүлдэр"
                  name="breed"
                  rules={[{ required: true, message: 'Амьтаны үүлдэрийг оруулна уу' }]}
                >
                  <Input placeholder="Golden Retriever" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Хүйс"
              name="gender"
              rules={[{ required: true, message: 'Амьтаны хүйсийг сонгоно уу' }]}
            >
              <Select
                placeholder="Хүйс сонгох"
                options={[
                  { value: 'Эр', label: 'Эр' },
                  { value: 'Эм', label: 'Эм' },
                ]}
              />
            </Form.Item>

            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  label="Нас"
                  name="age"
                  rules={[{ required: true, message: 'Амьтаны насыг оруулна уу' }]}
                >
                  <InputNumber
                    min={0}
                    style={{ width: '100%' }}
                    placeholder="Нас оруулах"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Жин (kg)"
                  name="weight"
                  rules={[{ required: true, message: 'Амьтаны жинг оруулна уу' }]}
                >
                  <InputNumber
                    min={0}
                    step={0.1}
                    style={{ width: '100%' }}
                    placeholder="Жин оруулах"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Эзэн"
              name="owner"
              rules={[{ required: true, message: 'Эзний нэрийг оруулна уу' }]}
            >
              <Input placeholder="А.Бат" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  )
}

function InfoRow({ label, value }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 16,
        paddingBottom: 10,
        borderBottom: '1px solid #f1f5f9',
      }}
    >
      <span style={{ color: '#475569', fontSize: 15 }}>{label}:</span>
      <span style={{ color: '#0f172a', fontSize: 15, fontWeight: 600 }}>
        {value}
      </span>
    </div>
  )
}

export default Page