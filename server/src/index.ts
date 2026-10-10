import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Nawa Backend is running' });
});

// الدورات (Courses API)
app.get('/api/courses', (req, res) => {
    // سيتم جلبها من قاعدة البيانات لاحقاً
    res.json([
        { id: 1, title: 'دورة إتقان الحرف', price: 5000 },
        { id: 2, title: 'أدوات التعليم الرقمي', price: 3500 }
    ]);
});

// المنتجات (Products API)
app.get('/api/products', (req, res) => {
    res.json([
        { id: 1, name: 'CostCrafter Pro', price: 3000 },
        { id: 2, name: 'دفتر الأستاذ الرقمي', price: 2500 }
    ]);
});

app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
});
