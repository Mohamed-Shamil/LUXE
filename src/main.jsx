import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { CartProvider } from './context/CartContext';
import { ShowcaseProvider } from './context/ShowcaseContext';
import { LoyaltyProvider } from './context/LoyaltyContext';
import { MerchantProvider } from './context/MerchantContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import { AdminProvider } from './context/AdminContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminProvider>
    <ShowcaseProvider>
      <ToastProvider>
      <MerchantProvider>
        <LoyaltyProvider>
          <WishlistProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </WishlistProvider>
        </LoyaltyProvider>
      </MerchantProvider>
      </ToastProvider>
    </ShowcaseProvider>
    </AdminProvider>
  </React.StrictMode>,
);
