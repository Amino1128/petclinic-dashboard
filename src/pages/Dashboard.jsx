import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Statistic, Spin } from 'antd';
import { UserOutlined, BugOutlined, AreaChartOutlined } from '@ant-design/icons';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({ animals: 0, owners: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [animalRes, ownerRes] = await Promise.all([
          axios.get('http://localhost:5000/api/animals/count'),
          axios.get('http://localhost:5000/api/owners/count')
        ]);
        setStats({ animals: animalRes.data.total, owners: ownerRes.data.total });
      } catch (error) {
        console.error("Алдаа гарлаа");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: 50 }}><Spin size="large" /></div>;

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <h2 style={{ marginBottom: 24 }}><AreaChartOutlined /> Системийн ерөнхий тойм</h2>
      <Row gutter={24}>
        <Col span={12}>
          <Card hoverable style={{ borderRadius: 12 }}>
            <Statistic 
              title="Нийт бүртгэлтэй амьтад" 
              value={stats.animals} 
              prefix={<BugOutlined />} 
              valueStyle={{ color: '#3f8600' }} 
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card hoverable style={{ borderRadius: 12 }}>
            <Statistic 
              title="Нийт бүртгэлтэй эзэд" 
              value={stats.owners} 
              prefix={<UserOutlined />} 
              valueStyle={{ color: '#cf1322' }} 
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;