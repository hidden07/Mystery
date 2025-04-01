import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPage } from "../../store/menuSlice";
import { FaArrowLeft, FaBars, FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Bear from "../../assets/question-page/bear_final.png";
import Cat from "../../assets/question-page/cat_final.png";

const API_URL = "http://localhost:1000";

const Question = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const visitedPages = useSelector((state) => state.menu.visitedPages);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [showEmojis, setShowEmojis] = useState(false);
  const [formData, setFormData] = useState({
    nickname: "",
    hobby: "",
    coolestThing: "",
    birthday: "",
    favoriteFood: "",
    secretSocialMedia: "",
    dreamDay: "",
  });

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

  const questions = [
    { label: "What’s your nickname? (Required)", name: "nickname", placeholder: "e.g., charmi", required: true },
    { label: "What’s your favorite hobby? (Optional)", name: "hobby", placeholder: "e.g., singing" },
    { label: "What’s the coolest thing you’ve ever done? (Optional)", name: "coolestThing", placeholder: "e.g., scream my name at a hill point" },
    { label: "When’s your birthday? (Optional)", name: "birthday", placeholder: "e.g., 22 nov" },
    { label: "What’s your favorite food? (Optional)", name: "favoriteFood", placeholder: "e.g., Pizza" },
    { label: "Do you have any secret social media accounts? (Optional)", name: "secretSocialMedia", placeholder: "e.g., Yes, @secretme" },
    { label: "Your perfect dream day? (Optional)", name: "dreamDay", placeholder: "e.g., traveling to a italy" },
  ];

  useEffect(() => {
    dispatch(addPage("Question"));
  }, [dispatch]);

  const handleNavigation = (page) => {
    dispatch(addPage(page));
    navigate(`/${page.toLowerCase().replace(" ", "-")}`);
    setIsMenuOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAnswerSubmit = async (index) => {
    if (questions[index].required && !formData[questions[index].name]) {
      alert("Please provide an answer for this required question!");
      return;
    }

    if (!completedQuestions.includes(index)) {
      setCompletedQuestions((prev) => [...prev, index]);
    }

    if (index === questions.length - 1) {
      setShowEmojis(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/api/v1/question`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Failed to submit answers");

        setTimeout(() => {
          setShowEmojis(false);
          handleNavigation("Mystery");
        }, 1500);
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to submit answers. Please try again.");
        setShowEmojis(false);
      }
    } else {
      setActiveQuestion(index + 1);
    }
  };

  const toggleQuestion = (index) => {
    setActiveQuestion(index);
  };

  const questionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const inputVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "auto", opacity: 1, transition: { duration: 0.3 } },
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
    <div className="bg-[#eae2b7] min-h-screen flex flex-col items-center py-10 px-4 relative overflow-hidden">
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
                className="block w-full text-left py-2 px-4 hover:bg-[#eae2b7] rounded"
              >
                {page}
              </button>
            ))}
        </div>
      )}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="absolute top-4 left-4">
        <FaArrowLeft className="text-2xl text-black cursor-pointer" onClick={() => navigate("/")} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-2xl font-semibold mt-12 mb-6">
        Questions for you❓
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="flex gap-2 items-center mb-6">
        <FaStar className="text-yellow-500 text-3xl" />
        <h2 className="text-lg">Some questions for you</h2>
      </motion.div>
      <div className="w-full max-w-[90%] mb-6 space-y-4">
        {questions.map((question, index) => (
          index <= Math.max(...completedQuestions, -1) + 1 && (
            <motion.div key={question.name} variants={questionVariants} initial="hidden" animate="visible" className="text-center">
              <p className="text-lg mb-2 cursor-pointer hover:text-[#d8e2dc]" onClick={() => toggleQuestion(index)}>
                {question.label}
              </p>
              <AnimatePresence>
                {activeQuestion === index && (
                  <motion.div variants={inputVariants} initial="hidden" animate="visible" exit="hidden">
                    <input
                      type="text"
                      name={question.name}
                      value={formData[question.name]}
                      onChange={handleInputChange}
                      placeholder={question.placeholder}
                      className="w-full p-2 border rounded-lg bg-[#d8e2dc] border-[#d8e2dc] focus:outline-none mb-2"
                      required={question.required}
                    />
                    <motion.button
                      onClick={() => handleAnswerSubmit(index)}
                      className="border rounded-full bg-[#d8e2dc] border-[#d8e2dc] w-[120px] h-[40px] text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Submit
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        ))}
      </div>
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
              ❓
            </motion.span>
          ))}
        </div>
      )}
      <motion.img src={Bear} alt="bear" className="absolute bottom-0 left-0 w-[40%] max-w-[170px] h-auto object-contain" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.6 }} />
      <motion.img src={Cat} alt="cat" className="absolute bottom-0 right-0 w-[30%] max-w-[100px] h-auto object-contain" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.8 }} />
    </div>
  );
};

export default Question;