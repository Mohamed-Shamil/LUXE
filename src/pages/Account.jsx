import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoyalty } from '../context/LoyaltyContext';
import { Crown, Package, Settings, LogOut, MapPin, CreditCard, Bell, User, Plus, Edit, Trash2, ChevronRight, Truck, CheckCircle, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';

// Mock Addresses
const MOCK_ADDRESSES = [
  { id: 1, label: 'Home', name: 'John Doe', street: '123 Main Street', city: 'New York', state: 'NY', zip: '10001', phone: '+1 234 567 8900', isDefault: true },
  { id: 2, label: 'Office', name: 'John Doe', street: '456 Business Ave, Suite 200', city: 'New York', state: 'NY', zip: '10002', phone: '+1 234 567 8901', isDefault: false },
];

// Mock User Orders (more detailed)
const MOCK_USER_ORDERS = [
  { id: '#ORD-7834', date: 'Dec 28, 2024', items: 3, total: 485, status: 'Delivered', tracking: 'LUXE12345678' },
  { id: '#ORD-7712', date: 'Dec 15, 2024', items: 2, total: 290, status: 'Shipped', tracking: 'LUXE12345679' },
  { id: '#ORD-7698', date: 'Nov 30, 2024', items: 1, total: 180, status: 'Delivered', tracking: 'LUXE12345680' },
  { id: '#ORD-7545', date: 'Nov 12, 2024', items: 4, total: 650, status: 'Delivered', tracking: 'LUXE12345681' },
];

const Account = () => {
  const { points, tier } = useLoyalty();
  const [activeSection, setActiveSection] = useState('orders');
  const [addresses, setAddresses] = useState(MOCK_ADDRESSES);
  const [orders] = useState(MOCK_USER_ORDERS);

  const sections = [
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const setDefaultAddress = (id) => {
    setAddresses(prev => prev.map(addr => ({ ...addr, isDefault: addr.id === id })));
  };

  const deleteAddress = (id) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 bg-luxury rounded-full flex items-center justify-center text-white text-2xl font-serif font-bold">
                JD
             </div>
             <div>
                <h1 className="text-2xl font-bold text-luxury">John Doe</h1>
                <span className="text-secondary font-medium flex items-center gap-2">
                   <Crown className="w-4 h-4 fill-current" /> {tier} Member
                </span>
             </div>
          </div>

          {/* Loyalty Points Summary */}
          <div className="bg-luxury text-white px-6 py-4 rounded-2xl flex items-center gap-6">
             <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Points Balance</p>
                <p className="text-2xl font-bold">{points}</p>
             </div>
             <div className="w-px h-10 bg-white/20" />
             <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Next Reward</p>
                <p className="text-sm font-medium">250 pts away</p>
             </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="md:w-64 shrink-0">
             <div className="bg-white rounded-2xl shadow-sm p-4 sticky top-32">
                <nav className="space-y-1">
                   {sections.map(section => (
                      <button 
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full text-left p-4 rounded-xl flex items-center gap-3 transition-all ${
                          activeSection === section.id 
                            ? 'bg-luxury text-white' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-luxury'
                        }`}
                      >
                        <section.icon className="w-5 h-5" />
                        <span className="font-medium">{section.label}</span>
                        <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${activeSection === section.id ? 'text-white' : 'text-gray-300'}`} />
                      </button>
                   ))}
                </nav>

                <div className="mt-6 pt-6 border-t border-gray-100">
                   <button className="w-full text-left p-4 rounded-xl flex items-center gap-3 text-red-500 hover:bg-red-50 transition-colors">
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Sign Out</span>
                   </button>
                </div>
             </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
             <AnimatePresence mode="wait">
                <motion.div
                   key={activeSection}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   transition={{ duration: 0.2 }}
                >
                   {/* Orders Section */}
                   {activeSection === 'orders' && (
                      <div className="space-y-6">
                         <h2 className="text-2xl font-serif font-bold text-luxury">Order History</h2>
                         
                         {orders.map(order => (
                            <div key={order.id} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                  <div>
                                     <p className="font-bold text-luxury text-lg">{order.id}</p>
                                     <p className="text-sm text-gray-500">{order.date} • {order.items} items</p>
                                  </div>
                                  <div className="flex items-center gap-4">
                                     <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                                        'bg-gray-100 text-gray-700'
                                     }`}>
                                        {order.status === 'Delivered' && <CheckCircle className="w-3 h-3 inline mr-1" />}
                                        {order.status === 'Shipped' && <Truck className="w-3 h-3 inline mr-1" />}
                                        {order.status}
                                     </span>
                                     <span className="font-bold text-luxury text-lg">${order.total}</span>
                                  </div>
                               </div>
                               
                               <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                                  <button className="text-sm font-medium text-luxury hover:underline flex items-center gap-1">
                                    View Details <ChevronRight className="w-4 h-4" />
                                  </button>
                                  {order.status === 'Shipped' && (
                                    <button className="text-sm font-medium text-gray-500 hover:text-luxury flex items-center gap-1">
                                      <Truck className="w-4 h-4" /> Track Order
                                    </button>
                                  )}
                                  {order.status === 'Delivered' && (
                                    <button className="text-sm font-medium text-gray-500 hover:text-luxury flex items-center gap-1">
                                      Request Return
                                    </button>
                                  )}
                               </div>
                            </div>
                         ))}
                      </div>
                   )}

                   {/* Addresses Section */}
                   {activeSection === 'addresses' && (
                      <div className="space-y-6">
                         <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-serif font-bold text-luxury">Saved Addresses</h2>
                            <Button size="sm" className="flex items-center gap-2">
                               <Plus className="w-4 h-4" /> Add New
                            </Button>
                         </div>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {addresses.map(address => (
                               <div key={address.id} className={`bg-white rounded-2xl shadow-sm p-6 relative ${address.isDefault ? 'ring-2 ring-secondary' : ''}`}>
                                  {address.isDefault && (
                                     <span className="absolute top-4 right-4 bg-secondary text-luxury text-xs font-bold px-2 py-1 rounded">Default</span>
                                  )}
                                  <p className="font-bold text-luxury mb-1">{address.label}</p>
                                  <p className="text-gray-600 text-sm">{address.name}</p>
                                  <p className="text-gray-600 text-sm">{address.street}</p>
                                  <p className="text-gray-600 text-sm">{address.city}, {address.state} {address.zip}</p>
                                  <p className="text-gray-500 text-sm mt-2">{address.phone}</p>
                                  
                                  <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100">
                                     <button className="text-sm text-gray-500 hover:text-luxury flex items-center gap-1">
                                       <Edit className="w-4 h-4" /> Edit
                                     </button>
                                     {!address.isDefault && (
                                       <>
                                         <button 
                                           onClick={() => setDefaultAddress(address.id)}
                                           className="text-sm text-gray-500 hover:text-luxury"
                                         >
                                           Set Default
                                         </button>
                                         <button 
                                           onClick={() => deleteAddress(address.id)}
                                           className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
                                         >
                                           <Trash2 className="w-4 h-4" /> Remove
                                         </button>
                                       </>
                                     )}
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                   )}

                   {/* Settings Section */}
                   {activeSection === 'settings' && (
                      <div className="space-y-8">
                         <h2 className="text-2xl font-serif font-bold text-luxury">Account Settings</h2>
                         
                         {/* Profile Settings */}
                         <div className="bg-white rounded-2xl shadow-sm p-8">
                            <h3 className="font-bold text-lg text-luxury mb-6 flex items-center gap-2">
                              <User className="w-5 h-5 text-gray-400" /> Profile Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               <div>
                                  <label className="text-sm text-gray-500 mb-2 block">First Name</label>
                                  <input type="text" defaultValue="John" className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-luxury" />
                               </div>
                               <div>
                                  <label className="text-sm text-gray-500 mb-2 block">Last Name</label>
                                  <input type="text" defaultValue="Doe" className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-luxury" />
                               </div>
                               <div>
                                  <label className="text-sm text-gray-500 mb-2 block">Email</label>
                                  <input type="email" defaultValue="john.doe@example.com" className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-luxury" />
                               </div>
                               <div>
                                  <label className="text-sm text-gray-500 mb-2 block">Phone</label>
                                  <input type="tel" defaultValue="+1 234 567 8900" className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-luxury" />
                               </div>
                            </div>
                            <Button className="mt-6">Save Changes</Button>
                         </div>

                         {/* Notification Preferences */}
                         <div className="bg-white rounded-2xl shadow-sm p-8">
                            <h3 className="font-bold text-lg text-luxury mb-6 flex items-center gap-2">
                              <Bell className="w-5 h-5 text-gray-400" /> Notification Preferences
                            </h3>
                            <div className="space-y-4">
                               {[
                                 { label: 'Order Updates', desc: 'Get notified about order status changes' },
                                 { label: 'Promotions', desc: 'Receive special offers and discounts' },
                                 { label: 'Newsletter', desc: 'Weekly style tips and new arrivals' },
                               ].map((pref, i) => (
                                  <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                                     <div>
                                        <p className="font-medium text-luxury">{pref.label}</p>
                                        <p className="text-sm text-gray-500">{pref.desc}</p>
                                     </div>
                                     <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                                     </label>
                                  </div>
                               ))}
                            </div>
                         </div>

                         {/* Password Change */}
                         <div className="bg-white rounded-2xl shadow-sm p-8">
                            <h3 className="font-bold text-lg text-luxury mb-6 flex items-center gap-2">
                              <CreditCard className="w-5 h-5 text-gray-400" /> Security
                            </h3>
                            <button className="text-luxury font-medium hover:underline">Change Password →</button>
                         </div>
                      </div>
                   )}
                </motion.div>
             </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
