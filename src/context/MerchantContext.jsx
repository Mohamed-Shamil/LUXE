import React, { createContext, useContext, useState } from 'react';

const MerchantContext = createContext();

export const useMerchant = () => useContext(MerchantContext);

export const MerchantProvider = ({ children }) => {
  // Live Simulated Data State
  const [leads, setLeads] = useState([
      { id: 1, type: "Bulk Quote", name: "TechCorp Inc.", status: "New", value: "Est. $5.2k", date: "2 mins ago" },
      { id: 2, type: "Wedding Crew", name: "Sarah's Party", status: "Pending", value: "Est. $1.8k", date: "1 hour ago" },
      { id: 3, type: "Rental", name: "John Doe", status: "Confirmed", value: "$450", date: "3 hours ago" },
  ]);

  const [sales, setSales] = useState([
     { day: 'M', value: 40 },
     { day: 'T', value: 65 },
     { day: 'W', value: 45 },
     { day: 'T', value: 80 },
     { day: 'F', value: 55 },
     { day: 'S', value: 90 },
     { day: 'S', value: 70 },
  ]);

  const [metrics, setMetrics] = useState({
      visitors: 1248,
      revenue: 45290,
      conversion: 3.8
  });

  const [notification, setNotification] = useState(null);

  // Actions
  const [orders, setOrders] = useState([
      { id: "ORD-7829", customer: "Sarah Jenkins", items: 3, total: 450, status: "Shipped", date: "2 hrs ago" },
      { id: "ORD-7828", customer: "Mike Ross", items: 1, total: 120, status: "Processing", date: "5 hrs ago" }
  ]);

  const addLead = (lead) => {
      const newLead = {
          id: Date.now(),
          status: "New",
          date: "Just now",
          ...lead
      };
      setLeads(prev => [newLead, ...prev]);
  };

  const addOrder = (order) => {
      const newOrder = {
          id: `ORD-${Math.floor(Math.random() * 10000)}`,
          status: "New",
          date: "Just now",
          ...order
      };
      setOrders(prev => [newOrder, ...prev]);
      recordSale(order.total);
  };

  const recordSale = (amount) => {
      setMetrics(prev => ({
          ...prev,
          revenue: prev.revenue + amount,
          visitors: prev.visitors + 1, // Simulating a visitor becoming a customer
          conversion: ((prev.revenue + amount) / 10000).toFixed(1) // Mock calc
      }));

      // Update sales chart (mock logic - just adding to last day for demo)
      setSales(prev => {
          const newSales = [...prev];
          newSales[newSales.length - 1].value += 10; // Visual bump
          return newSales;
      });
  };

  const updateOrderStatus = (id, status) => {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const showNotification = (msg) => {
      setNotification(msg);
      setTimeout(() => setNotification(null), 3000);
  };

  return (
    <MerchantContext.Provider value={{ leads, sales, metrics, addLead, recordSale, notification, orders, addOrder, updateOrderStatus }}>
      {children}
      {/* Global Admin Toaster */}
      {notification && (
          <div className="fixed bottom-6 left-6 z-[60] bg-luxury text-white px-6 py-4 rounded-xl shadow-2xl animate-slide-up flex items-center gap-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="font-bold text-sm">{notification}</span>
          </div>
      )}
    </MerchantContext.Provider>
  );
};
