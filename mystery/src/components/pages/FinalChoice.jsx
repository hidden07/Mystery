import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPage } from "../../store/menuSlice";
import { FaArrowLeft, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import FlowerFinal from "../../assets/final-choice-page/flower_final.png";
import Heart from "../../assets/final-choice-page/heart_final.png";

const FinalChoice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const visitedPages = useSelector((state) => state.menu.visitedPages);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [destination, setDestination] = useState("");

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
    dispatch(addPage("Final Choice"));
  }, [dispatch]);

  const handleNavigation = (page) => {
    setShowEmojis(true);
    setDestination(page);
    setTimeout(() => {
      setShowEmojis(false);
      dispatch(addPage(page));
      navigate(`/${page.toLowerCase().replace(" ", "-")}`);
      setIsMenuOpen(false);
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
    <div className="bg-[#fde2e4] min-h-screen flex flex-col items-center py-10 px-4 relative overflow-hidden">
      
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
                className="block w-full text-left py-2 px-4 hover:bg-[#fde2e4] rounded"
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
          onClick={() => handleNavigation("Home")}
        />
      </motion.div>

    
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-3xl font-semibold mt-12 mb-6 flex items-center gap-3"
      >
        <div>Final Choice</div>
        <div className="text-4xl">💓</div>
      </motion.div>

    
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="w-full max-w-[90%] text-center mb-6"
      >
        Hey Mystery… <br />
        So, here we are. You’ve made it this far, and now, the choice is yours. <br />
        I hope you enjoyed this little journey, the hidden clues, the small details, and maybe, just maybe, the way I see you. But now, the question remains… what happens next? <br />
        You have two choices: <br />
        ✔ Let’s Be Friends – If you want to take one step forward, uncover what’s next, and see where this path leads, then go ahead. There's still more waiting for you. <br />
        ❌ Stay a Mystery – If this is where it ends for you, that’s okay too. No pressure, no expectations. Just know that this was never about changing anything—just about creating a moment that made you smile. If this made you happy even for a second, that’s more than enough for me. <br />
        Choose wisely, Mystery...I’ve got one more surprise up my sleeve!
      </motion.p>

     
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="relative mb-6 flex justify-center"
      >
        <img
          src={Heart}
          alt="hearts"
          className="w-[300px] h-[200px] object-contain cursor-pointer"
          onClick={() => setShowMessage(!showMessage)}
        />
        <AnimatePresence>
          {showMessage && (
            <motion.div
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-[-120px] left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-lg shadow-lg text-sm text-center w-[200px] z-20"
            >
              “Choose wisely! If you pick 'Let’s Be Friends,' the next hidden page holds a secret. Find the hidden button there to uncover the true meaning of this adventure.”
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

     
      <div className="flex flex-col items-center mb-5 relative left-[-10px]">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="border rounded-full bg-[#ac99ac] border-[#ac99ac] w-[200px] h-[60px] p-3 z-10 text-lg"
          onClick={() => handleNavigation("Hidden")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Let’s Be Friends 💙
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="border rounded-full bg-[#ffb3c6] border-[#ffb3c6] w-[200px] h-[60px] mt-3 p-3 z-10 text-lg"
          onClick={() => handleNavigation("Thankyou")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Stay a Mystery 💔
        </motion.button>
      </div>

     
      <motion.img
        src={FlowerFinal}
        alt="flower"
        initial={{ opacity: 0, x: 20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, delay: 1.6 }}
        className="absolute bottom-0 right-0 w-[30%] max-w-[100px] h-auto object-contain"
      />

     
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
              💓
            </motion.span>
          ))}
        </div>
      )}
    </div>
  );
};

export default FinalChoice;        