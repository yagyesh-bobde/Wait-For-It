import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

export const PollCounter = ({ count }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-xl p-4 shadow-lg mb-4"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
          <Users className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-600">Total Responses</h3>
          <motion.div
            key={count}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            {count.toLocaleString()}
          </motion.div>
        </div>
      </div>
      <motion.div 
        className="flex items-center gap-1"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-xs text-gray-500">Live</span>
      </motion.div>
    </div>
  </motion.div>
);