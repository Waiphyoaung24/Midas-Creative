"use client";
import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, ShieldCheck, Activity } from "lucide-react";

export const StrategyDashboard = () => {
  return (
    <section id="strategy" className="py-24 bg-black/50 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
              Strategy Dashboard
            </h2>
            <p className="text-gray-400">Guiding Your Path to Success</p>
          </div>
          <div className="mt-4 md:mt-0 px-4 py-2 bg-midas/10 border border-midas/20 rounded text-midas text-xs font-mono">
            chess_masters_mode: ON
          </div>
        </div>

        {/* Crypto Market Table Style */}
        <div className="glass rounded-xl overflow-hidden border border-gray-800">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-800 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <div className="col-span-6 md:col-span-4">Asset / Strategy</div>
            <div className="col-span-3 md:col-span-2 text-right">Status</div>
            <div className="col-span-3 md:col-span-2 text-right">Performance</div>
            <div className="hidden md:block md:col-span-4 text-right">Action</div>
          </div>

          {[
            { name: "Opportunity Analysis", status: "Active", gain: "+24.5%", icon: TrendingUp, color: "text-green-400" },
            { name: "Competitor Mitigation", status: "Secure", gain: "Risk Lowered", icon: ShieldCheck, color: "text-blue-400" },
            { name: "Growth Implementation", status: "Running", gain: "Optimizing", icon: Activity, color: "text-midas" },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="grid grid-cols-12 gap-4 p-4 border-b border-gray-800/50 hover:bg-white/5 transition-colors items-center last:border-0"
            >
              <div className="col-span-6 md:col-span-4 flex items-center gap-3">
                <div className={`p-2 rounded bg-gray-800/50 ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="font-bold text-white">{item.name}</span>
              </div>
              <div className="col-span-3 md:col-span-2 text-right">
                <span className="px-2 py-1 rounded bg-green-500/10 text-green-400 text-xs font-bold">
                  {item.status}
                </span>
              </div>
              <div className="col-span-3 md:col-span-2 text-right font-mono text-white">
                {item.gain}
              </div>
              <div className="hidden md:block md:col-span-4 text-right">
                <button className="text-xs text-midas hover:text-white transition-colors">
                  [ VIEW DETAILS ]
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center max-w-2xl mx-auto">
          <p className="text-lg text-gray-300 italic">
            "We help identify opportunities, analyze competitors, and implement growth-focused strategies. We're the chess masters of business."
          </p>
        </div>
      </div>
    </section>
  );
};
