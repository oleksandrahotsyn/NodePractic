// src/server.js
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Логування часу
app.use((req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
});

// Кореневий маршрут
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello, World!' });
});

// Middleware для парсингу JSON
app.use(express.json());

app.post('/users', (req, res) => {
  console.log(req.body); // тепер тіло доступне як JS-обєкт
  res.status(201).json({ message: 'User created' });
});

// Маршрут для тестування middleware помилки
app.get('/test-error', (req, res) => {
    // Штучна помилка для прикладу
    throw new Error('Something went wrong');
});

// Middleware 404 (після всіх маршрутів)
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Middleware для обробки помилок (останнє)
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({
        message: 'Internal Server Error',
        error: err.message,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
