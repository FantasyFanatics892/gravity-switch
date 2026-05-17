import { useCallback, useEffect, useRef, useState } from 'react'
import {
  type GameData,
  createGameConfig,
  generateObstacle,
  checkCollision,
  updateTrail,
  updateParticles,
  createFlipParticles,
  createDeathParticles,
  renderGame,
  playFlipSound,
  playScoreSound,
  playDeathSound,
  initAudio,
} from '@/lib/game'

// Flutter Bridge type definition
declare global {
  interface Window {
    FlutterBridge?: {
      postMessage: (message: string) => void
    }
  }
}

export function useGame(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  initialHighScore = 0,
  onGameOver?: (score: number) => void,
) {
  const [dimensions, setDimensions] = useState({ width: 360, height: 640 })
  const gameRef = useRef<GameData | null>(null)
  const animationRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)

  const initGame = useCallback(
    (width: number, height: number): GameData => {
      const config = createGameConfig(width, height)
      return {
        state: 'idle',
        config,
        player: {
          y: config.floorY - config.playerSize / 2 - 5,
          vy: 0,
          gravityDir: 1,
          rotation: 0,
          targetRotation: 0,
        },
        obstacles: [],
        particles: [],
        trail: [],
        score: 0,
        highScore: initialHighScore,
        distance: 0,
        speed: config.baseSpeed,
        nextObstacleIn: config.minGap,
      }
    },
    [initialHighScore],
  )

  const handleTap = useCallback(() => {
    if (!gameRef.current) return
    const game = gameRef.current

    initAudio()

    if (game.state === 'idle') {
      game.state = 'playing'
      game.player.gravityDir *= -1
      game.player.targetRotation += Math.PI
      game.particles = [
        ...game.particles,
        ...createFlipParticles(game.config.playerX, game.player.y, game.player.gravityDir),
      ]
      playFlipSound()
      return
    }

    if (game.state === 'gameover') {
      const { width, height } = game.config
      gameRef.current = initGame(width, height)
      return
    }

    if (game.state === 'playing') {
      game.player.gravityDir *= -1
      game.player.vy = game.player.gravityDir * game.config.flipSpeed
      game.player.targetRotation += Math.PI
      game.particles = [
        ...game.particles,
        ...createFlipParticles(game.config.playerX, game.player.y, game.player.gravityDir),
      ]
      playFlipSound()
    }
  }, [initGame])

  const gameLoop = useCallback(
    (timestamp: number) => {
      if (!gameRef.current || !canvasRef.current) {
        animationRef.current = requestAnimationFrame(gameLoop)
        return
      }

      const ctx = canvasRef.current.getContext('2d')
      if (!ctx) {
        animationRef.current = requestAnimationFrame(gameLoop)
        return
      }

      const deltaTime = lastTimeRef.current ? timestamp - lastTimeRef.current : 16.67
      lastTimeRef.current = timestamp
      const dt = deltaTime / 16.67

      const game = gameRef.current
      const { config, player } = game

      if (game.state === 'playing') {
        game.distance += game.speed * dt
        game.speed = Math.min(config.maxSpeed, game.speed + config.speedIncrement * dt)

        player.vy += config.gravity * player.gravityDir * dt
        player.vy = Math.max(-config.maxFallSpeed, Math.min(config.maxFallSpeed, player.vy))
        player.y += player.vy * dt

        const rotationDiff = player.targetRotation - player.rotation
        player.rotation += rotationDiff * 0.15 * dt

        const halfSize = config.playerSize / 2
        if (player.gravityDir === 1) {
          if (player.y > config.floorY - halfSize - 2) {
            player.y = config.floorY - halfSize - 2
            player.vy = 0
          }
        } else {
          if (player.y < config.ceilingY + halfSize + 2) {
            player.y = config.ceilingY + halfSize + 2
            player.vy = 0
          }
        }

        game.trail = updateTrail(game.trail, config.playerX, player.y)

        game.obstacles = game.obstacles.filter((obs) => {
          obs.x -= game.speed * dt

          if (!obs.passed && obs.x + obs.width / 2 < config.playerX - config.playerSize / 2) {
            obs.passed = true
            game.score += 1
            playScoreSound()
          }

          return obs.x > -obs.width
        })

        game.nextObstacleIn -= game.speed * dt
        if (game.nextObstacleIn <= 0) {
          const newObs = generateObstacle(config.width + 50, config, game.score)
          game.obstacles.push(newObs)

          const gapVariation = Math.max(config.minGap, config.maxGap - game.score * 2)
          game.nextObstacleIn = config.minGap + Math.random() * (gapVariation - config.minGap)
        }

        for (const obs of game.obstacles) {
          if (checkCollision(player, obs, config)) {
            game.state = 'gameover'
            game.particles = [...game.particles, ...createDeathParticles(config.playerX, player.y)]
            playDeathSound()

            if (game.score > game.highScore) {
              game.highScore = game.score
              onGameOver?.(game.score)
            }

            if (window.FlutterBridge) {
              window.FlutterBridge.postMessage(
                JSON.stringify({
                  event: 'gameEnd',
                  score: game.score,
                  highScore: game.highScore,
                }),
              )
            }
            break
          }
        }
      }

      game.particles = updateParticles(game.particles, dt)
      renderGame(ctx, game)
      animationRef.current = requestAnimationFrame(gameLoop)
    },
    [canvasRef, onGameOver],
  )

  useEffect(() => {
    const handleResize = () => {
      const width = Math.min(720, Math.max(320, window.innerWidth - 32))
      const height = Math.min(760, Math.max(580, window.innerHeight - 180))
      setDimensions({ width, height })
      if (!gameRef.current) {
        gameRef.current = initGame(width, height)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [initGame])

  useEffect(() => {
    if (!gameRef.current) {
      gameRef.current = initGame(dimensions.width, dimensions.height)
    }
  }, [dimensions, initGame])

  useEffect(() => {
    if (gameRef.current) {
      gameRef.current.highScore = initialHighScore
    }
  }, [initialHighScore])

  useEffect(() => {
    animationRef.current = requestAnimationFrame(gameLoop)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [gameLoop])

  return {
    dimensions,
    handleTap,
  }
}
