import express from 'express'
import bcrypt from 'bcrypt'
import { get, run } from '../db.js'

const router = express.Router()
const SALT_ROUNDS = 10

function normalizeUsername(username) {
  return username.trim().toLowerCase()
}

async function getUserScore(userId) {
  const row = await get('SELECT top_score FROM scores WHERE user_id = ?', [userId])
  return row ? row.top_score : 0
}

router.post('/register', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' })
  }

  const cleanUsername = normalizeUsername(username)
  const existingUser = await get('SELECT id FROM users WHERE username = ?', [cleanUsername])
  if (existingUser) {
    return res.status(400).json({ message: 'This username is already taken.' })
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
  const insertResult = await run(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [cleanUsername, passwordHash],
  )
  const userId = insertResult.lastID
  await run('INSERT INTO scores (user_id, top_score) VALUES (?, 0)', [userId])

  req.session.userId = userId
  req.session.username = cleanUsername

  res.json({
    user: {
      id: userId,
      username: cleanUsername,
      topScore: 0,
    },
  })
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' })
  }

  const cleanUsername = normalizeUsername(username)
  const user = await get('SELECT id, password FROM users WHERE username = ?', [cleanUsername])
  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password.' })
  }

  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    return res.status(400).json({ message: 'Invalid username or password.' })
  }

  const topScore = await getUserScore(user.id)
  req.session.userId = user.id
  req.session.username = cleanUsername

  res.json({
    user: {
      id: user.id,
      username: cleanUsername,
      topScore,
    },
  })
})

router.post('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ message: 'Unable to sign out. Please try again.' })
    }
    res.clearCookie('connect.sid')
    res.json({ message: 'Logged out successfully.' })
  })
})

router.get('/user', async (req, res) => {
  if (!req.session?.userId) {
    return res.status(401).json({ message: 'Not authenticated.' })
  }

  const user = await get('SELECT id, username FROM users WHERE id = ?', [req.session.userId])
  if (!user) {
    return res.status(401).json({ message: 'Session expired. Please log in again.' })
  }

  const topScore = await getUserScore(user.id)
  res.json({
    user: {
      id: user.id,
      username: user.username,
      topScore,
    },
  })
})

export default router
