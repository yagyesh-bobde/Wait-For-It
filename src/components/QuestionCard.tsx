import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";

interface QuestionCardProps {
  question: {
    text: string;
    options: string[];
    id: number;
  };
  onAnswer: (option: string) => void;
  statistics: Record<string, number>;
}

export function QuestionCard({
  question,
  onAnswer,
  statistics,
}: QuestionCardProps) {
  const [showStats, setShowStats] = useState(false);
  const [localStats, setLocalStats] = useState(statistics);
  const totalVotes = Object.values(localStats).reduce((a, b) => a + b, 0);

  // Update local stats when statistics prop changes
  useEffect(() => {
    setLocalStats(statistics);
  }, [statistics]);

  const getPercentage = (option: string) => {
    if (totalVotes === 0) return 0;
    return Math.round((localStats[option] / totalVotes) * 100);
  };

  const handleOptionClick = async (option: string) => {
    setShowStats(true);
    
    // Optimistically update local stats
    setLocalStats(prev => ({
      ...prev,
      [option]: (prev[option] || 0) + 1
    }));

    // Call parent handler
    onAnswer(option);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <h2 className="text-xl font-bold text-gray-800">{question.text}</h2>
      
      <AnimatePresence mode="wait">
        {!showStats ? (
          <motion.div
            key="options"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {question.options.map((option) => (
              <motion.button
                key={option}
                onClick={() => handleOptionClick(option)}
                className="w-full p-4 text-left rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {option}
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="statistics"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {question.options.map((option) => (
              <div key={option} className="relative">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {option}
                  </span>
                  <span className="text-sm font-medium text-indigo-600">
                    {getPercentage(option)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${getPercentage(option)}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-gray-500 mt-1"
                >
                  {localStats[option]} votes
                </motion.div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}