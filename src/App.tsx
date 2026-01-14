import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import './lib/i18n';

// Lazy load pages for performance (Optimization Stage)
const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const ShopPage = lazy(() => import('./pages/ShopPage').then(module => ({ default: module.ShopPage })));
const CoursesPage = lazy(() => import('./pages/CoursesPage').then(module => ({ default: module.CoursesPage })));
const CourseDetailPage = lazy(() => import('./pages/CourseDetailPage').then(module => ({ default: module.CourseDetailPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(module => ({ default: module.LoginPage })));
const SignupPage = lazy(() => import('./pages/SignupPage').then(module => ({ default: module.SignupPage })));
const DashboardPage = lazy(() => import('./pages/DashboardPage').then(module => ({ default: module.DashboardPage })));
const CartPage = lazy(() => import('./pages/CartPage').then(module => ({ default: module.CartPage })));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(module => ({ default: module.AdminDashboard })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));

// Landing Pages
const PrintedProductLanding = lazy(() => import('./pages/PrintedProductLanding').then(module => ({ default: module.PrintedProductLanding })));
const DigitalProductLanding = lazy(() => import('./pages/DigitalProductLanding').then(module => ({ default: module.DigitalProductLanding })));
const CourseLanding = lazy(() => import('./pages/CourseLanding').then(module => ({ default: module.CourseLanding })));
const CostCrafterLanding = lazy(() => import('./pages/CostCrafter/CostCrafterLanding'));
const DaftarUstadLanding = lazy(() => import('./pages/DaftarUstad/DaftarUstadLanding'));

// Loading Fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

// Main Layout Component
const MainLayout = () => (
  <div className="flex flex-col min-h-screen">
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
      <AuthProvider>
        <LanguageProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Standard Platform Pages (Wrapped in Main Layout) */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/courses/:id" element={<CourseDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>

              {/* Standalone Landing Pages (No Header/Footer from Main Layout) */}
              <Route path="/landing/printed-product" element={<PrintedProductLanding />} />
              <Route path="/landing/digital-product" element={<DigitalProductLanding />} />
              <Route path="/landing/course" element={<CourseLanding />} />

              {/* Product Launch Pages */}
              <Route path="/cost-crafter" element={<CostCrafterLanding />} />
              <Route path="/daftar-ustad" element={<DaftarUstadLanding />} />
            </Routes>
          </Suspense>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
