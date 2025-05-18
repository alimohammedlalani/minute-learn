import React, { useState, useMemo, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = memo(() => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('content');
  const [newQuestion, setNewQuestion] = useState('');

  // Generate 20 courses with realistic data
  const courses = useMemo(() => 
    Array.from({ length: 30 }, (_, i) => {
      const topics = [
        'Video Editing Course 2025', 'Python Course', 'Machine Learning', 
        'Graphic Designing', 'Web Development', 'Graphic Designer', 'Web Dev 3.0',
        'Origami Art', 'UI/UX Design', 'Blockchain', 'DevOps',
        'Artificial Intelligence', 'Internet of Things', 'Big Data',
        'Network Engineering', 'Digital Marketing', 'Software Testing',
        'Quantum Computing', 'AR/VR Development', 'Ethical Hacking'
      ];
      
      return {
        id: i + 1,
        title: `${topics[i % 20]} `,
        username: `@${topics[i % 20].replace(/\s+/g, '')}_pro`,
        imgIndex: (i % 8) + 1,
        duration: `${Math.floor(Math.random() * 40) + 10} hours`,
        rating: (Math.random() * 0.5 + 4.5).toFixed(1),
        description: `Comprehensive ${topics[i % 20]} course covering fundamentals to advanced concepts. Learn through hands-on projects, real-world examples, and interactive sessions. Perfect for beginners and experienced developers alike.`,
        modules: Array.from({ length: 5 }, (_, j) => ({
          title: `Module ${j + 1}: ${['Foundations', 'Core Concepts', 'Advanced Techniques', 'Projects', 'Deployment'][j % 5]}`,
          lessons: Array.from({ length: 5 }, (_, k) => 
            `Lesson ${k + 1}: ${['Introduction', 'Setup', 'Implementation', 'Best Practices', 'Testing'][k % 5]}`),
          quiz: {
            question: `What is the primary purpose of ${['variables', 'functions', 'classes', 'APIs', 'databases'][j % 5]} in ${topics[i % 20]}?`,
            options: ['Syntax', 'Data Storage', 'Code Reusability', 'All of the above'],
            answer: 3
          }
        })),
        doubts: Array.from({ length: 3 }, (_, j) => ({
          id: j + 1,
          question: `How to ${['install', 'configure', 'debug'][j % 3]} ${topics[i % 20]} environment?`,
          votes: Math.floor(Math.random() * 20)
        }))
      };
    }), []
  );

  const CourseCard = memo(({ course }) => (
    <div
      className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl"
      onClick={() => handleCourseClick(course)}
    >
      <div className="relative pb-[56.25%]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/20 flex items-center justify-center">
          <img src={`src/assets/img${course.imgIndex}.png`}
                                   alt={course.title}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"/>
           {/* <span className="text-gray-300 text-sm">Course Preview</span>  */}
        </div>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg line-clamp-2">{course.title}</h3>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-300">{course.username}</span>
          <span className="text-yellow-400">★ {course.rating}</span>
        </div>
      </div>
    </div>
  ));

  const handleCourseClick = useCallback((course) => {
    setSelectedCourse(course);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBack = useCallback(() => {
    setSelectedCourse(null);
    setExpandedModule(null);
    setActiveTab('content');
  }, []);

  const filteredCourses = useMemo(() => 
    courses.filter(course =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    ), [courses, searchQuery]);

  const renderTabContent = useCallback(() => {
    switch(activeTab) {
      case 'quizzes':
        return (
          <div className="space-y-4">
            {selectedCourse.modules.map((module, idx) => (
              <div key={idx} className="bg-white/5 p-4 rounded-xl">
                <h3 className="font-semibold mb-3">{module.title} Quiz</h3>
                <p className="text-sm mb-4 text-gray-300">{module.quiz.question}</p>
                <div className="grid gap-2">
                  {module.quiz.options.map((option, i) => (
                    <button
                      key={i}
                      className="p-3 text-left rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <button className="mt-4 px-4 py-2 bg-[#6366F1] rounded-lg hover:bg-[#7577FF] transition-colors">
                  Submit Answer
                </button>
              </div>
            ))}
          </div>
        );

      case 'doubts':
        return (
          <div className="space-y-4">
            <form onSubmit={(e) => {
              e.preventDefault();
              if(newQuestion.trim()) {
                const newDoubt = {
                  id: Date.now(),
                  question: newQuestion.trim(),
                  votes: 0
                };
                selectedCourse.doubts = [newDoubt, ...selectedCourse.doubts];
                setNewQuestion('');
              }
            }}>
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Ask your question..."
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-[#6366F1]"
              />
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-[#6366F1] rounded-lg hover:bg-[#7577FF] transition-colors"
              >
                Post Question
              </button>
            </form>

            <div className="space-y-3">
              {selectedCourse.doubts.map(doubt => (
                <div key={doubt.id} className="bg-white/5 p-4 rounded-xl">
                  <div className="flex justify-between items-start">
                    <p className="text-sm">{doubt.question}</p>
                    <button className="flex items-center space-x-1 text-sm hover:text-[#6366F1]">
                      <span>▲</span>
                      <span>{doubt.votes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            {selectedCourse.modules.map((module, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 p-4 rounded-xl cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => setExpandedModule(expandedModule === idx ? null : idx)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Module {idx + 1}</h3>
                    <p className="text-sm text-gray-300">{module.title}</p>
                  </div>
                  <svg 
                    className={`w-5 h-5 transform transition-transform ${
                      expandedModule === idx ? 'rotate-90' : ''
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>

                {expandedModule === idx && (
                  <div className="mt-3 space-y-2">
                    {module.lessons.map((lesson, i) => (
                      <div 
                        key={i} 
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5"
                      >
                        <div className="w-8 h-8 flex items-center justify-center bg-[#6366F1]/20 rounded-full">
                          <span className="text-sm">{i + 1}</span>
                        </div>
                        <span className="text-sm">{lesson}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
    }
  }, [activeTab, expandedModule, selectedCourse, newQuestion]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1B3E] to-[#2A2A60] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="flex items-center space-x-4">
          {selectedCourse && (
            <button 
              onClick={handleBack}
              className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-white/10 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              <span className="hidden md:inline">Back to Courses</span>
            </button>
          )}
          <img 
            src="src/assets/logo.png" 
            className="h-8 w-auto ml-4 md:ml-8 filter brightness-125" 
            alt="Academy Pro"
          />
        </div>

        {!selectedCourse && (
          <div className="hidden md:flex flex-grow max-w-2xl items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 space-x-4 transition-all duration-300 hover:bg-white/15 mx-8">
            <input
              type="text"
              placeholder="Search courses..."
              className="flex-grow bg-transparent outline-none text-sm placeholder-gray-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        )}

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate("/login")}
            className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-6 py-2.5 rounded-full text-sm font-medium hover:from-[#7577FF] hover:to-[#9B6CFD] transition-all duration-300 shadow-lg shadow-indigo-500/20"
          >
            <span>Login</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </button>

          {/* Mobile Login Button */}
          <button 
            onClick={() => navigate("/login")}
            className="md:hidden p-2 bg-[#6366F1] rounded-full"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Search */}
      {!selectedCourse && (
        <div className="md:hidden p-4 sticky top-16 z-40 bg-[#1A1B3E]/80 backdrop-blur-lg">
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-5 py-3 space-x-3">
            <input
              type="text"
              placeholder="Search courses..."
              className="flex-grow bg-transparent outline-none text-sm placeholder-gray-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>
      )}

      {/* Main Content */}
      {selectedCourse ? (
        <div className="max-w-7xl mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8">
          <div className="flex-grow i lg:w-2/3 space-y-6">
            <div className="relative h-[50vh] max-h-[600px]  max-w-[300px] flex items-center justify-center rounded-2xl border border-white/10 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="aspect-[9/16] w-full max-w-[300px]  rounded-lg flex items-center justify-center">
                  <video src="src/assets/videos/video1.mp4" autoPlay muted></video>
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex border-b border-white/10">
              {['content', 'quizzes', 'doubts'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 mr-4 capitalize ${
                    activeTab === tab 
                      ? 'border-b-2 border-[#6366F1] font-semibold'
                      : 'hover:text-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="max-h-[50vh] overflow-y-auto pr-2">
              {renderTabContent()}
            </div>
          </div>

       
          <div className="lg:w-1/3 lg:max-w-md space-y-6">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <h2 className="text-xl font-semibold mb-4">Course Details</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Instructor:</span>
                  <span>{selectedCourse.username}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Duration:</span>
                  <span>{selectedCourse.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Rating:</span>
                  <span>★ {selectedCourse.rating}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Modules:</span>
                  <span>{selectedCourse.modules.length}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-300 text-sm">{selectedCourse.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Popular Courses ({courses.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default Home;