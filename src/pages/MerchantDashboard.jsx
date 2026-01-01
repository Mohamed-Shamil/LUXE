import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Activity, Package, FileText, Settings, ToggleLeft, ToggleRight, Zap, UserCircle, LogOut, Shield, Clock, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useMerchant } from '../context/MerchantContext';
import { useShowcase } from '../context/ShowcaseContext';
import { useAdmin } from '../context/AdminContext';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

// Using CSS-only charts for zero-dependency speed
const SimpleBarChart = ({ data }) => (
   <div className="flex items-end gap-2 h-32 w-full">
      {data.map((d, i) => (
         <div key={i} className="flex-1 flex flex-col justify-end group cursor-pointer">
            <div 
               className="bg-secondary/20 group-hover:bg-secondary transition-all rounded-t-sm w-full relative"
               style={{ height: `${d.value}%` }}
            >
               <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  {d.value}
               </span>
            </div>
            <span className="text-[10px] text-gray-400 text-center mt-1">{d.day}</span>
         </div>
      ))}
   </div>
);

// Mock Customers Data
const MOCK_CUSTOMERS = [
  { id: 1, name: "Sarah Jenkins", email: "sarah@example.com", orders: 12, total: 2450, status: "VIP", joined: "Jan 2024" },
  { id: 2, name: "Mike Ross", email: "mike@example.com", orders: 5, total: 890, status: "Active", joined: "Mar 2024" },
  { id: 3, name: "Emily Chen", email: "emily@example.com", orders: 8, total: 1560, status: "Active", joined: "Feb 2024" },
  { id: 4, name: "John Doe", email: "john@example.com", orders: 1, total: 125, status: "New", joined: "Dec 2024" },
];

const MerchantDashboard = () => {
  const { leads, sales, metrics, orders, updateOrderStatus } = useMerchant();
  const { settings, updateSetting } = useShowcase();
  const { admin, isAuthenticated, logout, activityLog, hasPermission } = useAdmin();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock Products Data for Management Demo
  const [products, setProducts] = useState([
     { id: 1, name: "The Executive Blazer", stock: 12, price: 350, status: "Active", sku: "BLZ-001" },
     { id: 2, name: "Silk Touch Blouse", stock: 5, price: 180, status: "Low Stock", sku: "BLS-002" },
     { id: 3, name: "Statement Gold Cuff", stock: 24, price: 95, status: "Active", sku: "ACC-003" },
     { id: 4, name: "Tailored Wool Trousers", stock: 18, price: 245, status: "Active", sku: "TRS-004" },
  ]);

  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);

  const tabs = [
      { id: 'overview', label: 'Overview', icon: Activity },
      { id: 'orders', label: 'Orders', icon: FileText },
      { id: 'products', label: 'Products', icon: Package },
      { id: 'customers', label: 'Customers', icon: Users },
      { id: 'ab-test', label: 'A/B Testing', icon: Zap },
      { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-luxury text-white">
      <div className="container mx-auto px-6">
         {/* Header */}
         <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6">
            <div>
               <span className="text-secondary font-bold uppercase tracking-widest text-sm">Admin Portal</span>
               <h1 className="text-4xl font-serif font-bold mt-2">Mission Control</h1>
            </div>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
               {/* Admin Info */}
               {admin && (
                 <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl">
                    <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center text-luxury font-bold text-sm">
                      {admin.avatar}
                    </div>
                    <div>
                       <p className="text-sm font-medium">{admin.name}</p>
                       <p className="text-[10px] text-gray-400 uppercase tracking-wider">{admin.role?.replace('_', ' ')}</p>
                    </div>
                 </div>
               )}
               <button 
                 onClick={handleLogout}
                 className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
               >
                 <LogOut className="w-4 h-4" />
                 <span className="text-sm">Logout</span>
               </button>
            </div>
         </div>

         {/* Navigation Tabs */}
         <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
             {tabs.map(tab => (
                 <button 
                     key={tab.id}
                     onClick={() => setActiveTab(tab.id)}
                     className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all font-medium whitespace-nowrap ${activeTab === tab.id ? 'bg-secondary text-luxury shadow-lg shadow-secondary/20' : 'bg-white/5 hover:bg-white/10 text-gray-400'}`}
                 >
                     <tab.icon className="w-4 h-4" />
                     {tab.label}
                 </button>
             ))}
         </div>

         <AnimatePresence mode='wait'>
             <motion.div 
                 key={activeTab}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 transition={{ duration: 0.2 }}
             >
                 {activeTab === 'overview' && (
                     <>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                            {[
                                { label: "Real-time Visitors", value: metrics.visitors.toLocaleString(), icon: Users, change: "+12%" },
                                { label: "Daily Revenue", value: `$${metrics.revenue.toLocaleString()}`, icon: DollarSign, change: "+8%" },
                                { label: "Conversion Rate", value: `${metrics.conversion}%`, icon: TrendingUp, change: "+1.2%" },
                                { label: "Avg Order Value", value: "$125", icon: Activity, change: "+5%" }
                            ].map((stat, i) => (
                                <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                                    <div className="flex justify-between items-start mb-4">
                                        <stat.icon className="w-6 h-6 text-gray-400" />
                                        <span className="text-green-400 text-xs font-bold bg-green-500/10 px-2 py-1 rounded-full">{stat.change}</span>
                                    </div>
                                    <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                                    <p className="text-gray-400 text-sm">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Sales Chart */}
                            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                                <h3 className="font-bold mb-8 flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-secondary" /> Sales Performance
                                </h3>
                                <SimpleBarChart data={sales} />
                            </div>

                            {/* Activity Log */}
                            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                                <h3 className="font-bold mb-6 flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-secondary" /> Activity Log
                                </h3>
                                <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar">
                                    {activityLog.slice(0, 10).map((log) => (
                                        <div key={log.id} className="flex items-start gap-3 text-sm">
                                            <div className="w-2 h-2 bg-secondary rounded-full mt-2 shrink-0" />
                                            <div className="flex-1">
                                                <p className="text-gray-300">{log.action}</p>
                                                <p className="text-xs text-gray-500">{log.user} • {log.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                     </>
                 )}

                 {activeTab === 'orders' && (
                     <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                         <div className="p-6 border-b border-white/10">
                             <h3 className="font-bold text-xl">Recent Orders</h3>
                         </div>
                         <div className="overflow-x-auto">
                             <table className="w-full text-left">
                                 <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
                                     <tr>
                                         <th className="p-4">Order ID</th>
                                         <th className="p-4">Customer</th>
                                         <th className="p-4">Total</th>
                                         <th className="p-4">Status</th>
                                         <th className="p-4 text-right">Actions</th>
                                     </tr>
                                 </thead>
                                 <tbody className="divide-y divide-white/5">
                                     {orders.map(order => (
                                         <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                             <td className="p-4 font-mono text-secondary">{order.id}</td>
                                             <td className="p-4">
                                                 <div className="font-bold">{order.customer}</div>
                                                 <div className="text-xs text-gray-500">{order.items} items</div>
                                             </td>
                                             <td className="p-4">${order.total}</td>
                                             <td className="p-4">
                                                 <span className={`px-2 py-1 rounded text-xs font-bold ${
                                                     order.status === 'Shipped' ? 'bg-green-500/20 text-green-400' : 
                                                     order.status === 'New' ? 'bg-blue-500/20 text-blue-400' : 
                                                     'bg-gray-500/20 text-gray-400'
                                                 }`}>
                                                     {order.status}
                                                 </span>
                                             </td>
                                             <td className="p-4 text-right">
                                                 <button 
                                                    onClick={() => updateOrderStatus(order.id, 'Shipped')}
                                                    className="text-xs bg-secondary text-luxury px-3 py-1 rounded hover:bg-white transition-colors"
                                                 >
                                                     Mark Shipped
                                                 </button>
                                             </td>
                                         </tr>
                                     ))}
                                 </tbody>
                             </table>
                         </div>
                     </div>
                 )}

                 {activeTab === 'products' && (
                     <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                         <div className="p-6 border-b border-white/10 flex justify-between items-center">
                             <h3 className="font-bold text-xl">Product Inventory</h3>
                             <Button size="sm" className="flex items-center gap-2">
                                <Plus className="w-4 h-4" /> Add Product
                             </Button>
                         </div>
                         <table className="w-full text-left">
                             <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
                                 <tr>
                                     <th className="p-4">Product</th>
                                     <th className="p-4">SKU</th>
                                     <th className="p-4">Stock</th>
                                     <th className="p-4">Price</th>
                                     <th className="p-4">Status</th>
                                     <th className="p-4 text-right">Actions</th>
                                 </tr>
                             </thead>
                             <tbody className="divide-y divide-white/5">
                                 {products.map(product => (
                                     <tr key={product.id} className="hover:bg-white/5 transition-colors">
                                         <td className="p-4 font-bold">{product.name}</td>
                                         <td className="p-4 font-mono text-gray-400 text-sm">{product.sku}</td>
                                         <td className="p-4">{product.stock} units</td>
                                         <td className="p-4">${product.price}</td>
                                         <td className="p-4">
                                             <span className={`px-2 py-1 rounded text-xs font-bold ${product.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                                 {product.status}
                                             </span>
                                         </td>
                                         <td className="p-4 text-right flex justify-end gap-2">
                                             <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                                               <Edit className="w-4 h-4" />
                                             </button>
                                             <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors">
                                               <Trash2 className="w-4 h-4" />
                                             </button>
                                         </td>
                                     </tr>
                                 ))}
                             </tbody>
                         </table>
                     </div>
                 )}

                 {activeTab === 'customers' && (
                     <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                         <div className="p-6 border-b border-white/10">
                             <h3 className="font-bold text-xl">Customer Management</h3>
                         </div>
                         <table className="w-full text-left">
                             <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
                                 <tr>
                                     <th className="p-4">Customer</th>
                                     <th className="p-4">Orders</th>
                                     <th className="p-4">Total Spent</th>
                                     <th className="p-4">Status</th>
                                     <th className="p-4">Joined</th>
                                     <th className="p-4 text-right">Actions</th>
                                 </tr>
                             </thead>
                             <tbody className="divide-y divide-white/5">
                                 {customers.map(customer => (
                                     <tr key={customer.id} className="hover:bg-white/5 transition-colors">
                                         <td className="p-4">
                                             <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center text-secondary font-bold">
                                                  {customer.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                  <div className="font-bold">{customer.name}</div>
                                                  <div className="text-xs text-gray-500">{customer.email}</div>
                                                </div>
                                             </div>
                                         </td>
                                         <td className="p-4">{customer.orders}</td>
                                         <td className="p-4 font-mono">${customer.total}</td>
                                         <td className="p-4">
                                             <span className={`px-2 py-1 rounded text-xs font-bold ${
                                                 customer.status === 'VIP' ? 'bg-amber-500/20 text-amber-400' : 
                                                 customer.status === 'New' ? 'bg-blue-500/20 text-blue-400' : 
                                                 'bg-green-500/20 text-green-400'
                                             }`}>
                                                 {customer.status}
                                             </span>
                                         </td>
                                         <td className="p-4 text-gray-400">{customer.joined}</td>
                                         <td className="p-4 text-right">
                                             <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                                               <Eye className="w-4 h-4" />
                                             </button>
                                         </td>
                                     </tr>
                                 ))}
                             </tbody>
                         </table>
                     </div>
                 )}

                 {activeTab === 'ab-test' && (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                             <div className="flex items-center gap-3 mb-6">
                                 <Zap className="w-6 h-6 text-yellow-500 fill-current" />
                                 <h3 className="font-bold text-xl">A/B Testing Simulator</h3>
                             </div>
                             <p className="text-gray-400 mb-8">Control live experiments visible to the user. Toggling these switches will instantly update the storefront.</p>
                             
                             <div className="space-y-6">
                                 {/* Hero Variant */}
                                 <div className="bg-white/5 p-4 rounded-xl flex justify-between items-center">
                                     <div>
                                         <h4 className="font-bold">Hero Section Variant</h4>
                                         <p className="text-xs text-gray-500">Video vs. Static Image logic</p>
                                     </div>
                                     <div className="flex bg-black/20 p-1 rounded-lg">
                                         <button 
                                             onClick={() => updateSetting('heroStyle', 'video')}
                                             className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${settings.heroStyle === 'video' ? 'bg-secondary text-luxury' : 'text-gray-500'}`}
                                         >
                                             Video
                                         </button>
                                         <button 
                                             onClick={() => updateSetting('heroStyle', 'static')}
                                             className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${settings.heroStyle === 'static' ? 'bg-secondary text-luxury' : 'text-gray-500'}`}
                                         >
                                             Static
                                         </button>
                                     </div>
                                 </div>

                                 {/* FOMO Toggle */}
                                 <div className="bg-white/5 p-4 rounded-xl flex justify-between items-center">
                                     <div>
                                         <h4 className="font-bold">Scarcity / FOMO Mode</h4>
                                         <p className="text-xs text-gray-500">Triggers "High Demand" badges</p>
                                     </div>
                                     <button 
                                         onClick={() => updateSetting('showFomo', !settings.showFomo)}
                                         className={`transition-colors ${settings.showFomo ? 'text-green-500' : 'text-gray-600'}`}
                                     >
                                         {settings.showFomo ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10" />}
                                     </button>
                                 </div>
                             </div>
                         </div>
                     </div>
                 )}

                 {activeTab === 'settings' && (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         {/* Store Settings */}
                         <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                             <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                                <Settings className="w-5 h-5 text-secondary" /> Store Settings
                             </h3>
                             <div className="space-y-6">
                                 <div>
                                     <label className="text-sm text-gray-400 mb-2 block">Store Name</label>
                                     <input 
                                       type="text" 
                                       defaultValue="LUXE." 
                                       className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-secondary transition-colors"
                                     />
                                 </div>
                                 <div>
                                     <label className="text-sm text-gray-400 mb-2 block">Currency</label>
                                     <select className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-secondary">
                                         <option value="USD">USD ($)</option>
                                         <option value="EUR">EUR (€)</option>
                                         <option value="GBP">GBP (£)</option>
                                     </select>
                                 </div>
                                 <div>
                                     <label className="text-sm text-gray-400 mb-2 block">Time Zone</label>
                                     <select className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-secondary">
                                         <option>UTC-5 (Eastern)</option>
                                         <option>UTC-8 (Pacific)</option>
                                         <option>UTC+0 (GMT)</option>
                                         <option>UTC+5:30 (IST)</option>
                                     </select>
                                 </div>
                                 <Button fullWidth>Save Settings</Button>
                             </div>
                         </div>

                         {/* Security / Roles */}
                         <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                             <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-secondary" /> Security & Roles
                             </h3>
                             <div className="space-y-4">
                                 {[
                                   { role: 'Super Admin', perms: 'Full Access', color: 'text-amber-400' },
                                   { role: 'Manager', perms: 'Read, Write, Delete', color: 'text-blue-400' },
                                   { role: 'Support', perms: 'Read Only', color: 'text-gray-400' },
                                 ].map(r => (
                                   <div key={r.role} className="bg-white/5 p-4 rounded-xl flex justify-between items-center">
                                       <div>
                                           <h4 className={`font-bold ${r.color}`}>{r.role}</h4>
                                           <p className="text-xs text-gray-500">{r.perms}</p>
                                       </div>
                                       <button className="text-xs text-gray-400 hover:text-white transition-colors">
                                         Edit
                                       </button>
                                   </div>
                                 ))}
                             </div>

                             <div className="mt-8 pt-6 border-t border-white/10">
                                 <h4 className="font-bold mb-4 text-sm">Current Session</h4>
                                 <div className="bg-white/5 p-4 rounded-xl">
                                     <p className="text-sm">{admin?.name || 'Not logged in'}</p>
                                     <p className="text-xs text-gray-500">Role: {admin?.role?.replace('_', ' ') || 'N/A'}</p>
                                 </div>
                             </div>
                         </div>
                     </div>
                 )}
             </motion.div>
         </AnimatePresence>
      </div>
    </div>
  );
};

export default MerchantDashboard;
