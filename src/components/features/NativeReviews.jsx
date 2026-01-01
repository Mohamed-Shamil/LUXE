import React, { useState } from 'react';
import { Star, ThumbsUp, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';

export const NativeReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([
    { id: 1, user: "Sarah M.", rating: 5, date: "2 days ago", text: "Absolutely stunning quality. The fabric feels incredible.", helpful: 12 },
    { id: 2, user: "James L.", rating: 5, date: "1 week ago", text: "Fast shipping and great packaging. Will buy again.", helpful: 8 },
    { id: 3, user: "Emily R.", rating: 4, date: "2 weeks ago", text: "Love the fit, but I wish it came in more colors.", helpful: 5 }
  ]);
  const [isWriting, setIsWriting] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-2xl font-serif font-bold text-luxury mb-2">Customer Reviews</h3>
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-500">
               {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <span className="font-bold text-luxury">4.8</span>
            <span className="text-gray-400">({reviews.length} native reviews)</span>
          </div>
        </div>
        <Button onClick={() => setIsWriting(!isWriting)} variant="outline">
          Write a Review
        </Button>
      </div>

      <AnimatePresence>
         {isWriting && (
            <motion.div 
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: 'auto' }}
               exit={{ opacity: 0, height: 0 }}
               className="mb-8 overflow-hidden"
            >
               <form className="bg-gray-50 p-6 rounded-xl space-y-4" onSubmit={(e) => { e.preventDefault(); setIsWriting(false); }}>
                  <h4 className="font-bold text-luxury">Share your experience</h4>
                  <div className="flex gap-1 text-gray-300">
                     {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 hover:text-yellow-500 cursor-pointer transition-colors" />)}
                  </div>
                  <textarea className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:border-luxury" rows="3" placeholder="How was the product?" />
                  <div className="flex justify-end gap-4">
                     <button type="button" onClick={() => setIsWriting(false)} className="text-gray-500 hover:text-luxury text-sm">Cancel</button>
                     <Button type="submit">Submit Review</Button>
                  </div>
               </form>
            </motion.div>
         )}
      </AnimatePresence>

      <div className="space-y-8">
        {reviews.map(review => (
          <div key={review.id} className="border-b border-gray-50 last:border-0 pb-8 last:pb-0">
             <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-xs text-luxury">
                      {review.user.charAt(0)}
                   </div>
                   <span className="font-bold text-luxury text-sm">{review.user}</span>
                   <span className="flex items-center gap-1 text-green-600 text-xs font-medium bg-green-50 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3" /> Verified Buyer
                   </span>
                </div>
                <span className="text-xs text-gray-400">{review.date}</span>
             </div>
             <div className="flex text-yellow-500 mb-2">
                {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
             </div>
             <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {review.text}
             </p>
             <button className="flex items-center gap-2 text-xs text-gray-400 hover:text-luxury transition-colors">
                <ThumbsUp className="w-3 h-3" /> Helpful ({review.helpful})
             </button>
          </div>
        ))}
      </div>
    </div>
  );
};
