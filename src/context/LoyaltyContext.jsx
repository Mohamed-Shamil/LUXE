import React, { createContext, useContext, useState } from 'react';

const LoyaltyContext = createContext();

export const useLoyalty = () => useContext(LoyaltyContext);

export const LoyaltyProvider = ({ children }) => {
  const [points, setPoints] = useState(750); // Default simulation starting points
  const [tier, setTier] = useState('Gold');
  
  // Simulation: Order history for demo
  const [orders, setOrders] = useState([
      { id: '#LUX-9281', date: 'Oct 12, 2025', total: 450, items: 3, status: 'Delivered' },
      { id: '#LUX-8821', date: 'Sep 05, 2025', total: 120, items: 1, status: 'Delivered' },
      { id: '#LUX-1123', date: 'Aug 22, 2025', total: 890, items: 4, status: 'Delivered' },
  ]);

  const addPoints = (amount) => {
    setPoints(prev => prev + amount);
  };

  const redeemPoints = (amount) => {
     if (points >= amount) setPoints(prev => prev - amount);
  };

  return (
    <LoyaltyContext.Provider value={{ points, tier, orders, addPoints, redeemPoints }}>
      {children}
    </LoyaltyContext.Provider>
  );
};
