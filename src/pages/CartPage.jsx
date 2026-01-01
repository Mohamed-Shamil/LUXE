import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const { items, addToCart, removeFromCart, total } = useCart();
    const navigate = useNavigate();

    // Mock Up-sells
    const upsells = [
        { id: 991, name: "Premium Leather Belt", price: 85, image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=800" },
        { id: 992, name: "Silk Pocket Square", price: 45, image: "https://images.unsplash.com/photo-1596704017235-dca3d11d332d?auto=format&fit=crop&q=80&w=800" }
    ];

    if (items.length === 0) {
        return (
            <div className="min-h-screen pt-32 pb-20 bg-gray-50 flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-10 h-10 text-gray-400" />
                </div>
                <h1 className="text-3xl font-serif font-bold text-luxury mb-4">Your Cart is Empty</h1>
                <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Discover our premium collection and find your perfect look.</p>
                <Button onClick={() => navigate('/collections/all')}>
                    Start Shopping
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-6 max-w-6xl">
                <h1 className="text-4xl font-serif font-bold text-luxury mb-8">Shopping Bag ({items.length})</h1>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Cart Items */}
                    <div className="flex-1 space-y-6">
                        {items.map((item) => (
                            <motion.div 
                                layout
                                key={item.id} 
                                className="bg-white p-6 rounded-2xl shadow-sm flex gap-6"
                            >
                                <img src={item.image} alt={item.name} className="w-32 h-40 object-cover rounded-lg" />
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-serif font-bold text-luxury text-xl">{item.name}</h3>
                                            <button 
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <p className="text-gray-500 text-sm">Premium Collection</p>
                                    </div>

                                    <div className="flex justify-between items-end">
                                        <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-1">
                                            <button 
                                                className="p-2 hover:bg-white rounded-md transition-colors"
                                                onClick={() => removeFromCart(item.id)} // Assuming remove decreases quantity logic needs to be in context, but using remove for now as simple
                                            >
                                                <Minus className="w-4 h-4 text-gray-600" />
                                            </button>
                                            <span className="font-bold w-4 text-center">{item.quantity}</span>
                                            <button 
                                                className="p-2 hover:bg-white rounded-md transition-colors"
                                                onClick={() => addToCart(item)}
                                            >
                                                <Plus className="w-4 h-4 text-gray-600" />
                                            </button>
                                        </div>
                                        <span className="font-bold text-xl text-luxury">${item.price * item.quantity}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Summary Sidebar */}
                    <div className="w-full lg:w-96 space-y-6">
                        <div className="bg-white p-8 rounded-2xl shadow-sm sticky top-32">
                            <h2 className="font-serif font-bold text-xl text-luxury mb-6">Order Summary</h2>
                            
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${total}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-bold">Free</span>
                                </div>
                            </div>
                            
                            <div className="border-t border-gray-100 pt-6 mb-8 flex justify-between items-center font-bold text-xl text-luxury">
                                <span>Total</span>
                                <span>${total}</span>
                            </div>

                            <Button fullWidth onClick={() => navigate('/checkout')} className="py-4 text-lg">
                                Checkout <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>

                        {/* Upsells */}
                        <div className="bg-luxury/5 p-6 rounded-2xl">
                            <h3 className="font-bold text-luxury mb-4 text-sm uppercase tracking-wider">Complete the Look</h3>
                            <div className="space-y-4">
                                {upsells.map(item => (
                                    <div key={item.id} className="flex gap-4 bg-white p-3 rounded-xl">
                                        <img src={item.image} className="w-16 h-16 object-cover rounded-lg" alt={item.name} />
                                        <div className="flex-1">
                                            <h4 className="font-bold text-sm text-luxury">{item.name}</h4>
                                            <div className="flex justify-between items-center mt-2">
                                                <span className="text-sm text-gray-500">${item.price}</span>
                                                <button 
                                                    onClick={() => addToCart(item)}
                                                    className="w-8 h-8 flex items-center justify-center bg-luxury text-white rounded-full hover:bg-secondary transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
