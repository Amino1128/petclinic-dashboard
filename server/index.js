const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('PetMedical Server ажиллаж байна!');
});

// 1. Нийт амьтны тоо авах
app.get('/api/animals/count', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT COUNT(*) as total FROM animals');
    res.json(rows[0]); 
  } catch (err) {
    console.error('DB алдаа:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Эздийн нийт тоог авах
app.get('/api/owners/count', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT COUNT(*) as total FROM owners');
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Хэрэв эздийн тоог авах бол 
app.get('/api/owners/count', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT COUNT(*) as total FROM owners');
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Хэрэглэгч бүртгэх
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const sqlInsert = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    await db.query(sqlInsert, [username, email, password]);
    res.status(200).json({ message: 'Амжилттай бүртгүүллээ!' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Энэ и-мэйл хаяг аль хэдийн бүртгэгдсэн байна!' });
    }
    res.status(500).json({ error: 'Серверийн алдаа гарлаа' });
  }
});

// 4. Нэвтрэх API
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const sqlSelect = "SELECT id, username, email, role FROM users WHERE email = ? AND password = ?";
    const [rows] = await db.query(sqlSelect, [email, password]);

    if (rows.length > 0) {
      res.status(200).json({ 
        message: 'Амжилттай нэвтэрлээ!', 
        user: rows[0] 
      });
    } else {
      res.status(401).json({ error: 'И-мэйл эсвэл нууц үг буруу байна!' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Серверийн алдаа гарлаа' });
  }
});

// 5. Бүх амьтдын жагсаалтыг авах (Эзний нэртэй хамт)
app.get('/api/animals', async (req, res) => {
  try {
    const sql = `
        SELECT animals.*, owners.name as owner_name 
        FROM animals 
        LEFT JOIN owners ON animals.owner_id = owners.id
        ORDER BY animals.id DESC
    `;
    const [rows] = await db.query(sql);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Шинэ амьтан нэмэх (owner_id-тай хамт)
app.post('/api/animals', async (req, res) => {
  const { name, species, breed, age, owner_id } = req.body;
  try {
    const sql = "INSERT INTO animals (name, species, breed, age, owner_id) VALUES (?, ?, ?, ?, ?)";
    await db.query(sql, [name, species, breed, age, owner_id]);
    res.status(200).json({ message: 'Амжилттай нэмэгдлээ!' });
  } catch (err) {
    console.error("Амьтан нэмэхэд алдаа:", err.message);
    res.status(500).json({ error: 'Өгөгдлийн санд хадгалахад алдаа гарлаа' });
  }
});

// 7. Бүх эздийн жагсаалтыг авах
app.get('/api/owners', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM owners ORDER BY created_at DESC');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Шинэ эзэн нэмэх
app.post('/api/owners', async (req, res) => {
  const { name, phone, email, address } = req.body;
  try {
    const sql = "INSERT INTO owners (name, phone, email, address) VALUES (?, ?, ?, ?)";
    await db.query(sql, [name, phone, email, address]);
    res.status(200).json({ message: 'Эзэн амжилттай бүртгэгдлээ!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 9. Эзний мэдээлэл устгах
app.delete('/api/owners/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM owners WHERE id = ?', [req.params.id]);
    res.json({ message: 'Амжилттай устгагдлаа' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 10. Эзний мэдээлэл засах
app.put('/api/owners/:id', async (req, res) => {
  const { name, phone, email, address } = req.body;
  try {
    await db.query(
      'UPDATE owners SET name=?, phone=?, email=?, address=? WHERE id=?',
      [name, phone, email, address, req.params.id]
    );
    res.json({ message: 'Амжилттай шинэчлэгдлээ' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Амьтны мэдээлэл устгах
app.delete('/api/animals/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM animals WHERE id = ?', [req.params.id]);
    res.json({ message: 'Амжилттай устгагдлаа' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Амьтны мэдээлэл засах
app.put('/api/animals/:id', async (req, res) => {
  const { name, species, breed, age, owner_id } = req.body;
  try {
    const sql = "UPDATE animals SET name=?, species=?, breed=?, age=?, owner_id=? WHERE id=?";
    await db.query(sql, [name, species, breed, age, owner_id, req.params.id]);
    res.json({ message: 'Амжилттай шинэчлэгдлээ' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Сервер асаах
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});