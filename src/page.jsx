import { Card, Button, Table } from 'antd'

function Page() {
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
  ]

  const data = [
    { key: '1', name: 'Bella', type: 'Dog', age: 3 },
    { key: '2', name: 'Milo', type: 'Cat', age: 2 },
  ]

  return (
    <div style={{ padding: 24 }}>
      <Card
        bordered={false}
        style={{ borderRadius: 24, marginBottom: 24 }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h1 style={{ margin: 0 }}>Animals</h1>
          <Button type="primary">+ Add Animal</Button>
        </div>
      </Card>

      <Card bordered={false} style={{ borderRadius: 24 }}>
        <Table columns={columns} dataSource={data} pagination={false} />
      </Card>
    </div>
  )
}

export default Page