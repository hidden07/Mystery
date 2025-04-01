import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPage } from "../../store/menuSlice";
import { FaArrowLeft, FaBars, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Cuple from "../../assets/hidden-page/boy-girl_final.png";
import HiddenFlower from "../../assets/hidden-page/flower_final.png";
import axios from "axios";

const API_URL = "https://mystery-4k3a.onrender.com";

const Hidden = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const visitedPages = useSelector((state) => state.menu.visitedPages);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showStar, setShowStar] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [thoughts, setThoughts] = useState("");

  const allPages = [
    "Home",
    "Hidden",
    "Mystery",
    "Question",
    "Final Choice",
    "About",
    "Secret",
    "Thankyou",
  ];

  useEffect(() => {
    dispatch(addPage("Hidden"));
    const timer = setTimeout(() => setShowStar(true), 3000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  const handleNavigation = (page) => {
    setShowEmojis(true);
    setTimeout(() => {
      setShowEmojis(false);
      if (page === "home" && thoughts.trim()) {
        submitThoughts();
      } else {
        dispatch(addPage(page));
        navigate(`/${page.toLowerCase().replace(" ", "-")}`);
        setIsMenuOpen(false);
      }
    }, 1500);
  };

  const submitThoughts = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/api/v1/submit-thoughts`, 
        { thoughts },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowThankYou(true);
      setTimeout(() => {
        setShowThankYou(false);
        setThoughts("");
        dispatch(addPage("home"));
        navigate("/home");
        setIsMenuOpen(false);
      }, 2000);
    } catch (error) {
      console.error("Error submitting thoughts:", error);
      alert("Oops! Something went wrong—try again.");
    }
  };

  const handleThoughtsChange = (e) => {
    setThoughts(e.target.value);
  };

  const starVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
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

  const thankYouVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="bg-[#ac99ac] min-h-screen flex flex-col items-center py-10 px-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-4 right-4"
      >
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FaBars className="text-2xl text-black" />
        </button>
      </motion.div>
      {isMenuOpen && (
        <div className="absolute top-12 right-4 bg-white shadow-lg rounded-lg p-4 z-10">
          {allPages
            .filter((page) => visitedPages.includes(page))
            .map((page) => (
              <button
                key={page}
                onClick={() => handleNavigation(page)}
                className="block w-full text-left py-2 px-4 hover:bg-[#ac99ac] rounded"
              >
                {page}
              </button>
            ))}
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute top-4 left-4"
      >
        <FaArrowLeft
          className="text-2xl text-black cursor-pointer"
          onClick={() => handleNavigation("Final Choice")}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-3xl font-semibold mt-12 mb-6"
      >
        Hidden Page
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex items-center mb-6"
      >
        <h2 className="text-lg">Let’s get in touch...</h2>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="w-full max-w-[90%] text-center mb-6"
      >
        Hey Mystery… <br /><br />
        You took a step forward instead of staying in the shadows—thank you for that. It means a lot. There’s more to find, more to see, if you keep going. <br /><br />
        But wait… there’s still a secret hiding here. Something small, something special. Find it, and you’ll know why I made all this for you. <br /><br />
        For now, this is your space. Write what’s on your mind—anything you feel, anything you want to say. No rules, just you. <br /><br />
        The journey’s not done yet… keep looking.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="w-full max-w-[90%] text-center mb-6"
      >
        <textarea
          value={thoughts}
          onChange={handleThoughtsChange}
          placeholder="What’s in your heart, Mystery?"
          className="w-full max-w-[400px] h-[120px] p-3 rounded-lg border border-gray-300 text-black resize-none"
        />
      </motion.div>
      <AnimatePresence>
        {showStar && (
          <motion.div
            variants={starVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="mb-6"
          >
            <FaStar
              className="text-yellow-500 text-3xl cursor-pointer"
              onClick={() => handleNavigation("Secret")}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="border rounded-full bg-[#eae2b7] border-[#eae2b7] w-[220px] h-[60px] mb-10 z-10 text-lg"
        onClick={() => handleNavigation("home")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Send to the Mystery Admirer
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
              ⭐
            </motion.span>
          ))}
        </div>
      )}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            variants={thankYouVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg text-center text-lg z-20"
          >
            Thank You! Your journey with me has been amazing. Let’s see what’s next! 💖
          </motion.div>
        )}
      </AnimatePresence>
      <motion.img
        src={HiddenFlower}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        alt="flower"
        className="absolute bottom-0 left-0 w-[30%] max-w-[90px] h-auto object-contain"
      />
      <motion.img
        src={Cuple}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.6 }}
        alt="couple"
        className="absolute bottom-0 right-0 w-[30%] max-w-[90px] h-auto object-contain"
      />
    </div>
  );
};

export default Hidden;