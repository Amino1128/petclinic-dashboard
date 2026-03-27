import React, { useState, useEffect } from 'react';
import axios from 'axios';
// ConfigProvider болон theme-ийг импортлох (Theme Switch-д зориулж)
import { Layout, Menu, Card, Row, Col, Button, Space, Modal, Form, Input, message, ConfigProvider, theme, Switch } from 'antd';
import { 
  HeartOutlined, CalendarOutlined, TransactionOutlined, GithubOutlined, 
  AppstoreOutlined, UserOutlined, MedicineBoxOutlined, ScheduleOutlined, 
  LoginOutlined, UserAddOutlined, LogoutOutlined, BulbOutlined 
} from '@ant-design/icons';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Animals from './pages/Animals.jsx';
import Owners from './pages/Owners.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Footer from './components/Footer.jsx';
import HomeContent from './components/Content.jsx';

const { Sider, Content, Header } = Layout;
const StatCard = ({ item, count, loading, isDarkMode }) => (
  <Card 
    bordered={false} 
    style={{ 
      borderRadius: 32, 
      padding: '24px 30px', 
      boxShadow: isDarkMode ? '0 12px 36px rgba(0,0,0,0.2)' : '0 12px 36px rgba(15,23,42,0.04)', 
      height: '100%',
      transition: 'all 0.3s'
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
      <div style={{ width: 56, height: 56, borderRadius: 20, background: item.softBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, color: item.iconColor }}>
        {item.icon}
      </div>
      <div style={{ width: 45, height: 4, background: item.lineColor, borderRadius: 2, marginTop: 26 }} />
    </div>
    <div style={{ fontSize: 15, color: isDarkMode ? '#94a3b8' : '#94a3b8', fontWeight: 500, marginBottom: 4 }}>{item.title}</div>
    <div style={{ fontSize: 38, fontWeight: 800, color: isDarkMode ? '#f1f5f9' : '#1e293b' }}>{item.title === 'Нийт амьтан' ? (loading ? '...' : count) : item.value}</div>
  </Card>
);

// Dashboard-ийн нүүр хэсэг
function DashboardHome({ isDarkMode }) {
  const [animalCount, setAnimalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/animals/count');
        setAnimalCount(response.data.total);
        setLoading(false);
      } catch (error) {
        console.error("Дата татахад алдаа гарлаа:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { title: 'Нийт амьтан', value: '0', icon: <HeartOutlined />, iconColor: '#ff4d8d', softBg: '#fff0f6', lineColor: '#ff4d8d' },
    { title: 'Цаг авсан', value: '12', icon: <CalendarOutlined />, iconColor: '#3b82f6', softBg: '#eff6ff', lineColor: '#3b82f6' },
    { title: 'Хандив', value: '450k', icon: <TransactionOutlined />, iconColor: '#10b981', softBg: '#ecfdf5', lineColor: '#10b981' },
    { title: 'Олдсон', value: '3', icon: <GithubOutlined />, iconColor: '#f59e0b', softBg: '#fffbeb', lineColor: '#f59e0b' },
  ];

  return (
    <>
      <div style={{ display: 'flex', gap: 18, marginBottom: 24, alignItems: 'center' }}>
        <div style={{ background: isDarkMode ? '#1f2937' : '#fff', borderRadius: 20, padding: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <BulbOutlined style={{ fontSize: 24, color: isDarkMode ? '#fff' : '#0f172a' }} />
        </div>
        <div style={{ background: isDarkMode ? '#1f2937' : '#fff', color: isDarkMode ? '#fff' : '#1e293b', borderRadius: 30, padding: '10px 24px', fontWeight: 700, fontSize: 18, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            PetMedical+
        </div>
      </div>
      <Card bordered={false} style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)', color: 'white', borderRadius: 40, marginBottom: 30 }} bodyStyle={{ padding: '50px' }}>
        <h1 style={{ color: 'white', fontSize: 48, margin: 0 }}>Welcome to PetMedical+</h1>
        <p style={{ fontSize: 20, opacity: 0.8 }}>Өнөөдрийн мэдээллийг хянана уу.</p>
      </Card>
      <Row gutter={[24, 24]}>
        {stats.map((item) => (
            <Col xs={24} sm={12} xl={6} key={item.title}>
                <StatCard item={item} count={animalCount} loading={loading} isDarkMode={isDarkMode} />
            </Col>
        ))}
      </Row>
      <Content/>
    </>
  );
}

// ҮНДСЭН APP КОМПОНЕНТ
function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // States
  const [collapsed, setCollapsed] = useState(true);
  const [user, setUser] = useState(null); 
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);
  
  // Theme State: Шөнийн горим асаалттай эсэх
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  const menuItems = [
    { key: '/', icon: <AppstoreOutlined />, label: 'Нүүр' },
    { key: '/animals', icon: <HeartOutlined />, label: 'Амьтад' },
    { key: '/owners', icon: <UserOutlined />, label: 'Эзэн' },
    { key: '/visits', icon: <MedicineBoxOutlined />, label: 'Зочлох' },
    { key: '/schedule', icon: <ScheduleOutlined />, label: 'Цаг товлох' },
  ];

  // Нэвтрэх функц
  const onLogin = async (values) => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", values);
      message.success(response.data.message);
      setUser(response.data.user); 
      setIsLoginVisible(false);
      loginForm.resetFields();
    } catch (error) {
      message.error(error.response?.data?.error || "Нэвтрэхэд алдаа гарлаа.");
    }
  };

  // Бүртгүүлэх функц
  const onRegister = async (values) => {
    try {
      const response = await axios.post("http://localhost:5000/api/register", values);
      if (response.status === 200 || response.status === 201) {
        message.success("Амжилттай бүртгүүллээ! Одоо нэвтэрч орно уу.");
        setIsRegisterVisible(false);
        registerForm.resetFields();
        setIsLoginVisible(true); // Бүртгүүлсний дараа нэвтрэх цонхыг шууд нээх
      }
    } catch (error) {
      message.error(error.response?.data?.error || "Бүртгэлд алдаа гарлаа.");
    }
  };

  // Гарах функц
  const handleLogout = () => {
    setUser(null);
    message.info("Системээс гарлаа.");
  };

  // Theme-ээ солих функц
  const toggleTheme = (checked) => {
    setIsDarkMode(checked);
  };

  // Ant Design Theme Algorithm-ыг сонгох
  const { defaultAlgorithm, darkAlgorithm } = theme;

  return (
    // ConfigProvider-оор бүхэлд нь ороож Theme-ийг удирдах
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: '#3b82f6', 
        },
      }}
    >
      <Layout style={{ minHeight: '100vh', transition: 'all 0.3s', background: isDarkMode ? '#111827' : '#f8fafc' }}>
        {/* Хажуугийн цэс (Theme дагаж өөрчлөгдөнө) */}
        <Sider 
          theme={isDarkMode ? 'dark' : 'light'} 
          width={260} 
          collapsed={collapsed}
          trigger={null}
          onMouseEnter={() => setCollapsed(false)}
          onMouseLeave={() => setCollapsed(true)}
          style={{ 
            borderRight: isDarkMode ? '1px solid #1f2937' : '1px solid #e2e8f0', 
            position: 'fixed', 
            height: '100vh', 
            left: 0, 
            zIndex: 1001, 
            transition: 'all 0.2s' 
          }}
        >
          <div style={{ 
            padding: '32px 0', 
            textAlign: 'center', 
            fontSize: collapsed ? 16 : 22, 
            fontWeight: 800, 
            color: isDarkMode ? '#fff' : '#1e293b', 
            transition: '0.2s' 
          }}>
            {collapsed ? 'PET MEDICAL' : 'PET MEDICAL'}
          </div>
          <Menu 
            theme={isDarkMode ? 'dark' : 'light'}
            mode="inline" 
            selectedKeys={[location.pathname]} 
            items={menuItems} 
            onClick={({ key }) => navigate(key)} 
            style={{ borderRight: 0, padding: '0 12px' }} 
          />
        </Sider>

        {/* Үндсэн контент */}
        <Layout style={{ marginLeft: collapsed ? 80 : 260, transition: 'all 0.2s', background: 'transparent' }}>
          <Header style={{ 
            background: isDarkMode ? '#111827' : '#f8fafc', 
            padding: '0 40px', 
            display: 'flex', 
            justifyContent: 'flex-end', 
            alignItems: 'center', 
            height: 80, 
            position: 'sticky', 
            top: 0, 
            zIndex: 1000,
            transition: 'all 0.3s'
          }}>
            <Space size="large">
              {/* Theme Switch товчлуур */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Switch 
                  checked={isDarkMode} 
                  onChange={toggleTheme} 
                  checkedChildren="☾" 
                  unCheckedChildren="☼" 
                  style={{ background: isDarkMode ? '#3b82f6' : '#94a3b8' }}
                />
              </div>

              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontWeight: 700, color: isDarkMode ? '#f1f5f9' : '#334155', fontSize: '15px' }}>👤 {user.username}</span>
                  <Button type="default" icon={<LogoutOutlined />} onClick={handleLogout} style={{ borderRadius: '10px' }}>Гарах</Button>
                </div>
              ) : (
                <Space>
                  <Button type="text" icon={<LoginOutlined />} onClick={() => setIsLoginVisible(true)} style={{ fontWeight: 500, color: isDarkMode ? '#f1f5f9' : '#1e293b' }}>Нэвтрэх</Button>
                  <Button 
                    type="primary" 
                    icon={<UserAddOutlined />} 
                    onClick={() => setIsRegisterVisible(true)} 
                    style={{ borderRadius: 999, background: 'linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)', border: 'none', height: 40, padding: '0 24px' }}
                  >
                    Бүртгүүлэх
                  </Button>
                </Space>
              )}
            </Space>
          </Header>

          <Content style={{ padding: '0 40px 40px 40px' }}>
  <Routes>
    <Route path="/" element={
        <>
          <DashboardHome isDarkMode={isDarkMode} />
          <HomeContent />
          <Footer isDarkMode={isDarkMode} />
        </>
      } 
    />
    
    <Route path="/animals" element={<Animals isDarkMode={isDarkMode} />} />
    <Route path="/owners" element={<Owners />} />
  </Routes>
</Content>
        </Layout>

        {/* НЭВТРЭХ MODAL (Ant Design-ийн ConfigProvider-оор удирдагдана) */}
        <Modal title="Системд нэвтрэх" open={isLoginVisible} onCancel={() => setIsLoginVisible(false)} onOk={() => loginForm.submit()} okText="Нэвтрэх" cancelText="Болих">
          <Form form={loginForm} layout="vertical" onFinish={onLogin} style={{ marginTop: 20 }}>
            <Form.Item name="email" label="И-мэйл" rules={[{ required: true, type: 'email', message: 'И-мэйл хаягаа оруулна уу!' }]}><Input placeholder="example@mail.com" /></Form.Item>
            <Form.Item name="password" label="Нууц үг" rules={[{ required: true, message: 'Нууц үгээ оруулна уу!' }]}><Input.Password placeholder="******" /></Form.Item>
          </Form>
        </Modal>

        {/* БҮРТГҮҮЛЭХ MODAL */}
        <Modal title="Шинэ хэрэглэгч бүртгүүлэх" open={isRegisterVisible} onCancel={() => setIsRegisterVisible(false)} onOk={() => registerForm.submit()} okText="Бүртгүүлэх" cancelText="Болих">
          <Form form={registerForm} layout="vertical" onFinish={onRegister} style={{ marginTop: 20 }}>
            <Form.Item name="username" label="Хэрэглэгчийн нэр" rules={[{ required: true, message: 'Нэрээ оруулна уу!' }]}><Input placeholder="Username" /></Form.Item>
            <Form.Item name="email" label="И-мэйл" rules={[{ required: true, type: 'email', message: 'Зөв и-мэйл оруулна уу!' }]}><Input placeholder="Email" /></Form.Item>
            <Form.Item name="password" label="Нууц үг" rules={[{ required: true, message: 'Нууц үгээ оруулна уу!' }]}><Input.Password placeholder="Password" /></Form.Item>
          </Form>
        </Modal>
      </Layout>
    </ConfigProvider>
  );
}

export default App;