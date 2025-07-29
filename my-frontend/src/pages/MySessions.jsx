import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { PlusCircle, LogOut, Edit, Tag, Loader, AlertTriangle, PackageOpen } from 'lucide-react';

const MySessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMySessions = async () => {
      try {
        // Assuming your setup has a proxy or you configure the base URL for axios
        const response = await axios.get('https://arvyax-wellness-api.onrender.com/api/sessions/my-sessions');
        setSessions(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
            setError('Your session has expired. Please log in again.');
            setTimeout(() => {
                handleLogout();
            }, 3000);
        } else {
            setError('Failed to fetch your sessions. Please try again later.');
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMySessions();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
        <div className="h-screen w-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center text-white">
            <div className="text-center">
                <Loader className="w-12 h-12 mx-auto animate-spin text-cyan-400 mb-4" />
                <h2 className="text-2xl font-bold">Loading Your Sessions...</h2>
                <p className="text-gray-400">Please wait a moment.</p>
            </div>
        </div>
    );
  }

  if (error) {
    return (
        <div className="h-screen w-screen bg-gradient-to-br from-gray-900 via-red-900 to-orange-900 flex items-center justify-center text-white">
            <div className="text-center">
                <AlertTriangle className="w-12 h-12 mx-auto text-red-400 mb-4" />
                <h2 className="text-2xl font-bold text-red-400">An Error Occurred</h2>
                <p className="text-gray-300">{error}</p>
            </div>
        </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex flex-col overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Header */}
      <header className="relative backdrop-blur-xl bg-black/20 border-b border-white/10 z-50 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-black bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
              My Wellness Sessions
            </h1>
            <div className="flex items-center space-x-4">
              <Link
                to="/session/new"
                className="group relative inline-flex items-center gap-2 px-6 py-3 text-white font-bold rounded-2xl transform hover:scale-105 transition-transform duration-300 overflow-hidden shadow-lg hover:shadow-cyan-500/40 bg-gradient-to-r from-cyan-500 to-purple-500"
              >
                <PlusCircle className="w-5 h-5"/>
                <span className="relative z-10">Create New Session</span>
                <span className="absolute top-0 left-[-150%] h-full w-[50%] -skew-x-12 bg-white/20 opacity-80 transition-all duration-700 group-hover:left-[150%]"></span>
              </Link>
              <button
                onClick={handleLogout}
                className="group relative inline-flex items-center gap-2 px-6 py-3 font-bold text-gray-300 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transform transition-all duration-300 overflow-hidden hover:scale-105 hover:text-white hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/20"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative w-full">
        <div className="max-w-7xl mx-auto px-8 py-16">
          {sessions.length === 0 ? (
            <div className="text-center py-16">
              <div className="relative mb-12">
                 <div className="w-40 h-40 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-white/10">
                    <PackageOpen className="w-20 h-20 text-cyan-400" />
                 </div>
              </div>
              <h2 className="text-3xl font-bold text-white">No Sessions Yet</h2>
              <p className="text-gray-300 max-w-lg mx-auto leading-relaxed text-lg mt-4 mb-6">
                It looks like you haven't created any wellness sessions.
              </p>
              <Link
                to="/session/new"
                className="group relative inline-flex items-center gap-2 px-8 py-4 text-white font-bold rounded-2xl transform hover:scale-105 transition-transform duration-300 overflow-hidden shadow-lg hover:shadow-cyan-500/40 bg-gradient-to-r from-cyan-500 to-purple-500"
              >
                <PlusCircle className="w-5 h-5"/>
                <span className="relative z-10">Create Your First Session</span>
                <span className="absolute top-0 left-[-150%] h-full w-[50%] -skew-x-12 bg-white/20 opacity-80 transition-all duration-700 group-hover:left-[150%]"></span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sessions.map((session) => (
                <div
                  key={session._id}
                  className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-cyan-500/30 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden flex flex-col"
                >
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                            {session.title}
                        </h3>
                        <p className={`capitalize text-xs font-bold px-3 py-1 rounded-full text-white ${session.status === 'published' ? 'bg-green-500/50' : 'bg-gray-500/50'}`}>
                            {session.status}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {session.tags.map((tag, index) => (
                        <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-300 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-all duration-300">
                          <Tag className="w-3 h-3 mr-1.5" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/10 group-hover:border-cyan-500/30 transition-colors duration-300 mt-auto">
                    <Link
                      to={`/session/edit/${session._id}`}
                      className="flex items-center justify-center gap-2 text-cyan-400 font-semibold hover:text-white transition-colors duration-300"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Session
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MySessions;
