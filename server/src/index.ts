import express, { type Request, type Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

export const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan('dev'));
app.use(express.json({ limit: '256kb' }));

// ─── Data dir (persistance fichier P1, idempotent) ───
const DATA_DIR = path.join(__dirname, '..', 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');

function ensureDataDir() {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(ORDERS_FILE)) fs.writeFileSync(ORDERS_FILE, '[]');
    if (!fs.existsSync(CONTACTS_FILE)) fs.writeFileSync(CONTACTS_FILE, '[]');
  } catch {
    // ignore (read-only env)
  }
}
ensureDataDir();

function readJson<T>(file: string, fallback: T): T {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8')) as T;
  } catch {
    return fallback;
  }
}
function writeJson(file: string, data: unknown) {
  try {
    ensureDataDir();
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  } catch {
    // ignore persistence errors (in-memory still works)
  }
}

// ─── Catalogue (miroir brandSite/storeData, prix DA) ───
const PRODUCTS = [
  { id: 'smart-teaching-kit', name: 'Smart Teaching Kit', nameAr: 'حقيبة الوسائل التعليمية الذكية', price: 2500, currency: 'DA', stock: 50, type: 'kit' },
  { id: 'bac-planner', name: 'BAC Planner', nameAr: 'بلانر البكالوريا + خطة مراجعة 30 يوم', price: 800, currency: 'DA', stock: 200, type: 'planner' },
  { id: 'university-balance-kit', name: 'University Balance Kit', nameAr: 'باقة التوازن الجامعي', price: 1200, currency: 'DA', stock: 100, type: 'kit' },
  { id: 'teacher-ai-pack', name: 'Teacher AI Pack', nameAr: 'باقة أدوات الذكاء الاصطناعي للمعلم', price: 1500, currency: 'DA', stock: 75, type: 'pack' },
  { id: 'happy-school-box', name: 'Happy School Box', nameAr: 'صندوق السعادة الدراسي', price: 3500, currency: 'DA', stock: 30, type: 'box' },
  { id: 'costcrafter-pro', name: 'CostCrafter Pro', nameAr: 'كوست كرافتر برو', price: 3000, currency: 'DA', stock: 999, type: 'digital' },
  { id: 'daftar-ustad', name: 'Daftar Ustad', nameAr: 'دفتر الأستاذ الرقمي', price: 2500, currency: 'DA', stock: 999, type: 'digital' },
];

const COURSES = [
  { id: 'interactive-classroom', title: 'Interactive Teaching Strategies', titleAr: 'استراتيجيات التعليم التفاعلي للمعلمة العصرية', duration: '4 أسابيع', level: 'مبتدئ إلى متوسط', price: 0 },
  { id: 'teacher-ai-tools', title: 'Practical AI Tools for Teachers', titleAr: 'أدوات الذكاء الاصطناعي للمعلم بطريقة عملية', duration: '5 أسابيع', level: 'متوسط', price: 0 },
  { id: 'smart-study-planning', title: 'Smart Study Planning', titleAr: 'تنظيم الدراسة والمراجعة بذكاء', duration: '6 أسابيع', level: 'ثانوي إلى جامعي', price: 0 },
];

function generateOrderId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `NWT-${date}-${rand}`;
}

const ALGERIA_PHONE = /^(0)(5|6|7)[0-9]{8}$/;
const GENERIC_PHONE = /^[0-9+\s-]{9,15}$/;

// ─── Routes ───
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Nawa Backend is running', uptime: process.uptime(), time: new Date().toISOString() });
});

// الدورات (Courses API)
app.get('/api/courses', (_req: Request, res: Response) => {
  res.json(COURSES);
});

// المنتجات (Products API)
app.get('/api/products', (_req: Request, res: Response) => {
  res.json(PRODUCTS);
});

// Alias canonique /api/v1 (tolérance P1, cf. ADR)
app.get('/api/v1/health', (_req: Request, res: Response) => res.redirect('/api/health'));
app.get('/api/v1/products', (_req: Request, res: Response) => res.redirect('/api/products'));
app.get('/api/v1/courses', (_req: Request, res: Response) => res.redirect('/api/courses'));

// Orders
app.get('/api/orders', (_req: Request, res: Response) => {
  res.json(readJson(ORDERS_FILE, []));
});

app.get('/api/orders/:id', (req: Request, res: Response) => {
  const orders = readJson<any[]>(ORDERS_FILE, []);
  const order = orders.find((o) => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

app.post('/api/orders', (req: Request, res: Response) => {
  const { fullName, phone, wilayaCode, commune, address, paymentMethod, items, subtotal, notes, phone2 } = req.body ?? {};

  if (!fullName || String(fullName).trim().length < 3)
    return res.status(400).json({ error: 'fullName trop court (min 3)' });
  const phoneClean = String(phone ?? '').replace(/[\s-]/g, '');
  if (!GENERIC_PHONE.test(String(phone ?? '')) && !ALGERIA_PHONE.test(phoneClean))
    return res.status(400).json({ error: 'phone invalide (ex: 0555123456)' });
  if (!wilayaCode) return res.status(400).json({ error: 'wilayaCode requis (01-58)' });
  if (!commune || String(commune).trim().length < 2)
    return res.status(400).json({ error: 'commune requise' });
  if (!address || String(address).trim().length < 5)
    return res.status(400).json({ error: 'address trop courte (min 5)' });
  if (!['cash_on_delivery', 'ccp', 'baridimob'].includes(paymentMethod))
    return res.status(400).json({ error: 'paymentMethod invalide' });
  if (!Array.isArray(items) || items.length === 0)
    return res.status(400).json({ error: 'items vides' });

  // Recalcul serveur (anti-tampering): prix catalogue si connu, sinon prix envoyé
  let computed = 0;
  const normItems = items.map((it: any) => {
    const catalog = PRODUCTS.find((p) => p.id === it.productId);
    const unit = catalog ? catalog.price : Number(it.unitPrice ?? it.price ?? 0);
    const qty = Math.max(1, Math.min(99, Number(it.quantity ?? 1)));
    computed += unit * qty;
    return { productId: String(it.productId), quantity: qty, unitPrice: unit, totalPrice: unit * qty };
  });

  const order = {
    id: generateOrderId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'pending',
    items: normItems,
    shippingAddress: { fullName, phone, phone2, wilayaCode, commune, address },
    paymentMethod,
    subtotal: computed,
    shippingCost: 0, // calculé côté front (zones wilayas); conservé 0 serveur P1
    total: computed,
    notes: notes ?? '',
    clientSubtotal: Number(subtotal ?? computed),
  };

  const orders = readJson<any[]>(ORDERS_FILE, []);
  orders.push(order);
  writeJson(ORDERS_FILE, orders);
  res.status(201).json(order);
});

// Contact
app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body ?? {};
  if (!name || String(name).trim().length < 2)
    return res.status(400).json({ error: 'name trop court' });
  if (!email || !/^\S+@\S+\.\S+$/.test(String(email)))
    return res.status(400).json({ error: 'email invalide' });
  if (!subject || String(subject).trim().length < 4)
    return res.status(400).json({ error: 'subject trop court' });
  if (!message || String(message).trim().length < 10)
    return res.status(400).json({ error: 'message trop court (min 10)' });

  const entry = { id: `${Date.now()}`, name, email, subject, message, createdAt: new Date().toISOString() };
  const contacts = readJson<any[]>(CONTACTS_FILE, []);
  contacts.push(entry);
  writeJson(CONTACTS_FILE, contacts);
  res.status(201).json({ ok: true, id: entry.id });
});

// 404 JSON
app.use('/api', (_req: Request, res: Response) => res.status(404).json({ error: 'Not found' }));

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
  });
}
