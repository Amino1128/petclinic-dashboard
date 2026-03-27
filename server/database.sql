CREATE DATABASE IF NOT EXISTS pet_clinic_db;
USE pet_clinic_db;

-- 2. Амьтдын хүснэгт үүсгэх
CREATE TABLE IF NOT EXISTS animals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    species VARCHAR(50),
    breed VARCHAR(50),
    owner_name VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Healthy',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Жишээ өгөгдөл нэмэх (Тест хийхэд хэрэгтэй)
INSERT INTO animals (name, species, owner_name, status) 
VALUES 
('Banhar', 'Dog', 'Bat', 'Healthy'),
('Mimi', 'Cat', 'Sara', 'Check-up');