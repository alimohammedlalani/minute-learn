import React, { useState } from "react";

const Upload = ({ onUpload }) => {
  const [contentType, setContentType] = useState("lesson"); 
  const [videoFile, setVideoFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [instructor, setInstructor] = useState("");
  const [modules, setModules] = useState([{ title: "", lessons: [""] }]);
  const [duration, setDuration] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(null);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleModuleChange = (moduleIndex, field, value) => {
    const newModules = [...modules];
    newModules[moduleIndex][field] = value;
    setModules(newModules);
  };

  const handleLessonChange = (moduleIndex, lessonIndex, value) => {
    const newModules = [...modules];
    newModules[moduleIndex].lessons[lessonIndex] = value;
    setModules(newModules);
  };

  const addModule = () => {
    setModules([...modules, { title: "", lessons: [""] }]);
  };

  const addLesson = (moduleIndex) => {
    const newModules = [...modules];
    newModules[moduleIndex].lessons.push("");
    setModules(newModules);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isCourse = contentType === "course";
    
    const baseValidation = !title || !description || !category;
    const lessonValidation = !videoFile || !question || options.some(opt => !opt) || correctIndex === null;
    const courseValidation = !coverImage || modules.some(m => !m.title || m.lessons.some(l => !l));

    if (baseValidation || (isCourse ? courseValidation : lessonValidation)) {
      alert("Please fill all required fields");
      return;
    }

    const newContent = {
      id: Date.now(),
      type: contentType,
      title,
      description,
      category,
      instructor,
      date: new Date().toISOString(),
      ...(isCourse ? {
        coverImage: URL.createObjectURL(coverImage),
        duration,
        modules: modules.map(m => ({
          ...m,
          lessons: m.lessons.filter(l => l.trim())
        }))
      } : {
        videoUrl: URL.createObjectURL(videoFile),
        quiz: { question, options, correctIndex }
      })
    };

    onUpload(newContent);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setInstructor("");
    setContentType("lesson");
    setVideoFile(null);
    setCoverImage(null);
    setModules([{ title: "", lessons: [""] }]);
    setDuration("");
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectIndex(null);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-4xl mx-auto p-6 pb-20 md:p-28 backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 shadow-2xl space-y-8"
    >
      <div className="flex gap-4 mb-8">
        <button
          type="button"
          onClick={() => setContentType("lesson")}
          className={`flex-1 py-3 rounded-xl text-lg font-semibold transition-all ${
            contentType === "lesson" 
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
              : "bg-white/10 text-gray-400 hover:bg-white/20"
          }`}
        >
          Micro Lesson
        </button>
        <button
          type="button"
          onClick={() => setContentType("course")}
          className={`flex-1 py-3 rounded-xl text-lg font-semibold transition-all ${
            contentType === "course" 
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
              : "bg-white/10 text-gray-400 hover:bg-white/20"
          }`}
        >
          Full Course
        </button>
      </div>

      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
        {contentType === "course" ? "Create New Course" : "Create Micro Lesson"}
      </h2>

      {/* Common Fields */}
      <div className="space-y-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3.5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3.5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3.5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="text"
            placeholder="Instructor Name"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            className="w-full px-4 py-3.5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Content Specific Fields */}
        {contentType === "course" ? (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Cover Image</label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-2xl hover:border-purple-400/50 transition-all cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverImage(e.target.files[0])}
                  className="hidden"
                  required
                />
                <div className="text-center space-y-2">
                  <svg className="w-8 h-8 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <p className="text-sm text-gray-400">
                    {coverImage ? coverImage.name : 'Upload cover image'}
                  </p>
                </div>
              </label>
            </div>

            <input
              type="text"
              placeholder="Course Duration (e.g., 6 weeks)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-3.5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div className="space-y-4">
              {modules.map((module, moduleIndex) => (
                <div key={moduleIndex} className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <input
                    type="text"
                    placeholder={`Module ${moduleIndex + 1} Title`}
                    value={module.title}
                    onChange={(e) => handleModuleChange(moduleIndex, "title", e.target.value)}
                    className="w-full px-4 py-3 mb-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />

                  <div className="space-y-2">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div key={lessonIndex} className="flex gap-2">
                        <input
                          type="text"
                          placeholder={`Lesson ${lessonIndex + 1} Title`}
                          value={lesson}
                          onChange={(e) => handleLessonChange(moduleIndex, lessonIndex, e.target.value)}
                          className="flex-1 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newModules = [...modules];
                            newModules[moduleIndex].lessons.splice(lessonIndex, 1);
                            setModules(newModules);
                          }}
                          className="px-3 text-red-400 hover:text-red-500"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => addLesson(moduleIndex)}
                    className="mt-2 text-sm text-purple-400 hover:text-purple-500"
                  >
                    + Add Lesson
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addModule}
                className="w-full py-2 text-purple-400 hover:text-purple-500 border border-dashed border-purple-400/50 rounded-xl"
              >
                + Add Module
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Video Upload</label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-2xl hover:border-purple-400/50 transition-all cursor-pointer">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files[0])}
                  className="hidden"
                  required
                />
                <div className="text-center space-y-2">
                  <svg className="w-8 h-8 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                  <p className="text-sm text-gray-400">
                    {videoFile ? videoFile.name : 'Click to upload video'}
                  </p>
                </div>
              </label>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-semibold text-gray-200 mb-4">Quiz Configuration</h3>
              <input
                type="text"
                placeholder="Enter quiz question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full px-4 py-3.5 mb-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {options.map((opt, i) => (
                  <div key={i} className="relative flex items-center">
                    <input
                      type="text"
                      placeholder={`Option ${i + 1}`}
                      value={opt}
                      onChange={(e) => handleOptionChange(i, e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 peer"
                      required
                    />
                    <div 
                      onClick={() => setCorrectIndex(i)}
                      className={`absolute left-3 w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${
                        correctIndex === i 
                          ? 'border-transparent bg-gradient-to-r from-purple-500 to-indigo-500' 
                          : 'border-white/20 hover:border-purple-400'
                      }`}
                    >
                      {correctIndex === i && <div className="w-2 h-2 bg-white rounded-full"/>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl text-lg font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all transform hover:scale-[1.02]"
      >
        {contentType === "course" ? "Publish Course" : "Publish Lesson"}
      </button>
    </form>
  );
};

export default Upload;