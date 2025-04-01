import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPage } from "../../store/menuSlice";
import { FaArrowLeft, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Thankyou = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const visitedPages = useSelector((state) => state.menu.visitedPages);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);

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
    dispatch(addPage("Thankyou"));
    setShowEmojis(true); 
    setTimeout(() => setShowEmojis(false), 1500); 
  }, [dispatch]);

  const handleNavigation = (page) => {
    dispatch(addPage(page));
    navigate(`/${page.toLowerCase().replace(" ", "-")}`);
    setIsMenuOpen(false);
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

  return (
    <div className="bg-[#ffb3c6] min-h-screen flex flex-col items-center py-10 px-4 relative overflow-hidden">
     
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
                className="block w-full text-left py-2 px-4 hover:bg-[#ffb3c6] rounded"
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
        className="text-3xl font-semibold mt-12 mb-6 flex items-center gap-3"
      >
        <div>Thank You</div>
        <div className="text-4xl">😄</div>
      </motion.div>

     
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mb-6"
      >
        <h2 className="text-lg">For Staying a Mystery...</h2>
      </motion.div>

     
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="w-full max-w-[90%] text-center mb-6"
      >
        Hey Mystery…

So, you’ve chosen to let things stay as they are—to keep the mystery alive.

That’s okay. Some things are meant to remain untold, some stories left unwritten. I won’t ask you to change your mind, and I won’t try to convince you otherwise. This was never about forcing anything—just about creating something special, even if just for a moment.

If this made you smile, if it made your day a little more interesting, then that’s all I ever wanted.

So, take this as a little game, a fleeting moment, and let it fade like a secret never spoken.

Goodbye, Mystery.

      </motion.p>

     
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
              💔
            </motion.span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Thankyou;