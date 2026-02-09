"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3 } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 radial-glow pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Text Content */}
        <div className="space-y-8 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-midas/10 border border-midas/20 text-midas text-xs font-bold tracking-widest mb-4">
              DREAMS & LIFE PROTOCOL
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight text-white">
              Think <span className="text-gradient-gold">Bigger.</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-lg mt-6 leading-relaxed mx-auto lg:mx-0">
              We don't just handle projects; we handle the life and dreams of our customers.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <button className="px-8 py-4 bg-midas text-black font-bold rounded-lg hover:bg-midas-glow transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]">
              INITIALIZE REBRAND <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-4 glass text-white font-bold rounded-lg hover:bg-white/10 transition-all cursor-pointer">
              VIEW PORTFOLIO
            </button>
          </motion.div>
        </div>

        {/* Visual: Brand Equity Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="glass-card p-8 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-midas to-transparent opacity-50" />
            
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-gray-400 text-sm">Brand Equity</h3>
                <p className="text-3xl font-bold text-white mt-1">+245.8%</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10 text-green-400">
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>

            {/* Simulated Chart Bars */}
            <div className="flex items-end justify-between h-48 gap-2">
              {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 1.5, delay: i * 0.1 }}
                  className="w-full bg-gradient-to-t from-midas/20 to-midas/60 rounded-t-sm relative group-hover:to-midas transition-colors"
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-midas blur-md opacity-0 group-hover:opacity-30 transition-opacity" />
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-between mt-4 text-xs text-gray-500 font-mono">
              <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span>
            </div>
          </div>
          
          {/* Floating Elements */}
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-4 w-20 h-20 glass rounded-full flex items-center justify-center border-midas/30 hidden md:flex"
          >
            <span className="text-4xl filter drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">✨</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
