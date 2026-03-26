import { Card, Button, Row, Col } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import { homeNews } from '../../data/homeNews.js'

function NewsCard({ item }) {
  return (
    <div>
      <div
        style={{
          fontSize: 24,
          fontWeight: 800,
          color: '#0f7c8b',
          marginBottom: 16,
        }}
      >
        {item.sectionTitle} <RightOutlined style={{ fontSize: 14 }} />
      </div>

      <Card
        bordered={false}
        style={{
          borderRadius: 0,
          overflow: 'hidden',
          background: 'transparent',
          boxShadow: 'none',
        }}
        bodyStyle={{ padding: 0 }}
      >
        <img
          src={item.image}
          alt={item.title}
          style={{
            width: '100%',
            height: 260,
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </Card>

      <div
        style={{
          textAlign: 'center',
          padding: '28px 18px 0',
        }}
      >
        <h2
          style={{
            fontSize: 28,
            lineHeight: 1.35,
            marginBottom: 18,
            color: '#1f2937',
          }}
        >
          {item.title}
        </h2>

        <p
          style={{
            fontSize: 16,
            lineHeight: 1.8,
            color: '#334155',
            marginBottom: 28,
          }}
        >
          {item.description}
        </p>

        <Button
          size="large"
          style={{
            height: 46,
            paddingInline: 24,
            borderRadius: 6,
            border: '1px solid #84cc16',
            color: '#334155',
            fontWeight: 600,
            background: '#fff',
          }}
        >
          {item.buttonText}
        </Button>

        <div
          style={{
            marginTop: 26,
            color: '#0f7c8b',
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          {item.footerLink} <RightOutlined style={{ fontSize: 12 }} />
        </div>
      </div>
    </div>
  )
}

function HomeNewsSection() {
  return (
    <div
      style={{
        marginTop: 48,
        marginBottom: 20,
        padding: '10px 0 30px',
      }}
    >
      <Row gutter={[44, 44]}>
        {homeNews.map((item) => (
          <Col xs={24} lg={12} key={item.id}>
            <NewsCard item={item} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default HomeNewsSection