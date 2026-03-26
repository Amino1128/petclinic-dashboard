import { Button, Row, Col, Typography, Space } from 'antd';
import {
  FacebookFilled,
  TwitterOutlined,
  LinkedinFilled,
  InstagramOutlined,
  YoutubeFilled,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';

const { Text, Title } = Typography;

function Footer() {
  const serviceLinks = [
    'Амьтны оношилгоо',
    'Вакцинжуулалт',
    'Мэс засал',
    'Грүүминг / Угаалга',
    'Шүдний эмчилгээ',
  ];

  const helperLinks = [
    'Бидний тухай',
    'Холбоо барих',
    'Үйлчилгээний нөхцөл',
    'Нууцлалын бодлого',
    'Түгээмэл асуултууд',
  ];

  const iconStyle = {
    fontSize: 22,
    color: '#cbd5e1',
    cursor: 'pointer',
    transition: 'color 0.3s',
  };

  return (
    <footer
      style={{
        width: '100%',
        background: '#1e293b', // Content хэсгийн өнгөтэй ижил
        padding: '60px 64px 40px',
        color: 'white',
        marginTop: 'auto',
        borderTop: '4px solid #84cc16', // Ногоон зураас нэмэв
      }}
    >
      <Row gutter={[32, 40]}>
        {/* Logo & Slogan Section */}
        <Col xs={24} md={8}>
          <Title level={2} style={{ color: 'white', margin: 0, fontWeight: 800 }}>
            PETMEDICAL
          </Title>
          <Text style={{ color: '#94a3b8', display: 'block', marginTop: 12, fontSize: 15 }}>
            Таны хайртай амьтны эрүүл мэндийн төлөөх <br /> хамгийн найдвартай туслах.
          </Text>
          <div style={{ marginTop: 24, display: 'flex', gap: 16 }}>
            <FacebookFilled 
                style={iconStyle} 
                onMouseOver={(e) => e.currentTarget.style.color = '#1877F2'} 
                onMouseOut={(e) => e.currentTarget.style.color = '#cbd5e1'}
            />
            <InstagramOutlined 
                style={iconStyle} 
                onMouseOver={(e) => e.currentTarget.style.color = '#E4405F'} 
                onMouseOut={(e) => e.currentTarget.style.color = '#cbd5e1'}
            />
            <YoutubeFilled 
                style={iconStyle} 
                onMouseOver={(e) => e.currentTarget.style.color = '#FF0000'} 
                onMouseOut={(e) => e.currentTarget.style.color = '#cbd5e1'}
            />
            <TwitterOutlined 
                style={iconStyle} 
                onMouseOver={(e) => e.currentTarget.style.color = '#1DA1F2'} 
                onMouseOut={(e) => e.currentTarget.style.color = '#cbd5e1'}
            />
          </div>
        </Col>

        {/* Services Links */}
        <Col xs={12} md={4}>
          <Title level={5} style={{ color: 'white', marginBottom: 20 }}>Үйлчилгээ</Title>
          <Space direction="vertical" size={10}>
            {serviceLinks.map((item) => (
              <Text key={item} style={{ color: '#94a3b8', cursor: 'pointer', display: 'block' }} className="footer-link">
                {item}
              </Text>
            ))}
          </Space>
        </Col>

        {/* Helpful Links */}
        <Col xs={12} md={4}>
          <Title level={5} style={{ color: 'white', marginBottom: 20 }}>Тусламж</Title>
          <Space direction="vertical" size={10}>
            {helperLinks.map((item) => (
              <Text key={item} style={{ color: '#94a3b8', cursor: 'pointer', display: 'block' }}>
                {item}
              </Text>
            ))}
          </Space>
        </Col>

        {/* Contact Info */}
        <Col xs={24} md={8}>
          <Title level={5} style={{ color: 'white', marginBottom: 20 }}>Холбоо барих</Title>
          <Space direction="vertical" size={12} style={{ width: '100%' }}>
            <div style={{ display: 'flex', gap: 10, color: '#94a3b8' }}>
              <EnvironmentOutlined style={{ color: '#84cc16' }} />
              <span>Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо</span>
            </div>
            <div style={{ display: 'flex', gap: 10, color: '#94a3b8' }}>
              <PhoneOutlined style={{ color: '#84cc16' }} />
              <span>+976 7700-XXXX</span>
            </div>
            <div style={{ display: 'flex', gap: 10, color: '#94a3b8' }}>
              <MailOutlined style={{ color: '#84cc16' }} />
              <span>info@petmedical.mn</span>
            </div>
            <Button
              type="primary"
              style={{
                marginTop: 10,
                background: '#84cc16',
                borderColor: '#84cc16',
                height: 40,
                borderRadius: 8,
                fontWeight: 600
              }}
            >
              Мэдээлэл хүлээн авах
            </Button>
          </Space>
        </Col>
      </Row>

      <div style={{ 
        borderTop: '1px solid #334155', 
        marginTop: 60, 
        paddingTop: 24, 
        textAlign: 'center',
        color: '#64748b',
        fontSize: 13
      }}>
        ©{new Date().getFullYear()} PETMEDICAL Амьтны Эмнэлэг. Бүх эрх хуулиар хамгаалагдсан.
      </div>
    </footer>
  );
}

export default Footer;