import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useMerchant } from '../context/MerchantContext';
import { Button } from '../components/ui/Button';
import { CheckCircle, Check } from 'lucide-react'; // Added Check
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Added useNavigate

const Checkout = () => {
    const { items, total, clearCart } = useCart(); // Added clearCart
    const { addOrder } = useMerchant(); // Changed to addOrder
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    // State for form inputs
    const [shippingDetails, setShippingDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
    });

    const handlePlaceOrder = () => {
        // Create full order object
        addOrder({
            customer: `${shippingDetails.firstName} ${shippingDetails.lastName}` || "Guest Customer",
            items: items.length,
            total: total,
            email: shippingDetails.email
        });
        
        clearCart(); 
        setStep(3); 
    };

    if (items.length === 0 && step !== 3) { // Adjusted condition to allow viewing confirmation after order
        return <div className="min-h-screen pt-32 text-center text-luxury">Your cart is empty.</div>;
    }

    if (step === 3) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-serif font-bold text-luxury mb-2">Order Confirmed!</h1>
                    <p className="text-gray-500 mb-8">Thank you for your purchase. Your order #LUX-{Math.floor(Math.random()*10000)} is on the way.</p>
                    <Button onClick={() => navigate('/')} fullWidth>Continue Shopping</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Summary */}
                        <div className="p-8 bg-luxury text-white">
                             <h2 className="text-2xl font-serif font-bold mb-8">Order Summary</h2>
                             <div className="space-y-4 mb-8">
                                 {items.map(item => (
                                     <div key={item.id} className="flex justify-between items-center text-sm">
                                         <span className="text-gray-300">{item.name} x {item.quantity}</span>
                                         <span>${item.price * item.quantity}</span>
                                     </div>
                                 ))}
                             </div>
                             <div className="border-t border-white/10 pt-4 flex justify-between font-bold text-lg">
                                 <span>Total</span>
                                 <span>${total}</span>
                             </div>
                        </div>

                        {/* Form */}
                        <div className="p-8">
                            {step === 1 ? (
                                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                                    <h2 className="text-2xl font-serif font-bold text-luxury mb-6">Shipping Details</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input 
                                            type="text" 
                                            placeholder="First Name" 
                                            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-luxury" 
                                            required 
                                            value={shippingDetails.firstName}
                                            onChange={(e) => setShippingDetails({...shippingDetails, firstName: e.target.value})}
                                        />
                                        <input 
                                            type="text" 
                                            placeholder="Last Name" 
                                            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-luxury" 
                                            required 
                                            value={shippingDetails.lastName}
                                            onChange={(e) => setShippingDetails({...shippingDetails, lastName: e.target.value})}
                                        />
                                    </div>
                                    <input 
                                        type="email" 
                                        placeholder="Email Address" 
                                        className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-luxury" 
                                        required 
                                        value={shippingDetails.email}
                                        onChange={(e) => setShippingDetails({...shippingDetails, email: e.target.value})}
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="Address" 
                                        className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-luxury" 
                                        required 
                                        value={shippingDetails.address}
                                        onChange={(e) => setShippingDetails({...shippingDetails, address: e.target.value})}
                                    />
                                    <Button fullWidth type="submit" className="mt-4">
                                        Proceed to Payment
                                    </Button>
                                </form>
                            ) : (
                                <div className="text-center py-10">
                                    <motion.div 
                                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                                      className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                                    >
                                        <CheckCircle className="w-10 h-10 text-green-600" />
                                    </motion.div>
                                    <h2 className="text-3xl font-serif font-bold text-luxury mb-4">Order Confirmed!</h2>
                                    <p className="text-gray-500 mb-8">Thank you for your purchase. You will receive an email shortly.</p>
                                    <Button onClick={() => window.location.href = '/'} variant="outline">
                                        Return to Home
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
