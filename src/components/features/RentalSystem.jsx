import React, { useState } from 'react';
import { Calendar, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const RentalSystem = ({ dailyRate }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isActive, setIsActive] = useState(false);

    const calculateTotal = () => {
        if (!startDate || !endDate) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays * dailyRate;
    };

    const total = calculateTotal();

    return (
        <div className="mb-6">
             <div className="flex items-center justify-between mb-4">
                 <label className="flex items-center gap-2 font-bold text-luxury cursor-pointer">
                     <input type="checkbox" className="w-5 h-5 accent-luxury" checked={isActive} onChange={() => setIsActive(!isActive)} />
                     <span>Rent this Look</span>
                     <span className="text-xs font-normal text-white bg-luxury px-2 py-0.5 rounded ml-2">New Hybrid Feature</span>
                 </label>
                 {isActive && <span className="text-secondary font-bold">${dailyRate} / day</span>}
             </div>

             <AnimatePresence>
                 {isActive && (
                     <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-gray-50 p-4 rounded-xl border border-gray-200"
                     >
                         <h4 className="text-xs font-bold uppercase text-gray-500 mb-3 flex items-center gap-1">
                             <Calendar className="w-3 h-3" /> Select Dates
                         </h4>
                         <div className="grid grid-cols-2 gap-4 mb-4">
                             <div>
                                 <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Start Date</label>
                                 <input type="date" className="w-full text-sm p-2 border rounded-lg" value={startDate} onChange={e => setStartDate(e.target.value)} />
                             </div>
                             <div>
                                 <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">End Date</label>
                                 <input type="date" className="w-full text-sm p-2 border rounded-lg" value={endDate} onChange={e => setEndDate(e.target.value)} />
                             </div>
                         </div>
                         
                         {total > 0 && (
                             <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                                 <span className="text-sm font-medium text-gray-600">Total Estimate</span>
                                 <span className="text-lg font-bold text-luxury">${total}</span>
                             </div>
                         )}
                         <div className="flex gap-2 mt-3 text-[10px] text-gray-500">
                             <Info className="w-3 h-3" />
                             <p>Includes dry cleaning and insurance. $50 deposit required.</p>
                         </div>
                     </motion.div>
                 )}
             </AnimatePresence>
        </div>
    );
};
