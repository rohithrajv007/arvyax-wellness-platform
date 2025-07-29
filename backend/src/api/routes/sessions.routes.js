const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware');
const {
  getPublicSessions,
  getMySessions,
  getSessionById,
  saveOrUpdateDraft,
  publishSession,
} = require('../controllers/sessions.controller');
// --- Public Route ---
// @route   GET /api/sessions
// @desc    Get all published wellness sessions
// @access  Public
router.get('/', getPublicSessions);


// --- Protected Routes ---
// All routes below this point will be protected by our 'protect' middleware

// @route   GET /api/sessions/my-sessions
// @desc    Get all of a user's own sessions (drafts and published)
// @access  Private
router.get('/my-sessions', protect, getMySessions);

// @route   POST /api/sessions/save-draft
// @desc    Save or update a draft session
// @access  Private
router.post('/save-draft', protect, saveOrUpdateDraft);

// @route   POST /api/sessions/publish
// @desc    Publish a session
// @access  Private
router.post('/publish', protect, publishSession);

// @route   GET /api/sessions/my-sessions/:id
// @desc    Get a single user session by its ID
// @access  Private
router.get('/my-sessions/:id', protect, getSessionById);


module.exports = router;