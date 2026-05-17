import express from 'express'
import { all } from '../db.js'

const router = express.Router()

router.get('/leaderboard', async (req, res) => {
  const limit = Math.min(50, Number(req.query.limit) || 50)
  const page = Math.max(1, Number(req.query.page) || 1)
  const offset = (page - 1) * limit

  const rows = await all(
    `SELECT
      u.username,
      s.top_score
    FROM users u
    LEFT JOIN scores s ON s.user_id = u.id
    ORDER BY s.top_score DESC, s.updated_at ASC
    LIMIT ?
    OFFSET ?`,
    [limit, offset],
  )

  const leaderboard = rows.map((row, index) => ({
    rank: offset + index + 1,
    username: row.username,
    topScore: row.top_score || 0,
  }))

  res.json({ data: leaderboard })
})

export default router
