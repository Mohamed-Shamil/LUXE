import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Send, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { useMerchant } from '../../context/MerchantContext';

export const BulkQuoteForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { addLead } = useMerchant();
    const [formData, setFormData] = useState({ name: '', email: '', qty: '', company: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        addLead({
            type: "Bulk Quote",
            name: formData.company || "Unknown Company",
            value: `Est. $${formData.qty * 40 || 500}` // Mock value calculation
        });
        setIsSubmitted(true);
    };

    return (
        <div className="mt-6 border-t border-gray-100 pt-6">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-luxury transition-colors mb-4"
            >
                <Briefcase className="w-4 h-4" /> Ordering for Business / Bulk?
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-gray-50 rounded-xl p-6 border border-gray-200 overflow-hidden"
                    >
                        {isSubmitted ? (
                            <div className="text-center py-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Check className="w-6 h-6 text-green-600" />
                                </div>
                                <h4 className="font-bold text-luxury">Quote Requested!</h4>
                                <p className="text-sm text-gray-500">Our B2B team will contact you within 2 hours.</p>
                                <button onClick={() => setIsSubmitted(false)} className="text-xs text-luxury underline mt-2">New Request</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-3">
                                <h4 className="font-bold text-luxury text-sm mb-2">Get Wholesale Pricing</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <input 
                                        type="text" 
                                        placeholder="Company Name" 
                                        className="w-full p-2 text-sm border rounded-lg" 
                                        required 
                                        onChange={e => setFormData({...formData, company: e.target.value})}
                                    />
                                    <input type="text" placeholder="Tax ID / GST" className="w-full p-2 text-sm border rounded-lg" />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <input 
                                        type="number" 
                                        placeholder="Est. Quantity" 
                                        className="w-full p-2 text-sm border rounded-lg" 
                                        required 
                                        onChange={e => setFormData({...formData, qty: e.target.value})}
                                    />
                                    <input type="email" placeholder="Business Email" className="w-full p-2 text-sm border rounded-lg" required />
                                </div>
                                <textarea placeholder="Any specific requirements? (Logo branding, etc)" className="w-full p-2 text-sm border rounded-lg" rows="2"></textarea>
                                <Button fullWidth variant="primary" className="py-2 text-sm" icon={Send}>
                                    Request Quote
                                </Button>
                                <p className="text-[10px] text-gray-400 text-center">
                                    Exclusive rates for orders over 50+ units.
                                </p>
                            </form>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
