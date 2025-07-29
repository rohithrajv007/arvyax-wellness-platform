import React, { useState, useEffect } from 'react';
import { Heart, Users, Tag, Loader2, AlertCircle, Sparkles, Zap, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPublicSessions = async () => {
      try {
        const response = await fetch('https://arvyax-wellness-api.onrender.com/api/sessions');
        const data = await response.json();
        setSessions(data);
      } catch (err) {
        setError('Failed to fetch sessions. The server might be busy.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicSessions();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-400/20 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-purple-400/20 rounded-full blur-xl animate-bounce delay-1000"></div>
        
        <div className="text-center space-y-8 z-10">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-cyan-400/30 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-white font-bold text-xl tracking-wide">Initializing Wellness Hub</p>
            <p className="text-gray-300 text-sm font-medium">Connecting to your mindful journey...</p>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-gray-900 via-red-900 to-orange-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_70%)]"></div>
        <div className="text-center space-y-8 z-10 p-8">
          <div className="relative">
            <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto border-2 border-red-500/30">
              <AlertCircle className="w-12 h-12 text-red-400" />
            </div>
            <div className="absolute inset-0 w-24 h-24 bg-red-500/10 rounded-full mx-auto animate-ping"></div>
          </div>
          <div className="space-y-4">
            <h2 className="text-red-400 font-bold text-xl">Connection Lost</h2>
            <p className="text-gray-300 max-w-md leading-relaxed">{error}</p>
            <button className="px-6 py-3 bg-red-500/20 text-red-300 border border-red-500/30 rounded-xl hover:bg-red-500/30 transition-all duration-300">
              Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    // --- ✨ ROOT CONTAINER: Set to full screen height/width and flex column layout ---
    <div className="h-screen w-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex flex-col overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      
      {/* Dynamic Background Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

      {/* --- ✨ HEADER: Does not grow or shrink --- */}
      <header className="relative backdrop-blur-xl bg-black/20 border-b border-white/10 z-50 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="relative group cursor-pointer">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-cyan-500/25 transition-all duration-500 group-hover:scale-110">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
              </div>
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                  Wellness Hub
                </h1>
                <p className="text-gray-400 text-sm font-semibold tracking-wide flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Transform your mindful journey
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="group relative inline-block px-8 py-3 font-bold text-gray-300 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transform transition-all duration-300 overflow-hidden hover:scale-105 hover:text-white hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <span className="relative z-10">Login</span>
                {/* Shine Effect */}
                <span className="absolute top-0 left-[-150%] h-full w-[50%] -skew-x-12 bg-white/10 transition-all duration-700 group-hover:left-[150%]"></span>
              </Link>
              <Link
                to="/register"
                className="group relative inline-block px-8 py-3 font-bold text-gray-300 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transform transition-all duration-300 overflow-hidden hover:scale-105 hover:text-white hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Sign Up
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                {/* Shine Effect */}
                <span className="absolute top-0 left-[-150%] h-full w-[50%] -skew-x-12 bg-white/10 transition-all duration-700 group-hover:left-[150%]"></span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* --- ✨ MAIN CONTENT: Fills remaining space and scrolls internally --- */}
      <main className="flex-1 overflow-y-auto relative w-full">
        <div className="max-w-7xl mx-auto px-8 py-16">
          {sessions.length === 0 ? (
            <div className="text-center py-16">
              <div className="relative mb-12">
                <div className="w-40 h-40 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-white/10">
                  <Sparkles className="w-20 h-20 text-cyan-400 animate-pulse" />
                </div>
                <div className="absolute inset-0 w-40 h-40 bg-gradient-to-r from-cyan-300/20 to-purple-300/20 rounded-full mx-auto blur-2xl animate-pulse"></div>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white">No Active Sessions</h2>
                <p className="text-gray-300 max-w-lg mx-auto leading-relaxed text-lg">
                  The wellness universe is preparing something extraordinary.
                  <br />
                  <span className="text-cyan-400 font-semibold">Stay tuned for transformative experiences.</span>
                </p>
                <div className="flex justify-center">
                  <div className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-gray-400 font-medium">
                    🌟 New sessions loading soon...
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {sessions.map((session, index) => (
                <div
                  key={session._id}
                  className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-cyan-500/30 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 overflow-hidden"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animation: 'slideInUp 0.8s ease-out forwards'
                  }}
                >
                  {/* ... rest of the card content is unchanged ... */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
                  <div className="relative flex items-start justify-between mb-8">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 border border-white/10">
                        <Heart className="w-8 h-8 text-cyan-400 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500"></div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                      <Users className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
                    </div>
                  </div>
                  <h3 className="relative text-xl font-bold text-white mb-6 group-hover:text-cyan-300 transition-colors duration-300 leading-tight">
                    {session.title}
                  </h3>
                  <div className="relative flex items-center mb-8 text-sm text-gray-400">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-3 group-hover:bg-cyan-400 group-hover:shadow-lg group-hover:shadow-cyan-400/50 transition-all duration-300"></div>
                    <span className="font-semibold group-hover:text-gray-300 transition-colors duration-300">
                      {session.user.email}
                    </span>
                  </div>
                  <div className="relative flex flex-wrap gap-3 mb-6">
                    {session.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold bg-white/10 text-gray-300 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-all duration-300 border border-white/10 group-hover:border-cyan-500/30 backdrop-blur-sm"
                      >
                        <Tag className="w-3 h-3 mr-2" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="relative pt-4 border-t border-white/10 group-hover:border-cyan-500/30 transition-colors duration-300">
                    <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      <span className="text-xs font-semibold text-gray-400 group-hover:text-cyan-400 transition-colors duration-300">
                        
                      </span>
                      <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;