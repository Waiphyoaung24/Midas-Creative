"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Lock } from "lucide-react";

export const TrustSection = () => {
  return (
    <section id="trust" className="py-24 relative overflow-hidden">
       {/* Background Beams */}
       <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-midas to-transparent opacity-20" />
         <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-midas to-transparent opacity-20" />
       </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-midas text-xs font-bold tracking-widest uppercase mb-2 block">
            The Midas Integrity
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Next-Gen Thinking.<br />
            Integrity At All Times.
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            The Nexuslab x Midas Apex Fusion. We operate with honesty and transparency in all interactions. Every event is a masterpiece, from corporate galas to product launches.
          </p>
          
          <ul className="space-y-4">
            {[
              "Privacy: Honesty and transparency in all interactions.",
              "Compliance: Adhering to the highest industry standards.",
              "Verified: Turn your ideas into unforgettable experiences."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-midas shrink-0 mt-0.5" />
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="glass-card p-10 rounded-2xl border-midas/20 text-center relative z-10"
          >
             <Lock className="w-16 h-16 text-midas mx-auto mb-6" />
             <h3 className="text-2xl font-bold text-white mb-2">Secure & Verified</h3>
             <p className="text-gray-400">
               "Turn your ideas into unforgettable experiences, leaving the Midas touch on every detail."
             </p>
          </motion.div>
          
          {/* Decorative Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-midas blur-[100px] opacity-20 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
