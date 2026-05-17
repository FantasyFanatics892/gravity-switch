import express from 'express'
import session from 'express-session'
import SQLiteStoreFactory from 'connect-sqlite3'
import path from 'path'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import leaderboardRoutes from './routes/leaderboard.js'
import scoreRoutes from './routes/score.js'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PORT = process.env.PORT || 4000
const SESSION_SECRET = process.env.SESSION_SECRET || 'change-me'
const SQLiteStore = SQLiteStoreFactory(session)

const app = express()

app.use(express.json())
app.use(
  session({
    store: new SQLiteStore({ db: 'sessions.db', dir: path.join(__dirname, 'data') }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
      secure: false,
    },
  }),
)

app.use('/api', authRoutes)
app.use('/api', leaderboardRoutes)
app.use('/api', scoreRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')))
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`)
})
