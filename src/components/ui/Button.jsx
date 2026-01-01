import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const variants = {
  primary: "bg-luxury text-white hover:bg-primary border border-transparent shadow-lg hover:shadow-xl",
  secondary: "bg-white text-luxury border border-luxury hover:bg-gray-50",
  outline: "bg-transparent text-luxury border-b border-luxury hover:border-b-2 rounded-none px-0 py-1",
  ghost: "bg-transparent text-accent hover:text-luxury hover:bg-gray-100",
};

export const Button = ({ 
  children, 
  variant = 'primary', 
  className, 
  icon: Icon,
  fullWidth,
  ...props 
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={twMerge(
        "flex items-center justify-center gap-2 px-6 py-3 font-medium transition-all duration-300 rounded-full",
        variants[variant],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {Boolean(Icon) && <Icon className="w-5 h-5" />}
      {children}
    </motion.button>
  );
};
