import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const UserAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo: Just navigate to account
    navigate('/account');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070" 
          alt="Fashion" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-luxury/60" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-white">
            <h2 className="text-4xl font-serif font-bold mb-4">Welcome to LUXE.</h2>
            <p className="text-lg text-white/80 max-w-md">Experience luxury redefined. Join our community of discerning individuals.</p>
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="text-3xl font-serif font-bold text-luxury block mb-8">LUXE.</Link>
          
          <h1 className="text-3xl font-serif font-bold text-luxury mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-500 mb-8">
            {isLogin ? 'Sign in to access your account and continue shopping.' : 'Join us to unlock exclusive benefits and personalized experiences.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="text-sm font-medium text-luxury mb-2 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-luxury transition-colors"
                    placeholder="Enter your name"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-luxury mb-2 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-luxury transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-luxury mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl py-4 pl-12 pr-12 focus:outline-none focus:border-luxury transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-luxury"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-sm text-secondary hover:underline">
                  Forgot Password?
                </button>
              </div>
            )}

            <Button type="submit" fullWidth className="py-4 text-lg rounded-xl">
              {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-luxury font-bold ml-2 hover:text-secondary transition-colors"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          {!isLogin && (
            <div className="mt-8 bg-secondary/10 rounded-2xl p-6 flex items-start gap-4">
              <Sparkles className="w-6 h-6 text-secondary shrink-0" />
              <div>
                <h4 className="font-bold text-luxury mb-1">Join the Inner Circle</h4>
                <p className="text-sm text-gray-600">Get 15% off your first order and exclusive access to new collections.</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UserAuth;
