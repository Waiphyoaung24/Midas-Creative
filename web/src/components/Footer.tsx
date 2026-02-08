"use client";
import React from "react";

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5 relative bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
                 <h2 className="text-3xl font-display font-bold text-white mb-4">
                    Amplify your brand's voice and foster meaningful connections.
                 </h2>
                 <p className="text-gray-500">
                    Ready to start your journey?
                 </p>
            </div>
            <div className="glass p-8 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
                <div className="space-y-2 text-gray-400">
                    <p>Diamond Tower Address, Level 42</p>
                    <p>New York, NY 10001</p>
                    <p className="text-midas font-mono">+1 (555) 123-4567</p>
                    <p className="text-midas font-mono">hello@digitalalchemist.com</p>
                </div>
            </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>© 2026 Midas Creative Lab.</p>
            <p>Powered by Nexuslab Architecture.</p>
        </div>
      </div>
    </footer>
  );
};
