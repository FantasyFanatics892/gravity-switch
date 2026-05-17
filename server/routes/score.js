import express from 'express'
import { get, run } from '../db.js'

const router = express.Router()

router.post('/score', async (req, res) => {
  if (!req.session?.userId) {
    return res.status(401).json({ message: 'Not authenticated.' })
  }

  const score = Number(req.body.score)
  if (!Number.isFinite(score) || score < 0) {
    return res.status(400).json({ message: 'Score must be a positive number.' })
  }

  const userId = req.session.userId
  const current = await get('SELECT top_score FROM scores WHERE user_id = ?', [userId])

  if (!current) {
    await run('INSERT INTO scores (user_id, top_score) VALUES (?, ?)', [userId, score])
    return res.json({ topScore: score })
  }

  if (score > current.top_score) {
    await run(
      'UPDATE scores SET top_score = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?',
      [score, userId],
    )
    return res.json({ topScore: score })
  }

  res.json({ topScore: current.top_score })
})

export default router
