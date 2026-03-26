import { Button } from 'antd'
import {
  FacebookFilled,
  TwitterOutlined,
  LinkedinFilled,
  InstagramOutlined,
  YoutubeFilled,
  MailOutlined,
  WifiOutlined,
  MessageOutlined,
  GlobalOutlined,
} from '@ant-design/icons'

function Footer() {
  const leftLinks = [
    'American Veterinary Medical Foundation (AVMF)',
    'AVMA LIFE',
    'AVMA PLIT',
    'AVMA Political Action Committee (PAC)',
    'Student AVMA (SAVMA)',
  ]

  const rightLinks = [
    'Contact us',
    'Work at AVMA',
    'Privacy policy',
    'Terms of use',
    'Sitemap',
  ]

  const iconStyle = {
    fontSize: 28,
    color: 'white',
    cursor: 'pointer',
  }

  return (
    <div
      style={{
        marginTop: 40,
        background: '#66737d',
        padding: '56px 64px',
        color: 'white',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1.2fr 1fr 1.1fr',
          gap: 40,
          alignItems: 'start',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: 1,
            }}
          >
            AVMA
          </div>
          <div
            style={{
              marginTop: 8,
              fontSize: 18,
              opacity: 0.95,
            }}
          >
            Our Passion. Our Profession.
          </div>
        </div>

        <div style={{ display: 'grid', gap: 14 }}>
          {leftLinks.map((item) => (
            <div
              key={item}
              style={{
                fontSize: 18,
                lineHeight: 1.5,
              }}
            >
              {item}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gap: 14 }}>
          {rightLinks.map((item) => (
            <div
              key={item}
              style={{
                fontSize: 18,
                lineHeight: 1.5,
              }}
            >
              {item}
            </div>
          ))}
        </div>

        <div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 18,
              marginBottom: 28,
            }}
          >
            <FacebookFilled style={iconStyle} />
            <TwitterOutlined style={iconStyle} />
            <LinkedinFilled style={iconStyle} />
            <InstagramOutlined style={iconStyle} />
            <GlobalOutlined style={iconStyle} />
            <YoutubeFilled style={iconStyle} />
            <MessageOutlined style={iconStyle} />
            <WifiOutlined style={iconStyle} />
            <MailOutlined style={iconStyle} />
          </div>

          <Button
            size="large"
            style={{
              height: 54,
              paddingInline: 26,
              borderRadius: 4,
              background: 'transparent',
              color: 'white',
              border: '1px solid #8fd14f',
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Subscribe to newsletters
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Footer