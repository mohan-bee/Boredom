import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import framer-motion for animations

function App() {
  // State to hold the "thing" data
  const [thing, setThing] = useState({ text: '', category: '' });
  const [loading, setLoading] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  // Fetch a random "thing" when the component mounts
  useEffect(() => {
    fetchThing();
  }, []);

  // Function to fetch a random "thing" from the backend
  const fetchThing = async () => {
    try {
      const response = await fetch('https://boredom-p7so.onrender.com/thing');
      const data = await response.json();
      setThing(data);
      setLoading(false); // Set loading to false after fetching
    } catch (error) {
      console.error('Error fetching data:', error);
      setThing({ text: 'Error fetching data!', category: '' });
      setLoading(false);
    }
  };

  // Function to toggle background music
  const toggleMusic = () => {
    if (musicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setMusicPlaying(!musicPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-100 opacity-40"
            initial={{ 
              x: `${Math.random() * 100}vw`, 
              y: `${Math.random() * 100}vh`,
              scale: Math.random() * 0.5 + 0.5 
            }}
            animate={{ 
              x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`], 
              y: [`${Math.random() * 100}vh`, `${Math.random() * 100}vh`],
              scale: [Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 1]
            }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: Math.random() * 60 + 60,
              ease: "easeInOut" 
            }}
            style={{ 
              width: `${Math.random() * 300 + 50}px`, 
              height: `${Math.random() * 300 + 50}px`,
              filter: "blur(8px)"
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 rounded-full bg-white opacity-60"
            initial={{ 
              x: `${Math.random() * 100}vw`, 
              y: `${Math.random() * 100}vh`,
              opacity: 0
            }}
            animate={{ 
              y: [null, "-100vh"],
              opacity: [0, 0.6, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: Math.random() * 25 + 15,
              delay: Math.random() * 20,
              ease: "easeInOut" 
            }}
          />
        ))}
      </div>

      {/* Main content card */}
      <motion.div
        className="bg-white/90 backdrop-blur-sm w-full max-w-md rounded-2xl shadow-lg p-8 md:p-10 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <motion.div
          className="mb-12 text-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold text-indigo-600 tracking-tight relative inline-block">
            Boredom
            <motion.span
              className="inline-block w-2 h-2 bg-indigo-500 rounded-full ml-1 mb-4 absolute"
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut',
              }}
            />
          </h1>
        </motion.div>

        {/* Main Content Area */}
        <div className="py-6 text-center">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center items-center h-20"
              >
                <motion.div
                  className="w-3 h-3 bg-indigo-500 rounded-full mr-1"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-3 h-3 bg-indigo-500 rounded-full mr-1"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-3 h-3 bg-indigo-500 rounded-full"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-3xl font-semibold text-gray-800 mb-3">
                  {thing.text}
                </h2>
                <motion.p
                  className="text-md font-medium text-indigo-500 mb-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  {thing.category.toUpperCase()}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Button */}
        <div className="mt-10 flex justify-center">
          <motion.button
            onClick={fetchThing}
            className="bg-indigo-600 text-white font-medium py-3 px-8 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            whileHover={{
              scale: 1.03,
              backgroundColor: '#4338ca', // indigo-700
              boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.3)',
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            Get Another Thing
          </motion.button>
        </div>
      </motion.div>

      {/* Music toggle button */}
      <motion.button
        onClick={toggleMusic}
        className="absolute bottom-4 right-4 bg-white/70 backdrop-blur-sm p-3 rounded-full shadow-md focus:outline-none z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {musicPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1V10a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1V10a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
      </motion.button>

      {/* Audio element for background music */}
      <audio 
        ref={audioRef} 
        loop 
        preload="auto"
        src="https://cdn.pixabay.com/download/audio/2022/01/18/audio_b620e8c3b5.mp3?filename=ambient-piano-amp-strings-10711.mp3"
      />
    </div>
  );
}

export default App;
