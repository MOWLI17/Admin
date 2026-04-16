import React from 'react';
import { motion as Motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center">
      <div className="relative h-16 w-16">
        <Motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-[3px] border-indigo-500/10 border-t-indigo-500"
        ></Motion.div>
        <Motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 rounded-full border-[3px] border-indigo-500/5 border-b-indigo-400"
        ></Motion.div>
        <Motion.div
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-6 rounded-full bg-indigo-500/20 shadow-2xl shadow-indigo-500/50"
        ></Motion.div>
      </div>
    </div>
  );
};

export default Loader;
