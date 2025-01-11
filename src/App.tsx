import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import { UserForm } from "./components/UserForm";
import { QuestionCard } from "./components/QuestionCard";
import { GithubIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { QUESTIONS } from "./lib/constants";
import { GlobeDemo } from "./components/FinalGlobe";
import Background from "./components/Background";
import { SplashScreen } from "./components/ui/splash-screen";
import { PollCounter } from '@/components/ui/poll-counter'

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuestions, setShowQuestions] = useState(true);
  const [showThankYou, setShowThankYou] = useState(false);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState({});
  // Add this near your other state declarations
  const [totalResponses, setTotalResponses] = useState(0);

  // Add or update the statistics fetching effect
  useEffect(() => {
    const fetchStatistics = async () => {
      const { data, error } = await supabase
        .from("responses")
        .select()
        .eq("question_id", QUESTIONS[currentQuestionIndex].id);

      if (error) {
        console.error("Error fetching statistics:", error);
        return;
      }

      // Calculate statistics
      const stats = data.reduce((acc, curr) => {
        acc[curr.selected_option] = (acc[curr.selected_option] || 0) + 1;
        return acc;
      }, {});

      // Initialize options with 0 if they haven't been chosen
      QUESTIONS[currentQuestionIndex].options.forEach((option) => {
        if (!stats[option]) stats[option] = 0;
      });

      setStatistics(stats);
    };

    fetchStatistics();
  }, [currentQuestionIndex]);

  // Add or update the total responses effect
  // Update or add this effect for real-time updates
  

  const handleAnswer = async (option: string) => {
    try {
      // First save the response immediately to Supabase
      const { error: responseError } = await supabase.from("responses").insert([
        {
          question_id: QUESTIONS[currentQuestionIndex].id,
          selected_option: option,
        },
      ]);

      if (responseError) throw responseError;

      // Update local state
      setResponses((prev) => [
        ...prev,
        {
          question_id: QUESTIONS[currentQuestionIndex].id,
          selected_option: option,
        },
      ]);

      // Update statistics locally for immediate feedback
      setStatistics((prev) => ({
        ...prev,
        [option]: (prev[option] || 0) + 1,
      }));

      // Wait for statistics to be shown
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Move to next question or finish
      if (currentQuestionIndex < QUESTIONS.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setShowQuestions(false);
      }
    } catch (error) {
      console.error("Error saving response:", error);
      alert("There was an error saving your response. Please try again.");
    }
  };

  useEffect(() => {
    const fetchTotalResponses = async () => {
      const { count, error } = await supabase
        .from("responses")
        .select("*", { count: "exact", head: true });

      if (!error && count !== null) {
        setTotalResponses(count);
      }
    };

    fetchTotalResponses();
  }, [handleAnswer]);

  const handleUserSubmit = async (userName: string, location: string) => {
    setLoading(true);
    try {
      // Create user
      const { data: userData, error: userError } = await supabase
        .from("user")
        .insert([
          {
            username: userName || "Anonymous",
            location: location || "Unknown",
          },
        ])
        .select()
        .single();

      if (userError) throw userError;

      // No need to save responses here as they're already saved
      setShowThankYou(true);
    } catch (error) {
      console.error("Error saving user data:", error);
      alert("There was an error saving your information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const ThankYouCard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-xl p-8 text-center"
    >
      <div className="flex items-center justify-center">
        <img src="/barney.gif" width="250" height="250" />
      </div>
      <h2 className="text-2xl font-bold mb-4">🎉 Dary!</h2>
      <p className="text-gray-600 mb-4">
        Hope you had fun 🤩! Launching v2 update soon. Stay tuned.
      </p>
      <div className="mb-4 text-4xl">🤓 ➡️ 🌟</div>
      <p className="text-gray-500 text-sm">
        Fun fact: You just answered {QUESTIONS.length} questions faster than it
        takes most people to decide what to watch on Netflix!
      </p>
    </motion.div>
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Slightly longer than splash screen duration to ensure smooth transition

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SplashScreen />
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-screen overflow-hidden bg-white"
          >
            {/* Background Elements */}
            <Background />

            {/* Floating Elements */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700" />

            <div className="relative z-10">
              <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-12"
                >
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    You Don't Matter 🎲
                  </h1>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                    Go ahead, share your "unique" opinions. Let’s see how
                    shockingly basic you really are.
                    <span className="block text-sm mt-2 text-gray-500">
                      (But hey, not judging... okay, maybe just a 🤏)
                    </span>
                  </p>
                </motion.div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-12 items-start  mx-auto">
                  {/* Left Column - Survey Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                    style={{
                      zIndex: "999",
                    }}
                  >
                    <div className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl p-8 border border-gray-100">
                      <AnimatePresence mode="wait">
                        {showThankYou ? (
                          <ThankYouCard />
                        ) : showQuestions ? (
                          <QuestionCard
                            key={`question-${currentQuestionIndex}`}
                            question={QUESTIONS[currentQuestionIndex]}
                            onAnswer={handleAnswer}
                            statistics={statistics}
                          />
                        ) : (
                          <UserForm
                            onSubmit={handleUserSubmit}
                            loading={loading}
                          />
                        )}
                      </AnimatePresence>
                    </div>

                    {/* POLL COUNTER */}
                    <PollCounter count={totalResponses} />

                    {/* GitHub Button */}
                    <motion.a
                      href="https://github.com/yagyesh-bobde/Wait-For-It"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-2 py-3 px-6 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <GithubIcon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                      <span>Star on GitHub</span>
                    </motion.a>
                  </motion.div>

                  {/* Right Column - Globe */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hidden lg:block"
                  >
                    <GlobeDemo />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            {showQuestions && (
              <div className="fixed bottom-0 left-0 w-full h-1 bg-gray-100">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${
                      ((currentQuestionIndex + 1) / QUESTIONS.length) * 100
                    }%`,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}

            <div className="fixed bottom-12 left-1/2 -translate-x-1/2 lg:-translate-x-0 lg:left-1/4 text-xl font-bold">
              <div className="text-xs mb-4 text-center">Backed by</div>
              <span className="bg-orange-500 text-white p-2 rounded-md mx-2">
                Y
              </span>
              <span>agyesh</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
