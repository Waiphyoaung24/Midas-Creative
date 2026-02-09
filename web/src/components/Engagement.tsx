"use client";
import React from "react";
import { motion } from "framer-motion";

const influencers = [
  { name: "Alex K.", role: "Tech Lead", img: "AK" },
  { name: "Sarah J.", role: "Marketing", img: "SJ" },
  { name: "Mike R.", role: "Crypto Analyst", img: "MR" },
  { name: "Emily D.", role: "Content", img: "ED" },
  { name: "David L.", role: "Strategy", img: "DL" },
];

export const Engagement = () => {
  return (
    <section id="engagement" className="py-24 bg-gradient-to-b from-transparent to-black/80">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
          Influencer: Igniting Brand Advocacy
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-16">
          Selecting authentic influencers from micro to macro levels to quickly reach the right audiences. Through authentic partnerships, we generate measurable returns for your business.
        </p>

        {/* Horizontal Scroll */}
        <div className="flex overflow-x-auto pb-8 gap-8 justify-center snap-x hide-scrollbar">
          {influencers.map((person, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="snap-center shrink-0 w-48 group"
            >
              <div className="w-32 h-32 mx-auto rounded-full glass flex items-center justify-center border-2 border-midas/30 mb-4 group-hover:border-midas transition-colors relative overflow-hidden">
                <span className="text-2xl font-bold text-midas">{person.img}</span>
                <div className="absolute inset-0 bg-midas/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-white font-bold">{person.name}</h3>
              <p className="text-sm text-midas">{person.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
