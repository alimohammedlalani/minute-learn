import React, { useState, useRef, useEffect } from 'react';
import {
  FaRegHeart,
  FaHeart,
  FaRegComment,
  FaRegBookmark,
  FaBookmark,
  FaTimes,
  FaQuestionCircle,
  FaRegEdit
} from 'react-icons/fa';

const Micros = () => {
  const [videos] = useState(Array.from({ length: 10 }, (_, i) => ({
    id: i,
    url: `src/assets/videos/video${i + 1}.mp4`,
    title: `Micro Lesson ${i + 1}`,
    description: 'Learn something new in 60 seconds',
    author: '@tech_mentor'
  })));

  const [likes, setLikes] = useState(Array(10).fill(false));
  const [saves, setSaves] = useState(Array(10).fill(false));
  const [showQuiz, setShowQuiz] = useState(false);
  const [showDoubt, setShowDoubt] = useState(false);
  const [doubtText, setDoubtText] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const videoRefs = useRef([]);
  const lastTap = useRef(0);

  const quizData = {
    question: "What is React's virtual DOM?",
    options: [
      "Actual browser DOM",
      "In-memory DOM representation",
      "Browser plugin",
      "3D rendering engine"
    ],
    answer: "In-memory DOM representation"
  };
  const handleDoubleTap = (index) => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      toggleLike(index);
    }
    lastTap.current = now;
  };

  const toggleLike = (index) => {
    const newLikes = [...likes];
    newLikes[index] = !newLikes[index];
    setLikes(newLikes);
  };

  const toggleSave = (index) => {
    const newSaves = [...saves];
    newSaves[index] = !newSaves[index];
    setSaves(newSaves);
  };

  const handleQuizSubmit = () => {
    const isCorrect = selectedOption === quizData.answer;
    setQuizResult(isCorrect);
    setTimeout(() => {
      setShowQuiz(false);
      setQuizResult(null);
    }, isCorrect ? 1500 : 3000);
  };

  const handleDoubtSubmit = () => {
    if (doubtText.trim()) {
      alert(`Doubt submitted: ${doubtText}`);
      setDoubtText('');
      setShowDoubt(false);
    }
  };

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-gradient-to-b from-[#0a0a1f] to-[#1a1a40] no-scrollbar">
      {videos.map((video, index) => (
        <div 
          key={video.id}
          className="h-screen snap-start flex items-center justify-center relative"
          onClick={() => handleDoubleTap(index)}
        >
          {/* Video Container */}
          <div className="aspect-[9/16] h-[90vh] w-full max-w-[450px] mx-auto relative overflow-hidden rounded-xl shadow-2xl">
            <video
              ref={el => videoRefs.current[index] = el}
              src={video.url}
              className="h-full w-full object-cover rounded-xl"
              autoPlay
              loop
              muted
              playsInline
            />

            {/* Double Tap Animation */}
            {likes[index] && (
              <div className="absolute inset-0 flex items-center justify-center animate-ping-slow">
                <FaHeart className="w-24 h-24 text-white/50" />
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
          </div>

          {/* Right Action Bar */}
          <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6 text-white z-20">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(index);
              }}
              className="flex flex-col items-center space-y-1"
            >
              {likes[index] ? (
                <FaHeart className="w-8 h-8 text-red-500 hover:scale-110 transition-all" />
              ) : (
                <FaRegHeart className="w-8 h-8 hover:scale-110 transition-all" />
              )}
              <span className="text-xs font-medium">24.5K</span>
            </button>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowDoubt(true);
              }}
              className="flex flex-col items-center space-y-1"
            >
              <FaRegComment className="w-8 h-8 hover:scale-110 transition-all" />
              <span className="text-xs font-medium">Doubt</span>
            </button>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowQuiz(true);
              }}
              className="flex flex-col items-center space-y-1"
            >
              <FaRegEdit className="w-8 h-8 hover:scale-110 transition-all" />
              <span className="text-xs font-medium">Quiz</span>
            </button>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleSave(index);
              }}
              className="flex flex-col items-center space-y-1"
            >
              {saves[index] ? (
                <FaBookmark className="w-8 h-8 text-blue-400 hover:scale-110 transition-all" />
              ) : (
                <FaRegBookmark className="w-8 h-8 hover:scale-110 transition-all" />
              )}
              <span className="text-xs font-medium">Save</span>
            </button>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-16 left-4 right-24 mb-15 z-10 text-white space-y-2">
            <h3 className="text-2xl font-bold drop-shadow-lg">{video.title}</h3>
            <p className="text-sm text-gray-200 font-medium">{video.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-blue-400" />
              <span className="text-sm font-medium">{video.author}</span>
            </div>
          </div>
        </div>
      ))}

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 max-w-md w-full shadow-2xl relative md:max-w-lg">
            <button
              onClick={() => setShowQuiz(false)}
              className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full"
            >
              <FaTimes className="w-6 h-6 text-gray-600" />
            </button>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Quick Quiz
              </h2>
              
              <p className="text-lg font-medium text-gray-800">{quizData.question}</p>
              
              <div className="grid grid-cols-1 gap-3">
                {quizData.options.map((option) => (
                  <div
                    key={option}
                    onClick={() => setSelectedOption(option)}
                    className={`p-4 rounded-xl cursor-pointer transition-all ${
                      selectedOption === option
                        ? 'bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-purple-500'
                        : 'bg-white/80 hover:bg-gray-50 border-2 border-transparent'
                    }`}
                  >
                    <span className="font-medium text-gray-800">{option}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleQuizSubmit}
                className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl text-white font-semibold transition-all"
                disabled={!selectedOption}
              >
                Check Answer
              </button>

              {quizResult !== null && (
                <div className={`p-4 rounded-xl text-center ${
                  quizResult ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {quizResult ? '🎉 Correct! Well done!' : '❌ Incorrect. Try again!'}
                  {!quizResult && <p className="mt-2 text-sm">Correct answer: {quizData.answer}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Doubt Modal */}
      {showDoubt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 max-w-md w-full shadow-2xl relative md:max-w-lg">
            <button
              onClick={() => setShowDoubt(false)}
              className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full"
            >
              <FaTimes className="w-6 h-6 text-gray-600" />
            </button>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Ask Doubt
              </h2>
              
              <textarea
                value={doubtText}
                onChange={(e) => setDoubtText(e.target.value)}
                placeholder="What concept are you struggling with?"
                className="w-full p-4 rounded-xl text-black bg-white/80 border-2 border-gray-200 focus:border-purple-400 focus:ring-0 resize-none"
                rows={4}
              />
              
              <button
                onClick={handleDoubtSubmit}
                className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl text-white font-semibold transition-all"
              >
                Submit Question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Micros;
