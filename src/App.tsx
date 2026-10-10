import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import './lib/i18n';

const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const ShopPage = lazy(() => import('./pages/ShopPage').then(module => ({ default: module.ShopPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then(module => ({ default: module.ProductDetailPage })));
const CoursesPage = lazy(() => import('./pages/CoursesPage').then(module => ({ default: module.CoursesPage })));
const CourseDetailPage = lazy(() => import('./pages/CourseDetailPage').then(module => ({ default: module.CourseDetailPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const CartPage = lazy(() => import('./pages/CartPage').then(module => ({ default: module.CartPage })));
const OrderPage = lazy(() => import('./pages/OrderPage').then(module => ({ default: module.OrderPage })));
const OrderConfirmationPage = lazy(() => import('./pages/OrderConfirmationPage').then(module => ({ default: module.OrderConfirmationPage })));
const AdminOrdersPage = lazy(() => import('./pages/admin/AdminOrdersPage').then(module => ({ default: module.AdminOrdersPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,#f7f4ff_0%,#ffffff_55%,#fff8ea_100%)] px-4">
    <div className="rounded-[2rem] border border-slate-200 bg-white px-8 py-10 text-center shadow-[0_32px_90px_-48px_rgba(49,11,130,0.45)]">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-[#f8f3ff] shadow-[0_18px_42px_-24px_rgba(49,11,130,0.4)]">
        <img src="/logo-icon.png" alt="NawaEduTech" className="h-8 w-8 object-contain" />
      </div>
      <div className="text-lg font-black text-slate-950">NawaEduTech</div>
      <div className="mt-2 text-sm font-bold text-slate-500">Loading...</div>
    </div>
  </div>
);

const MainLayout = () => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <CartProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Main site routes */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/shop/:slug" element={<ProductDetailPage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/courses/:id" element={<CourseDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/order" element={<OrderPage />} />
                <Route path="/order-confirmation" element={<OrderConfirmationPage />} />

                {/* Old redirects kept for compatibility */}
                <Route path="/login" element={<Navigate to="/contact" replace />} />
                <Route path="/signup" element={<Navigate to="/contact" replace />} />
                <Route path="/dashboard" element={<Navigate to="/contact" replace />} />
                <Route path="/landing/printed-product" element={<Navigate to="/shop" replace />} />
                <Route path="/landing/digital-product" element={<Navigate to="/shop" replace />} />
                <Route path="/landing/course" element={<Navigate to="/courses" replace />} />
                <Route path="/cost-crafter" element={<Navigate to="/shop" replace />} />
                <Route path="/daftar-ustad" element={<Navigate to="/shop" replace />} />

                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* Admin – no header/footer */}
              <Route path="/admin" element={<Navigate to="/admin/orders" replace />} />
              <Route path="/admin/orders" element={<AdminOrdersPage />} />
            </Routes>
          </Suspense>
        </CartProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
