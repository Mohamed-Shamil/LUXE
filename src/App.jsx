import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ABControlPanel } from './components/admin/ABControlPanel';


// Lazy loading pages
const Home = React.lazy(() => import('./pages/Home'));
const ProductDetail = React.lazy(() => import('./pages/ProductDetail'));
const ProductListing = React.lazy(() => import('./pages/ProductListing'));
const Checkout = React.lazy(() => import('./pages/Checkout'));
const Account = React.lazy(() => import('./pages/Account'));
const MerchantDashboard = React.lazy(() => import('./pages/MerchantDashboard'));
const Wishlist = React.lazy(() => import('./pages/Wishlist'));
const CartPage = React.lazy(() => import('./pages/CartPage'));
const AdminLogin = React.lazy(() => import('./pages/admin/AdminLogin'));
const UserAuth = React.lazy(() => import('./pages/UserAuth'));
const Support = React.lazy(() => import('./pages/Support'));

const ScrollToTop = () => {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

const Loading = () => (
    <div className="min-h-screen flex items-center justify-center bg-white text-luxury font-serif animate-pulse">
        Loading Luxury...
    </div>
);

function App() {
  return (
    <Router>

      <ScrollToTop />
      <Layout>
        <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/collections/all" element={<ProductListing />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/account" element={<Account />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/login" element={<UserAuth />} />
              <Route path="/support" element={<Support />} />
              <Route path="/admin/dashboard" element={<MerchantDashboard />} />
            </Routes>
        </Suspense>
      </Layout>
      <ABControlPanel />
      
      {/* Admin routes outside Layout */}
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
