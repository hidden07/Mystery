import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPage } from '../../store/menuSlice';
import { FaArrowLeft, FaBars } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios'; 
import Tree from '../../assets/about-page/tree_final.png';
import AboutFlower from '../../assets/about-page/flower_final.png';
import Rabbit from '../../assets/about-page/rabbit_final.png';


const API_URL = "https://mystery-4k3a.onrender.com";

const About = () => {
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

  useEffect(() => {
    dispatch(addPage('About'));
  }, [dispatch]);

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
        { buttonName: 'Lets Explore More' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error('Error logging click:', error);
    }

    setShowEmojis(true);
    setTimeout(() => {
      setShowEmojis(false);
      handleNavigation('Question');
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
    <div className="bg-[#ffb3c6] min-h-screen flex flex-col items-center py-10 px-4 relative overflow-hidden">
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
      <motion.div className="absolute top-4 left-4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <FaArrowLeft className="text-2xl text-black cursor-pointer" onClick={() => navigate('/')} />
      </motion.div>
      <motion.div className="text-2xl font-semibold mb-6 mt-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        About you 💌
      </motion.div>
      <motion.p className="w-full max-w-[90%] text-center mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
      Hey, Mystery…

Your smile sticks with me. It’s not just there for a second—it stays, like a song I keep hearing in my head. I like how simple you are. You’re beautiful without even trying, and it’s hard not to notice you.

You’re always on calls, talking to people, but I never see you on social media. Are those talks that good? Or do you just like real life more? Either way, I admire you—a lot.

This is just the start. There’s more to see if you want to keep going. So, what’s next? Stick around, and maybe we’ll find out. 😊

This site is for you—a spot for how I see you and what’s still ahead.
      </motion.p>
      <motion.button
        className="border rounded-full bg-[#eae2b7] border-[#eae2b7] w-[160px] h-[60px] mb-10 z-10 relative"
        onClick={handleButtonClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        lets explore more..
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
              ❤️
            </motion.span>
          ))}
        </div>
      )}
      <motion.img src={Tree} alt="Tree" className="absolute bottom-0 left-0 w-[30%] max-w-[130px] h-auto object-contain" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.8 }} />
      <motion.img src={AboutFlower} alt="Flower" className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[30%] max-w-[130px] h-auto object-contain" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.0 }} />
      <motion.img src={Rabbit} alt="Rabbit" className="absolute bottom-0 right-0 w-[30%] max-w-[130px] h-auto object-contain" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 1.2 }} />
    </div>
  );
};

export default About;