import { Layout, Menu, Card, Row, Col } from 'antd'
import {
  HeartOutlined,
  CalendarOutlined,
  DollarOutlined,
  WarningOutlined,
  AppstoreOutlined,
  UserOutlined,
  MedicineBoxOutlined,
  ScheduleOutlined,
  MoonFilled,
} from '@ant-design/icons'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Page from './page.jsx'
import Owners from './Owners.jsx'

const { Sider, Content } = Layout

const menuItems = [
  { key: '/', icon: <AppstoreOutlined />, label: 'Dashboard' },
  { key: '/animals', icon: <HeartOutlined />, label: 'Animals' },
  { key: '/owners', icon: <UserOutlined />, label: 'Owners' },
  { key: '/visits', icon: <MedicineBoxOutlined />, label: 'Visits' },
  { key: '/schedule', icon: <ScheduleOutlined />, label: 'Schedule' },
]

const stats = [
  {
    title: 'Total Animals',
    value: '4',
    icon: <HeartOutlined />,
    iconColor: '#ff4d8d',
    softBg: '#fff0f6',
    lineColor: '#ff4d8d',
  },
  {
    title: 'Today’s Appointments',
    value: '0',
    icon: <CalendarOutlined />,
    iconColor: '#4c84ff',
    softBg: '#eef4ff',
    lineColor: '#4c84ff',
  },
  {
    title: 'Monthly Revenue',
    value: '0 MNT',
    icon: <DollarOutlined />,
    iconColor: '#19be6b',
    softBg: '#eefcf5',
    lineColor: '#19be6b',
  },
  {
    title: 'Low Stock Items',
    value: '1',
    icon: <WarningOutlined />,
    iconColor: '#f59e0b',
    softBg: '#fff8e8',
    lineColor: '#f59e0b',
  },
]

function StatCard({ item }) {
  return (
    <Card
      bordered={false}
      style={{
        borderRadius: 28,
        boxShadow: '0 10px 30px rgba(15,23,42,0.05)',
        minHeight: 250,
      }}
      bodyStyle={{
        padding: 28,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: 86,
            height: 86,
            borderRadius: 24,
            background: item.softBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 34,
            color: item.iconColor,
          }}
        >
          {item.icon}
        </div>

        <div
          style={{
            width: 92,
            height: 6,
            borderRadius: 999,
            background: item.lineColor,
          }}
        />
      </div>

      <div>
        <div
          style={{
            fontSize: 18,
            color: '#334155',
            marginBottom: 18,
          }}
        >
          {item.title}
        </div>

        <div
          style={{
            fontSize: 42,
            fontWeight: 800,
            color: '#0f172a',
            lineHeight: 1,
          }}
        >
          {item.value}
        </div>
      </div>
    </Card>
  )
}

function DashboardHome() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: 18,
          flexWrap: 'wrap',
          marginBottom: 24,
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: 24,
            padding: '14px 18px',
            minWidth: 88,
            boxShadow: '0 8px 24px rgba(15,23,42,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 18,
              background: '#0f172a',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
            }}
          >
            <MoonFilled />
          </div>
        </div>

        <div
          style={{
            background: '#fff',
            borderRadius: 999,
            padding: '18px 34px',
            boxShadow: '0 8px 24px rgba(15,23,42,0.06)',
            fontSize: 22,
            fontWeight: 700,
            color: '#334155',
          }}
        >
          PetClinic+
        </div>

        <div
          style={{
            background: '#fff',
            borderRadius: 999,
            padding: '18px 34px',
            boxShadow: '0 8px 24px rgba(15,23,42,0.06)',
            fontSize: 22,
            fontWeight: 700,
            color: '#475569',
          }}
        >
          Monday, June 30, 2025
        </div>
      </div>

      <Card
        bordered={false}
        style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)',
          color: 'white',
          borderRadius: 40,
          boxShadow: '0 18px 45px rgba(79,70,229,0.24)',
          marginBottom: 30,
          overflow: 'hidden',
        }}
        bodyStyle={{ padding: '52px 46px' }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 74,
                lineHeight: 1.05,
                fontWeight: 800,
                color: 'white',
              }}
            >
              Welcome to PetClinic+
            </h1>

            <p
              style={{
                marginTop: 24,
                marginBottom: 0,
                fontSize: 26,
                color: 'rgba(255,255,255,0.88)',
              }}
            >
              Monday, June 30th, 2025
            </p>
          </div>

          <div
            style={{
              fontSize: 88,
              color: 'rgba(255,255,255,0.22)',
              paddingRight: 12,
            }}
          >
            ~
          </div>
        </div>
      </Card>

      <Row gutter={[24, 24]}>
        {stats.map((item) => (
          <Col xs={24} sm={12} xl={6} key={item.title}>
            <StatCard item={item} />
          </Col>
        ))}
      </Row>
    </>
  )
}

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Layout style={{ minHeight: '100vh', background: '#eef2f7' }}>
      <Sider
        width={260}
        style={{
          background: '#2947b6',
          padding: '18px 14px',
        }}
      >
        <div
          style={{
            color: 'white',
            padding: '10px 8px 24px',
            fontSize: 24,
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 18,
              background: 'rgba(255,255,255,0.14)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
            }}
          >
            <HeartOutlined />
          </div>
          <span>PetClinic+</span>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          style={{
            background: '#2947b6',
            borderRight: 'none',
            marginTop: 8,
          }}
          items={menuItems}
        />
      </Sider>

      <Layout style={{ background: '#f3f4f6' }}>
        <Content style={{ padding: 24 }}>
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/animals" element={<Page />} />
            <Route path="/owners" element={<Owners />} />
            <Route path="/visits" element={<div>Visits Page</div>} />
            <Route path="/schedule" element={<div>Schedule Page</div>} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App