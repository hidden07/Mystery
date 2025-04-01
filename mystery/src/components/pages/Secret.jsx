import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPage } from "../../store/menuSlice";
import { FaArrowLeft, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const API_URL = "https://mystery-4k3a.onrender.com";

const Secret = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const visitedPages = useSelector((state) => state.menu.visitedPages);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [reaction, setReaction] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    dispatch(addPage("Secret"));
  }, [dispatch]);

  const handleNavigation = (page) => {
    dispatch(addPage(page));
    navigate(`/${page.toLowerCase().replace(" ", "-")}`);
    setIsMenuOpen(false);
  };

  const handleReactionChange = (e) => {
    setReaction(e.target.value);
  };

  const handleSubmit = async () => {
    if (!reaction.trim()) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/api/v1/submit-reaction`,
        { reaction },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsSubmitted(true);
      setReaction("");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.error("Error submitting reaction:", error);
      alert("Something went wrong—try again!");
    }
  };

  const heartVariants = {
    animate: {
      scale: [1, 1.2, 1],
      transition: { repeat: Infinity, duration: 1, ease: "easeInOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } },
  };

  return (
    <div className="bg-gradient-to-b from-[#a2d2ff] to-[#ffb3c6] min-h-screen flex flex-col items-center py-12 px-6 relative overflow-hidden">
      
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
                className="block w-full text-left py-2 px-4 hover:bg-[#ff99cc] rounded text-black"
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
          onClick={() => handleNavigation("Hidden")}
        />
      </motion.div>

      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-4xl font-semibold mt-12 mb-8 flex items-center gap-3 text-black"
      >
        <span>A Secret for You</span>
        <motion.span variants={heartVariants} animate="animate">
          💖
        </motion.span>
      </motion.div>

      <motion.div
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[700px] text-center text-black mb-8"
      >
        <p className="text-lg">
          Congratulations on finding this secret page! Hey, Mystery… <br />
          I adore you. Your smile lights up everything around you, your warmth spreads positivity wherever you go, and your charm is impossible to ignore. Plus, you strike me as brilliantly intelligent—did you know that? <br />
          I created this just for you because I’d love to share some unforgettable moments together.
        </p>
      </motion.div>

      
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[700px] text-left text-black mb-8"
      >
        <h2 className="text-2xl font-bold mb-4">My Wishlist with You</h2>
        <p className="mb-4">
          Here’s what I dream of doing with you—little moments that would mean the world to me:
        </p>
        <ul className="list-none space-y-2">
          <li>✅ Going on a coffee date, just the two of us.</li>
          <li>✅ Sharing your favorite ice cream—maybe stealing a bite or two.</li>
          <li>✅ Taking a night walk together under the stars—you gazing at the sky, me sneaking glances at you.</li>
          <li>✅ Holding your hand wherever we go, ignoring the world, just making sure you feel safe and happy.</li>
          <li>✅ Making these six months unforgettable for you.</li>
          <li>✅ Visiting a library nearby, picking out your favorite books, and reading side by side.</li>
          <li>✅ Snapping beautiful pictures of you to keep in my personal gallery.</li>
          <li>✅ Creating memories—at least 700 photos of you, capturing different places, angles, moments, and emotions.</li>
          <li>✅ Buying you cute little gifts—that’s why I’m working hard, to surprise you with something special.</li>
          <li>✅ Watching a movie together, any genre you love.</li>
          <li>✅ creating a flower crown for you .</li>
          <li>✅ Grabbing your favorite chocolates, just to see you smile.</li>
        </ul>
        <p className="mt-4">
          This is my wishlist with you… You’re not just a fleeting thought to me—I want you to fill an entire page in my story.
        </p>
      </motion.div>

     
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[700px] text-left text-black mb-8"
      >
        <h2 className="text-2xl font-bold mb-4">Questions I’d Love to Ask You</h2>
        <p className="mb-4">
          I’m dying to know you better—your likes, your dislikes, your moods, your fears, your strengths, your kindness, even your quirks. Here are some things I’m curious about:
        </p>
        <ul className="list-none space-y-2">
          <li>✅ What truly makes you happy?</li>
          <li>✅ What’s on your wishlist?</li>
          <li>✅ If you had three wishes, what would they be?</li>
          <li>✅ If you could teleport anywhere, where would you go, and who’d be with you?</li>
          <li>✅ What’s the best thing you’ve ever done that filled you with joy?</li>
          <li>✅ If money were no object, how would you spend your days?</li>
          <li>✅ What would your dream day look like?</li>
          <li>✅ If you wrote a book, what special moment would you include?</li>
          <li>✅ What’s your favorite animal?</li>
          <li>✅ What’s the worst thing you’ve ever done?</li>
          <li>✅ If I asked you to steer clear of guys you don’t know well, would you?</li>
          <li>✅ If you had a magical book where anything you wrote came true, what would you write?</li>
          <li>✅ What’s your type in guys—personality, looks, anything?</li>
          <li>✅ If your dream guy showed up for a day, how would you want him to treat you?</li>
          <li>✅ If you could be anyone for a day, who’d you pick and why?</li>
          <li>✅ If you could wipe one memory from everyone’s mind, what would it be?</li>
          <li>✅ If we stayed strangers and I kept staring at you in public, admiring you without looking away—what would you do?</li>
        </ul>
      </motion.div>

      
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[700px] text-center text-black mb-8"
      >
        <h2 className="text-2xl font-bold mb-4">My Promise to You</h2>
        <p className="mb-4">
          There’s so much I want to share with you—and only you. <br />
          This isn’t a proposal (unless you’d like it to be!), but I’d love to be part of your story, even just for a few pages. If we don’t meet now, I’ll still treasure this moment. But if we do, I promise to build another website just for you—a hidden gallery of your best memories, kept safe forever.
        </p>
      </motion.div>

    
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[700px] text-center text-black mb-8"
      >
        <h2 className="text-2xl font-bold mb-4">Your Challenge</h2>
        <p className="mb-4">
          Here’s the twist—you have to find me first. <br />
          You’re the only one I’ve ever given this chance to. You’ve got seven days—after that, this all fades away, and my wishlist stays a dream. <br />
          Fair warning: I’m shy, so you’ll need to approach me gently to get me talking in real life. While you’re searching, I’ll be working on myself—brushing up my communication, getting in shape, and fixing my hair. It’s all to make this worth it. <br />
          So, find me soon, okay?
        </p>
      </motion.div>

    
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[700px] text-center text-black mb-8"
      >
        <h2 className="text-2xl font-bold mb-4">A Little Astrology Fun</h2>
        <p>
          Oh, and for fun, I checked our astrology based on our names. Here’s what it said: <br />
          <span className="font-semibold">You</span> are fun-loving, talkative, creative, intelligent, responsible, a bit of an overthinker, moody at times, a natural communicator, and so lucky and positive. <br />
          <span className="font-semibold">Me</span>—I’m stable, hardworking, practical, strong-willed, stubborn, emotional, and occasionally wrestling with my temper. <br />
          If we click, it says we’d balance each other beautifully—as long as we embrace our differences. <br />
          It’s just a silly game, but I couldn’t resist trying it. 😂 <br />
          Now, your turn—find me. Let’s see if you can!
        </p>
      </motion.div>

    
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="w-full max-w-[700px] text-center mb-12"
      >
        <p className="mb-4 text-black text-lg">
          So, Mystery, what’s your reaction right now?
        </p>
        <input
          type="text"
          value={reaction}
          onChange={handleReactionChange}
          placeholder="Tell me charmi how you feel..."
          className="w-full max-w-[300px] p-3 rounded-lg border border-gray-300 text-black mb-4 focus:outline-none focus:ring-2 focus:ring-[#ff99cc]"
          disabled={isSubmitted}
        />
        <motion.button
          onClick={handleSubmit}
          className={`w-[200px] h-[50px] rounded-full text-lg text-black font-semibold ${
            isSubmitted ? "bg-green-500" : "bg-[#ff99cc]"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isSubmitted}
        >
          {isSubmitted ? "Sent to You!" : "Whisper It to Me"}
        </motion.button>
      </motion.div>

     
      {Array.from({ length: 15 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute text-2xl text-white"
          initial={{ opacity: 0, x: `${Math.random() * 100}%`, y: "100%" }}
          animate={{
            opacity: [0, 1, 0],
            y: "-100%",
            transition: {
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            },
          }}
        >
          💕
        </motion.span>
      ))}
    </div>
  );
};

export default Secret;