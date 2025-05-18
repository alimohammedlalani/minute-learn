import React from 'react';

const Progress = () => {
  const completedCourses = ['React Basics', 'Firebase Intro', 'JS Mastery'];
  const streakDays = 5;
  const xp = 1340;
  const points = 520;
  const certificates = [
    { title: 'React Basics', issued: '2025-05-01' },
    { title: 'Firebase Intro', issued: '2025-05-10' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-10 m-10 space-y-8 backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 shadow-2xl">
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
        Your Learning Journey
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stats Cards */}
        {[
          { title: '🔥 Streak', value: streakDays, unit: 'days' },
          { title: '⭐ XP', value: xp },
          { title: '🎯 Points', value: points },
          { title: '🎓 Completed', value: completedCourses.length },
        ].map((stat, idx) => (
          <div 
            key={idx}
            className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
          >
            <p className="text-sm font-medium text-gray-300 mb-1">{stat.title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-bold bg-gradient-to-r from-indigo-200 to-purple-300 bg-clip-text text-transparent">
                {stat.value}
              </p>
              {stat.unit && <span className="text-sm text-gray-400">{stat.unit}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Completed Courses */}
      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 space-y-4">
        <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 p-2 rounded-lg">📚</span>
          Completed Courses
        </h3>
        <ul className="space-y-3">
          {completedCourses.map((course, idx) => (
            <li 
              key={idx}
              className="flex items-center p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="h-2 w-2 bg-purple-400 rounded-full mr-3" />
              <span className="text-gray-200">{course}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Certificates */}
      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 space-y-4">
        <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 p-2 rounded-lg">🏆</span>
          Certificates Earned
        </h3>
        <ul className="space-y-3">
          {certificates.map((cert, idx) => (
            <li 
              key={idx}
              className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors"
            >
              <span className="text-gray-200">{cert.title}</span>
              <span className="text-sm text-gray-400">{cert.issued}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Progress;




















