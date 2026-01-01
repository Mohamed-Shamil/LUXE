import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

// Mock admin users for demo
const MOCK_ADMINS = [
  { id: 1, email: 'admin@luxe.com', password: 'admin123', name: 'Super Admin', role: 'super_admin', avatar: 'SA' },
  { id: 2, email: 'manager@luxe.com', password: 'manager123', name: 'Store Manager', role: 'manager', avatar: 'SM' },
  { id: 3, email: 'support@luxe.com', password: 'support123', name: 'Support Agent', role: 'support', avatar: 'SP' },
];

// Role permissions
const PERMISSIONS = {
  super_admin: ['read', 'write', 'delete', 'settings', 'users'],
  manager: ['read', 'write', 'delete'],
  support: ['read'],
};

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activityLog, setActivityLog] = useState([
    { id: 1, action: 'Logged in', user: 'Super Admin', time: '2 hours ago' },
    { id: 2, action: 'Updated product "Executive Blazer"', user: 'Store Manager', time: '3 hours ago' },
    { id: 3, action: 'Processed refund #7821', user: 'Support Agent', time: '5 hours ago' },
  ]);

  // Check for existing session on mount
  useEffect(() => {
    const savedAdmin = localStorage.getItem('luxe_admin');
    if (savedAdmin) {
      const parsed = JSON.parse(savedAdmin);
      setAdmin(parsed);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email, password) => {
    const found = MOCK_ADMINS.find(a => a.email === email && a.password === password);
    if (found) {
      const adminData = { ...found, password: undefined };
      setAdmin(adminData);
      setIsAuthenticated(true);
      localStorage.setItem('luxe_admin', JSON.stringify(adminData));
      logActivity(`Logged in`);
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    logActivity('Logged out');
    setAdmin(null);
    setIsAuthenticated(false);
    localStorage.removeItem('luxe_admin');
  };

  const hasPermission = (permission) => {
    if (!admin) return false;
    return PERMISSIONS[admin.role]?.includes(permission) || false;
  };

  const logActivity = (action) => {
    const newLog = {
      id: Date.now(),
      action,
      user: admin?.name || 'System',
      time: 'Just now',
    };
    setActivityLog(prev => [newLog, ...prev.slice(0, 49)]);
  };

  return (
    <AdminContext.Provider value={{
      admin,
      isAuthenticated,
      login,
      logout,
      hasPermission,
      activityLog,
      logActivity,
      MOCK_ADMINS, // For demo credential hints
    }}>
      {children}
    </AdminContext.Provider>
  );
};
