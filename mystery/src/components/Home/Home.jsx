import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPage } from '../../store/menuSlice';
import { FaBars } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios'; 
import cloud from '../../assets/home-page/clouds_final.png';
import penguin from '../../assets/home-page/peguin_final.png';
import flowerpot from '../../assets/home-page/flower-pot.png';
import Flower from '../../assets/home-page/flower_final.png';

const API_URL = "https://mystery-4k3a.onrender.com";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const visitedPages = useSelector((state) => state.menu.visitedPages);

  const allPages = [
    'Home',
    'Hidden',
    'Mystery',
    'Question',
    'Final Choice',
    'About',
    'Secret',
    'Thankyou'
  ];

  const handleNavigation = (page) => {
    dispatch(addPage(page));
    navigate(`/${page.toLowerCase().replace(' ', '-')}`);
    setIsMenuOpen(false);
  };

  const handleButtonClick = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_URL}/api/v1/log-click`,
        { buttonName: 'lets go..' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error('Error logging click:', error);
      }

    setShowEmojis(true);
    setTimeout(() => {
      setShowEmojis(false);
      navigate('/about');
    }, 1500);
  };

  const emojiVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: 1,
      y: '-100vh',
      transition: { duration: 1.8, ease: 'easeOut' },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const emojiArray = Array.from({ length: 10 }, (_, index) => ({
    id: index,
    xOffset: Math.random() * 90,
    yOffset: Math.random() * 20,
  }));

  return (
    <div className="bg-[#a2d2ff] min-h-screen flex flex-col items-center py-10 px-4 relative overflow-hidden">
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
                className="block w-full text-left py-2 px-4 hover:bg-[#ffb3c6] rounded"
              >
                {page}
              </button>
            ))}
        </div>
      )}
      <motion.div className="text-3xl font-semibold mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1>Home</h1>
      </motion.div>
      <motion.div className="w-full max-w-[80%] mb-6" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
        <img src={cloud} alt="cloud" className="w-full h-auto" />
      </motion.div>
      <motion.p className="w-full max-w-[90%] text-center mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
        Somewhere in this world, a stranger created this little space just for you.. enjoy this ... it not take too long...
      </motion.p>
      <motion.div className="w-full max-w-[80px]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
        <img src={penguin} alt="penguin" className="w-full h-auto" />
      </motion.div>
      <motion.button
        className="border rounded-full bg-[#ffb3c6] border-[#ffb3c6] w-[160px] h-[60px] mb-10 relative z-10"
        onClick={handleButtonClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        let's go...
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
              😊
            </motion.span>
          ))}
        </div>
      )}
      <div className="absolute bottom-0 left-0 w-[40%] max-w-[130px]">
        <img src={flowerpot} alt="flower pot" className="w-full h-auto" />
      </div>
      <div className="absolute bottom-0 right-0 w-[35%] max-w-[2000px]">
        <img src={Flower} alt="flower" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default Home;