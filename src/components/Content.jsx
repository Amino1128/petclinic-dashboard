import { Card, Button, Row, Col, Typography, Divider } from 'antd';
import { RightOutlined, HeartFilled, SafetyCertificateOutlined, MedicineBoxOutlined, BulbOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// 1. Мэдээллийн өгөгдөл (Data) - Энд мэдээллээ нэмж, засаж болно
const newsData = [
  {
    id: 1,
    sectionTitle: "Зөвлөгөө",
    title: "Шинэ амьтан тэжээхэд анхаарах зүйлс",
    description: "Шинэ нохой, муур авсан бол эхний 3 сард вакцинжуулалт болон туулгалт маш чухал. Нохойнд хооллолтын дэглэмийг зөв тогтоох хэрэгтэй бол муурны хувьд байнгын цэвэр ус болон зориулалтын хөтөвч бэлтгэх шаардлагатай.",
    image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1000&auto=format&fit=crop", 
    buttonText: "Дэлгэрэнгүй унших",
    footerLink: "Эрүүл мэндийн булан"
  },
  {
    id: 2,
    sectionTitle: "Гоо сайхан",
    title: "Мэргэжлийн угаалга, засалт",
    description: "Таны хайртай амьтны үс зүс, арьсны онцлогт тохирсон зориулалтын бүтээгдэхүүнээр угааж, хумс болон чихний цэвэрлэгээг мэргэжлийн түвшинд хийж гүйцэтгэнэ.",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=1000&auto=format&fit=crop",
    buttonText: "Цаг захиалах",
    footerLink: "Грүүминг салон"
  },
  {
    id: 3,
    sectionTitle: "Мэдээлэл",
    title: "Мууранд зориулсан шилдэг тоглоомууд",
    description: "Муурны идэвхтэй байдлыг дэмжих, стрессийг бууруулахад туслах интерактив тоглоом, маажих тавцан, лазер гэрэл гэх мэт шилдэг тоглоомуудын талаарх мэдээлэл.",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1000&auto=format&fit=crop",
    buttonText: "Дэлгэрэнгүй унших",
    footerLink: "Амьтны дэлгүүр"
  },
  {
    id: 4,
    sectionTitle: "Зөвлөгөө",
    title: "Нохойндоо зөв хоол сонгох нь",
    description: "Нохойн нас, үүлдэр, идэвхтэй байдалд тохирсон чанартай хуурай болон нойтон хоолыг хэрхэн сонгох, хооллолтын талаарх зөвлөмжүүд.",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop",
    buttonText: "Дэлгэрэнгүй унших",
    footerLink: "Эрүүл мэндийн булан"
  }
];

function NewsCard({ item }) {
  return (
    <div className="news-card-wrapper" style={{ marginBottom: 40 }}>
      <div
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: '#0f7c8b',
          marginBottom: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          textTransform: 'uppercase',
        }}
      >
        <BulbOutlined style={{ color: '#eab308' }} /> {item.sectionTitle}
      </div>
      
      <Card
        hoverable
        bordered={false}
        style={{
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        }}
        bodyStyle={{ padding: 0 }}
      >
        <div style={{ overflow: 'hidden' }}>
          <img
            src={item.image}
            alt={item.title}
            style={{
              width: '100%',
              height: 280,
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.5s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>

        <div style={{ padding: '32px 24px', textAlign: 'center', background: '#fff' }}>
          <Title level={3} style={{ fontSize: 22, marginBottom: 16, color: '#1e293b' }}>
            {item.title}
          </Title>
          
          <Text style={{ fontSize: 15, color: '#64748b', display: 'block', marginBottom: 24, lineHeight: '1.6' }}>
            {item.description}
          </Text>

          <Button
            type="primary"
            size="large"
            icon={<RightOutlined />}
            style={{
              height: 45,
              paddingInline: 30,
              borderRadius: 12,
              background: '#0f7c8b',
              border: 'none',
              fontWeight: 600,
            }}
          >
            {item.buttonText}
          </Button>
        </div>
      </Card>
    </div>
  );
}

function HomeContent() {
  return (
    <div style={{ marginTop: 40, padding: '0 10px' }}>
      
      {/* 2. Онцлох баннер хэсэг */}
      <div style={{ 
        background: '#1e293b', 
        borderRadius: 24, 
        padding: '40px', 
        marginBottom: 50,
        color: '#fff',
        backgroundImage: 'linear-gradient(135deg, #1e293b 0%, #0f7c8b 100%)',
        boxShadow: '0 20px 40px rgba(15, 124, 139, 0.2)'
      }}>
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} md={16}>
            <Title level={2} style={{ color: '#fff', marginBottom: 12 }}>🐾 PetMedical Зөвлөмж</Title>
            <Text style={{ color: '#cbd5e1', fontSize: 16, display: 'block', marginBottom: 20 }}>
              Бид таны хайртай амьтдад зориулсан мэргэжлийн оношилгоо, 
              эмчилгээ болон өдөр тутмын арчилгааны зөвлөгөөг хүргэж байна.
            </Text>
            <Space size="large">
               <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                 <SafetyCertificateOutlined style={{ fontSize: 24, color: '#84cc16' }} />
                 <span>Баталгаат лаборатори</span>
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                 <MedicineBoxOutlined style={{ fontSize: 24, color: '#84cc16' }} />
                 <span>Мэргэжлийн эмч нар</span>
               </div>
            </Space>
          </Col>
        </Row>
      </div>

      <Divider orientation="left" style={{ borderColor: '#e2e8f0' }}>
        <span style={{ fontSize: 20, fontWeight: 800, color: '#334155' }}>Сүүлийн үеийн мэдээлэл</span>
      </Divider>

      {/* 3. Мэдээний картууд */}
      <Row gutter={[32, 32]} style={{ marginTop: 20 }}>
        {newsData.map((item) => (
          <Col xs={24} lg={12} key={item.id}>
            <NewsCard item={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

import { Space } from 'antd';
export default HomeContent;