// /backend/src/api/controllers/sessions.controller.js

const Session = require('../../models/Session');

/**
 * @desc    Get all published wellness sessions
 * @route   GET /api/sessions
 * @access  Public
 */
const getPublicSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ status: 'published' }).populate(
      'user',
      'email'
    );
    res.json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Get all of a user's own sessions (drafts and published)
 * @route   GET /api/sessions/my-sessions
 * @access  Private
 */
const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id });
    res.json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Get a single user session by its ID
 * @route   GET /api/sessions/my-sessions/:id
 * @access  Private
 */
const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Ensure the session belongs to the user making the request
    if (session.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Save or update a draft session
 * @route   POST /api/sessions/save-draft
 * @access  Private
 */
const saveOrUpdateDraft = async (req, res) => {
  const { sessionId, title, tags, jsonFileUrl } = req.body;

  try {
    // If a sessionId is provided, update the existing draft
    if (sessionId) {
      const session = await Session.findById(sessionId);

      if (!session) {
        return res.status(404).json({ message: 'Session not found' });
      }

      // Ensure the user owns this session
      if (session.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      // Update the fields
      session.title = title || session.title;
      session.tags = tags || session.tags;
      session.jsonFileUrl = jsonFileUrl || session.jsonFileUrl;
      session.status = 'draft'; // Ensure it remains a draft

      const updatedSession = await session.save();
      return res.json(updatedSession);
    } else {
      // If no sessionId, create a new draft
      const newSession = new Session({
        user: req.user.id,
        title,
        tags,
        jsonFileUrl,
        status: 'draft',
      });

      const savedSession = await newSession.save();
      res.status(201).json(savedSession);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Publish a session
 * @route   POST /api/sessions/publish
 * @access  Private
 */
const publishSession = async (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ message: 'Session ID is required' });
  }

  try {
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Ensure the user owns this session
    if (session.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    session.status = 'published';
    const publishedSession = await session.save();

    res.json(publishedSession);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getPublicSessions,
  getMySessions,
  getSessionById,
  saveOrUpdateDraft,
  publishSession,
};