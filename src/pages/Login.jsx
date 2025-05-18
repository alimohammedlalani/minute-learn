

import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { googleProvider } from "../util/firebase";
import { auth } from "../util/firebase";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      console.error("Email sign-in error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1B3E] to-[#2A2A60] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl p-8 space-y-8">
        {/* Logo Section */}
        <div className="space-y-6 text-center">
          <img
            alt="Company Logo"
            src="src/assets/logo.png"
            className="mx-auto h-16 w-auto filter brightness-125"
          />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-300">
            Sign in to continue your learning journey
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleEmailSignIn}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="hello@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all transform hover:scale-[1.02]"
            >
            Sign In
          </button>
        </form>

        {/* Google Sign-In Section */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#1A1B3E] text-gray-400">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 py-3.5 px-6 bg-white/5 backdrop-blur-sm hover:bg-white/10 rounded-lg border border-white/10 transition-all"
        >
          <img 
            src="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000"
            className="h-5 w-5 invert"
            alt="Google logo"
          />
          <span className="text-sm font-medium text-gray-200">
            Sign in with Google
          </span>
        </button>
      </div>
    </div>
  );
}