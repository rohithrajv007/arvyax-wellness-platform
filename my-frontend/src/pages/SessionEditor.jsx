import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { Type, Tag, Link as LinkIcon, Save, Send, Loader, AlertTriangle, CheckCircle, ArrowLeft } from 'lucide-react';

// A simple debounce hook
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};

const SessionEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const isNewSession = !id;

    const [session, setSession] = useState({
        title: '',
        tags: [],
        jsonFileUrl: '',
    });
    const [sessionId, setSessionId] = useState(id);
    const [status, setStatus] = useState({ message: '', type: 'idle' }); // idle, saving, saved, error
    const [isLoading, setIsLoading] = useState(!isNewSession);
    const [isPublishing, setIsPublishing] = useState(false);

    const debouncedSession = useDebounce(session, 2000);

    const handleSessionExpired = useCallback(() => {
        logout();
        navigate('/login');
    }, [logout, navigate]);

    // Fetch existing session data
    useEffect(() => {
        if (!isNewSession) {
            const fetchSession = async () => {
                try {
                    const res = await axios.get(`https://arvyax-wellness-api.onrender.com/api/sessions/my-sessions/${id}`);
                    setSession({
                        title: res.data.title || '',
                        tags: res.data.tags || [],
                        jsonFileUrl: res.data.jsonFileUrl || '',
                    });
                } catch (error) {
                    console.error("Failed to fetch session", error);
                    if (error.response?.status === 401) {
                        setStatus({ message: 'Session expired. Logging out...', type: 'error' });
                        setTimeout(handleSessionExpired, 2000);
                    } else {
                        setStatus({ message: 'Error: Could not load session data.', type: 'error' });
                    }
                } finally {
                    setIsLoading(false);
                }
            };
            fetchSession();
        }
    }, [id, isNewSession, handleSessionExpired]);

    const handleSaveDraft = useCallback(async (sessionData) => {
        if (!sessionData.title) return;

        setStatus({ message: 'Saving...', type: 'saving' });
        try {
            const payload = { ...sessionData, sessionId };
            const res = await axios.post('https://arvyax-wellness-api.onrender.com/api/sessions/save-draft', payload);
            
            if (!sessionId) {
                setSessionId(res.data._id);
                navigate(`/session/edit/${res.data._id}`, { replace: true });
            }

            setStatus({ message: 'Draft saved!', type: 'saved' });
            setTimeout(() => setStatus(s => s.type === 'saved' ? { message: '', type: 'idle' } : s), 2000);
        } catch (error) {
            console.error("Failed to save draft", error);
             if (error.response?.status === 401) {
                setStatus({ message: 'Session expired. Logging out...', type: 'error' });
                setTimeout(handleSessionExpired, 2000);
            } else {
                setStatus({ message: 'Error: Could not save draft.', type: 'error' });
            }
        }
    }, [sessionId, navigate, handleSessionExpired]);

    // Auto-save effect
    useEffect(() => {
        const isInitialLoad = isLoading && !isNewSession;
        if (isInitialLoad || !debouncedSession.title) return;
        
        handleSaveDraft(debouncedSession);

    }, [debouncedSession, handleSaveDraft, isLoading, isNewSession]);

    const handlePublish = async () => {
        if (!sessionId) {
            setStatus({ message: 'Please save a draft before publishing.', type: 'error' });
            return;
        }
        setIsPublishing(true);
        setStatus({ message: 'Publishing...', type: 'saving' });
        try {
            await axios.post('https://arvyax-wellness-api.onrender.com/api/sessions/publish', { sessionId });
            setStatus({ message: 'Session published successfully!', type: 'saved' });
            setTimeout(() => navigate('/my-sessions'), 1500);
        } catch (error) {
            console.error("Failed to publish", error);
            if (error.response?.status === 401) {
                setStatus({ message: 'Session expired. Logging out...', type: 'error' });
                setTimeout(handleSessionExpired, 2000);
            } else {
                setStatus({ message: 'Error: Could not publish.', type: 'error' });
            }
        } finally {
            setIsPublishing(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSession(prev => ({ ...prev, [name]: value }));
    };

    const handleTagsChange = (e) => {
        const tagsArray = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
        setSession(prev => ({ ...prev, tags: tagsArray }));
    };

    const StatusIndicator = () => {
        if (status.type === 'idle') return null;
        const iconMap = {
            saving: <Loader className="w-4 h-4 animate-spin" />,
            saved: <CheckCircle className="w-4 h-4" />,
            error: <AlertTriangle className="w-4 h-4" />,
        };
        const colorMap = {
            saving: 'text-cyan-300',
            saved: 'text-green-400',
            error: 'text-red-400',
        };
        return (
            <div className={`flex items-center gap-2 text-sm ${colorMap[status.type]}`}>
                {iconMap[status.type]}
                <span>{status.message}</span>
            </div>
        );
    };

    if (isLoading && !isNewSession) {
        return (
            <div className="h-screen w-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center text-white">
                <div className="text-center">
                    <Loader className="w-12 h-12 mx-auto animate-spin text-cyan-400 mb-4" />
                    <h2 className="text-2xl font-bold">Loading Editor...</h2>
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
                <div className="max-w-7xl mx-auto px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <Link to="/my-sessions" className="text-gray-400 hover:text-white transition-colors">
                                <ArrowLeft className="w-6 h-6" />
                            </Link>
                            <h2 className="text-2xl font-bold text-white">{isNewSession ? 'Create New Session' : 'Edit Session'}</h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <StatusIndicator />
                            <button 
                                onClick={() => handleSaveDraft(session)} 
                                disabled={status.type === 'saving'}
                                className="group relative inline-flex items-center gap-2 px-6 py-2 font-bold text-gray-300 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 overflow-hidden hover:text-white hover:border-cyan-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Save className="w-4 h-4" />
                                Save Draft
                            </button>
                            <button 
                                onClick={handlePublish}
                                disabled={isPublishing || status.type === 'saving'}
                                className="group relative inline-flex items-center gap-2 px-6 py-2 text-white font-bold rounded-xl transform transition-transform duration-300 overflow-hidden bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-105 shadow-lg hover:shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isPublishing ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                {isPublishing ? 'Publishing...' : 'Publish'}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative w-full">
                <div className="max-w-4xl mx-auto px-8 py-12">
                    <div className="space-y-8">
                        <div>
                            <label htmlFor="title" className="text-lg font-semibold text-gray-300 mb-2 block">Session Title</label>
                            <div className="relative">
                                <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={session.title}
                                    onChange={handleChange}
                                    placeholder="e.g., Morning Yoga Flow"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pr-4 pl-12 text-2xl font-bold text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="tags" className="text-lg font-semibold text-gray-300 mb-2 block">Tags</label>
                            <div className="relative">
                                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    id="tags"
                                    name="tags"
                                    value={session.tags.join(', ')}
                                    onChange={handleTagsChange}
                                    placeholder="yoga, meditation, beginner (comma-separated)"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pr-4 pl-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="jsonFileUrl" className="text-lg font-semibold text-gray-300 mb-2 block">JSON File URL</label>
                            <div className="relative">
                                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    id="jsonFileUrl"
                                    name="jsonFileUrl"
                                    value={session.jsonFileUrl}
                                    onChange={handleChange}
                                    placeholder="https://example.com/session.json"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pr-4 pl-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SessionEditor;
