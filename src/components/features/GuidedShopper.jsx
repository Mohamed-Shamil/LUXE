import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCart } from '../../context/CartContext';

export const GuidedShopper = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const { addToCart, openCart } = useCart();

    const steps = [
        {
            id: 'gender',
            question: "First things first, who is this for?",
            options: ["Men", "Women", "Unisex / Couple", "Gifting"]
        },
        {
            id: 'age',
            question: "Got it. And what's the age vibe?",
            options: ["Teens (Trendy)", "20s-30s (Modern)", "40s+ (Classic)", "Ageless"]
        },
        {
            id: 'occasion',
            question: "Perfect. What's the occasion?",
            options: ["Casual Daily", "Work / Business", "Wedding / Event", "Vacation Mode"]
        },
        {
            id: 'style',
            question: "Last one! Pick a style personality:",
            options: ["Minimalist", "Bold & Statement", "Old Money Luxury", "Comfort First"]
        }
    ];

    const handleAnswer = (answer) => {
        setAnswers(prev => ({ ...prev, [steps[step].id]: answer }));
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            setStep('result');
        }
    };

    const skipToResults = () => {
        setStep('result');
    };

    // Mock Logic: In a real app, this would filter based on 'answers'
    // For now, we vary the bundle slightly based on gender if selected, or default.
    const getBundle = () => {
        const isFemale = answers['gender'] === 'Women';
        if (isFemale) {
            return [
                { id: 101, name: "Silk Touch Blouse", price: 180, image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&q=80&w=800" },
                { id: 102, name: "High-Waist Trousers", price: 210, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800" },
                { id: 103, name: "Statement Gold Cuff", price: 95, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800" }
            ];
        }
        return [
            { id: 201, name: "The Executive Blazer", price: 350, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800" },
            { id: 202, name: "Slim Fit Chinos", price: 210, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800" },
            { id: 203, name: "Oxford Cotton Shirt", price: 120, image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=800" }
        ];
    };

    const currentBundle = getBundle();
    const bundleTotal = currentBundle.reduce((sum, item) => sum + item.price, 0);

    const handleAddBundle = () => {
        currentBundle.forEach(item => {
            addToCart(item);
        });
        setIsOpen(false);
        setStep(0);
        openCart();
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans">
            {/* Trigger Button */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    onClick={() => setIsOpen(true)}
                    className="group bg-luxury text-white p-4 pr-6 rounded-full shadow-2xl hover:bg-primary transition-all flex items-center gap-3"
                >
                    <div className="bg-white/20 p-2 rounded-full group-hover:rotate-12 transition-transform">
                        <Sparkles className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="text-left">
                        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">Need help?</p>
                        <span className="font-serif font-bold text-sm">Ask Personal Stylist</span>
                    </div>
                </motion.button>
            )}

            {/* Chat Interface */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="bg-white rounded-2xl shadow-2xl w-80 md:w-96 overflow-hidden border border-gray-100 flex flex-col max-h-[600px]"
                    >
                        {/* Header */}
                        <div className="bg-luxury p-4 flex justify-between items-center text-white shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                                        <Sparkles className="w-5 h-5 text-secondary" />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-luxury rounded-full"></div>
                                </div>
                                <div>
                                    <h3 className="font-serif font-bold text-base">Personal Stylist</h3>
                                    <p className="text-[10px] text-gray-300 tracking-wide uppercase">AI Powered • Online</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="opacity-70 hover:opacity-100 transition-opacity">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Progress Bar */}
                        {step !== 'result' && (
                            <div className="h-1 bg-gray-100 w-full">
                                <motion.div 
                                    className="h-full bg-secondary"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                                />
                            </div>
                        )}

                        {/* Body */}
                        <div className="p-6 flex-1 flex flex-col overflow-y-auto">
                            {step === 'result' ? (
                                <div className="animate-fade-in flex flex-col h-full">
                                    <div className="text-center mb-6">
                                        <span className="inline-block px-3 py-1 bg-luxury/5 text-luxury text-[10px] font-bold uppercase tracking-wider rounded-full mb-2">Recommendation</span>
                                        <h3 className="font-serif font-bold text-2xl text-luxury">Your Curated Edit</h3>
                                        <p className="text-xs text-gray-500 mt-1">Based on your preferences</p>
                                    </div>
                                    
                                    <div className="space-y-3 flex-1 overflow-y-auto pr-1 custom-scrollbar">
                                        {currentBundle.map((item, i) => (
                                            <motion.div 
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                key={i} 
                                                className="flex gap-4 p-3 rounded-xl border border-gray-100 hover:border-luxury/20 transition-colors bg-gray-50/50"
                                            >
                                                <img src={item.image} className="w-16 h-16 object-cover rounded-lg shadow-sm" alt={item.name} />
                                                <div className="flex-1 flex flex-col justify-center">
                                                    <h4 className="font-serif font-bold text-luxury text-sm">{item.name}</h4>
                                                    <p className="text-xs text-gray-500">Premium Collection</p>
                                                    <p className="text-sm text-secondary font-bold mt-1">${item.price}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    
                                    <div className="mt-6 pt-4 border-t border-gray-100">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-sm text-gray-500">Total Bundle Price</span>
                                            <span className="font-serif font-bold text-xl text-luxury">${bundleTotal}</span>
                                        </div>
                                        <Button fullWidth onClick={handleAddBundle} className="mb-3 py-4 shadow-luxury/20 shadow-lg">
                                            Add All to Cart
                                        </Button>
                                        <button onClick={() => setStep(0)} className="w-full text-xs text-gray-400 hover:text-luxury transition-colors py-2">
                                            Start Over
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col">
                                    {/* Artificial "typing" delay or user message could go here */}
                                    <div className="bg-gray-100 self-start rounded-2xl rounded-tl-none p-4 mb-6 max-w-[90%] shadow-sm">
                                        <p className="text-sm text-gray-800 leading-relaxed font-medium">
                                            {steps[step].question}
                                        </p>
                                    </div>
                                    
                                    <div className="space-y-2.5 mt-auto">
                                        {steps[step].options.map((option, i) => (
                                            <motion.button
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                key={option}
                                                onClick={() => handleAnswer(option)}
                                                className="w-full text-left p-4 border border-gray-200 rounded-xl text-sm font-medium hover:border-luxury hover:bg-luxury/5 hover:text-luxury transition-all flex justify-between items-center group bg-white"
                                            >
                                                {option}
                                                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-luxury transition-colors" />
                                            </motion.button>
                                        ))}
                                    </div>

                                    {step > 0 && (
                                         <button 
                                            onClick={skipToResults}
                                            className="w-full text-center text-xs text-gray-400 hover:text-luxury mt-6 py-2 border-t border-gray-100"
                                         >
                                            Skip & Show {currentBundle.length} Results
                                         </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
