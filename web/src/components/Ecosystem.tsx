"use client";
import React from "react";
import { motion } from "framer-motion";
import { Layers, Zap, PenTool, BarChart } from "lucide-react";

const features = [
  {
    title: "Branding",
    subtitle: "Forging Timeless Impressions",
    desc: "We design compelling visuals, engaging messaging, and cohesive elements that tell your unique story.",
    icon: Layers,
  },
  {
    title: "Marketing",
    subtitle: "360-Degree Solutions",
    desc: "We help your brand thrive in the digital age, reaching new heights through a tailored, all-encompassing approach.",
    icon: Zap,
  },
  {
    title: "Content",
    subtitle: "Digital Alchemy",
    desc: "Lorem ipsum dolor sit amet, digital alchemy branding. Ut enim ad minim veniam, marketing ecosystem v2.0.",
    icon: PenTool,
  },
  {
    title: "Analytics",
    subtitle: "Data-Driven Growth",
    desc: "Detailed insights and analytics to measure performance and optimize strategies in real-time.",
    icon: BarChart,
  },
];

export const Ecosystem = () => {
  return (
    <section id="ecosystem" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            The Ecosystem
          </h2>
          <p className="text-gray-400">360-Degree Solutions for Modern Brands</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 rounded-xl border border-midas/20 hover:border-midas/50 transition-colors group relative overflow-hidden"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-midas/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-midas/10 rounded-lg flex items-center justify-center mb-6 text-midas group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-midas text-sm font-mono mb-4">{feature.subtitle}</p>
                <p className="text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
