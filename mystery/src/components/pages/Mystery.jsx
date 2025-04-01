import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPage } from "../../store/menuSlice";
import { FaArrowLeft, FaBars, FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios'; 
import Elephant from "../../assets/mystry-page/elephant_final.png";
import Flower1 from "../../assets/mystry-page/flower_final.png";
import Flower2 from "../../assets/mystry-page/flower-2_final.png";

const API_URL = "https://mystery-4k3a.onrender.com";

const Mystery = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const visitedPages = useSelector((state) => state.menu.visitedPages);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const allPages = [
    'Home',
    'Hidden',
    'Mystery',
    'Question',
    'Final Choice',
    'About',
    'Secret',
    'Thankyou',
  ];

  useEffect(() => {
    dispatch(addPage("Mystery"));
  }, [dispatch]);

  const handleNavigation = (page) => {
    dispatch(addPage(page));
    navigate(`/${page.toLowerCase().replace(" ", "-")}`);
    setIsMenuOpen(false);
  };

  const handleButtonClick = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_URL}/api/v1/log-click`,
        { buttonName: 'Next (Mystery)' }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error('Error logging click:', error); 
    }

    setShowEmojis(true);
    setTimeout(() => {
      setShowEmojis(false);
      handleNavigation("Final Choice");
    }, 1500);
  };

  const emojiVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: 1,
      y: "-100vh",
      transition: { duration: 1.2, ease: "easeOut" },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const emojiArray = Array.from({ length: 10 }, (_, index) => ({
    id: index,
    xOffset: Math.random() * 90,
    yOffset: Math.random() * 20,
  }));

  const messageVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="bg-[#d8e2dc] min-h-screen flex flex-col items-center py-10 px-4 relative overflow-hidden">
      <div className="absolute top-4 right-4">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FaBars className="text-2xl text-black" />
        </button>
      </div>
      {isMenuOpen && (
        <div className="absolute top-12 right-4 bg-white shadow-lg rounded-lg p-4 z-10">
          {allPages
            .filter((page) => visitedPages.includes(page))
            .map((page) => (
              <button
                key={page}
                onClick={() => handleNavigation(page)}
                className="block w-full text-left py-2 px-4 hover:bg-[#d8e2dc] rounded"
              >
                {page}
              </button>
            ))}
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-4 left-4"
      >
        <FaArrowLeft
          className="text-2xl text-black cursor-pointer"
          onClick={() => navigate("/")}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl font-semibold mt-12 mb-6 flex items-center gap-3"
      >
        <div>Mystery</div>
        <div className="text-4xl">🔍</div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-6"
      >
        <h2 className="text-lg">Here’s a challenge for you...</h2>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="w-full max-w-[90%] text-center mb-6"
      >
Caught you looking! 😊

I’m hiding in plain sight.

Think simple—where’s the surprise?
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="flex justify-center mb-6 relative"
      >
        <FaStar
          className="text-yellow-500 text-3xl cursor-pointer"
          onClick={() => setShowMessage(!showMessage)}
        />
        <AnimatePresence>
          {showMessage && (
            <motion.div
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-10 bg-white p-3 rounded-lg shadow-lg text-sm text-center w-[200px] z-20"
            >
              “On the final choice page, you’ll face a choice. Pick wisely, and a new page will unlock. Hidden within that page is a secret button—find it, and you’ll discover the true purpose behind this journey.”
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="border p-3 rounded-2xl bg-white w-full max-w-[90%] text-center mb-6"
      >
        “You found the hidden clue… or did you? 🤔 <br />
        It’s always been right in front of you.”
      </motion.h3>
      <motion.img
        src={Elephant}
        alt="elephant"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="w-[40%] max-w-[150px] h-auto object-contain"
      />
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="border rounded-full bg-[#fde2e4] border-[#fde2e4] w-[160px] h-[60px] mb-10 z-10 text-lg"
        onClick={handleButtonClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Next
      </motion.button>
      {showEmojis && (
        <div className="absolute inset-0 pointer-events-none">
          {emojiArray.map((emoji) => (
            <motion.span
              key={emoji.id}
              className="absolute text-2xl"
              style={{ left: `${emoji.xOffset}%`, bottom: `${emoji.yOffset}%` }}
              variants={emojiVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              🔍
            </motion.span>
          ))}
        </div>
      )}
      <motion.img
        src={Flower1}
        alt="flower-1"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.6 }}
        className="absolute bottom-0 left-0 w-[30%] max-w-[60px] h-auto object-contain"
      />
      <motion.img
        src={Flower2}
        alt="flower-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.8 }}
        className="absolute bottom-0 right-0 w-[30%] max-w-[90px] h-auto object-contain"
      />
    </div>
  );
};

export default Mystery;