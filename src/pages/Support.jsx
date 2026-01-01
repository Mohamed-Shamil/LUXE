import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, Phone, MapPin, Send, FileText, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../components/ui/Button';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left"
      >
        <span className="font-medium text-luxury">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="pb-5 text-gray-600"
        >
          {answer}
        </motion.div>
      )}
    </div>
  );
};

const Support = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    { question: "How do I track my order?", answer: "Once your order ships, you'll receive an email with a tracking number. You can also view order status in your Account → Orders section." },
    { question: "What is your return policy?", answer: "We offer free returns within 30 days of purchase. Items must be unworn with original tags attached. Start a return from your Account page." },
    { question: "How long does shipping take?", answer: "Standard shipping takes 5-7 business days. Express shipping (free over $250) delivers in 2-3 business days." },
    { question: "Do you ship internationally?", answer: "Yes! We ship to over 50 countries. International shipping rates and times vary by destination." },
    { question: "How do I apply a coupon code?", answer: "Enter your coupon code at checkout in the 'Promo Code' field. Discounts will be applied to eligible items." },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-secondary font-bold tracking-widest uppercase text-sm">We're Here to Help</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-luxury mt-3 mb-4">Support Center</h1>
          <p className="text-gray-500 max-w-xl mx-auto">Have a question? We'd love to hear from you. Choose an option below or browse our FAQs.</p>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: MessageCircle, title: "Live Chat", desc: "Chat with our team", action: "Start Chat", highlight: true },
            { icon: Mail, title: "Email Us", desc: "support@luxe.com", action: "Send Email" },
            { icon: Phone, title: "Call Us", desc: "+1 (800) LUXE-123", action: "Call Now" },
          ].map((option, i) => (
            <motion.div 
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-3xl text-center ${option.highlight ? 'bg-luxury text-white' : 'bg-white shadow-sm'}`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${option.highlight ? 'bg-white/10' : 'bg-gray-50'}`}>
                <option.icon className={`w-7 h-7 ${option.highlight ? 'text-secondary' : 'text-luxury'}`} />
              </div>
              <h3 className="text-xl font-bold mb-2">{option.title}</h3>
              <p className={`text-sm mb-4 ${option.highlight ? 'text-white/70' : 'text-gray-500'}`}>{option.desc}</p>
              <button className={`font-medium text-sm ${option.highlight ? 'text-secondary hover:text-white' : 'text-luxury hover:text-secondary'} transition-colors`}>
                {option.action} →
              </button>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-sm p-8">
            <h2 className="text-2xl font-serif font-bold text-luxury mb-6 flex items-center gap-3">
              <FileText className="w-6 h-6 text-secondary" /> Submit a Request
            </h2>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-luxury mb-2">Request Submitted!</h3>
                <p className="text-gray-500">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-luxury mb-2 block">Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-luxury"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-luxury mb-2 block">Email</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-luxury"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-luxury mb-2 block">Subject</label>
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-luxury"
                  >
                    <option value="">Select a topic</option>
                    <option value="order">Order Issue</option>
                    <option value="return">Returns & Refunds</option>
                    <option value="product">Product Question</option>
                    <option value="shipping">Shipping Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-luxury mb-2 block">Message</label>
                  <textarea 
                    required
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-luxury resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                <Button type="submit" fullWidth className="py-4">
                  Submit Request <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            )}
          </div>

          {/* FAQs */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-luxury mb-6 flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-secondary" /> Frequently Asked Questions
            </h2>
            <div className="bg-white rounded-3xl shadow-sm p-8">
              {faqs.map((faq, i) => (
                <FAQItem key={i} {...faq} />
              ))}
            </div>

            {/* Store Location */}
            <div className="mt-8 bg-luxury text-white rounded-3xl p-8">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-secondary" /> Visit Our Flagship Store
              </h3>
              <p className="text-gray-400 mb-2">123 Fifth Avenue</p>
              <p className="text-gray-400 mb-2">New York, NY 10001</p>
              <p className="text-gray-400">Mon - Sat: 10am - 8pm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
