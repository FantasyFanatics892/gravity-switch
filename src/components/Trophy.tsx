import { cn } from '@/lib/utils'

interface TrophyProps {
  rank: number
  isCurrentUser?: boolean
  className?: string
}

export function Trophy({ rank, isCurrentUser, className }: TrophyProps) {
  const getTrophyColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-yellow-400'
      case 2:
        return 'text-gray-300'
      case 3:
        return 'text-orange-400'
      default:
        return 'text-white/40'
    }
  }

  const getTrophyEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇'
      case 2:
        return '🥈'
      case 3:
        return '🥉'
      default:
        return `#${rank}`
    }
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center w-12 h-12 rounded-lg font-bold text-lg',
        {
          'bg-yellow-500/20 border border-yellow-500/50': rank === 1,
          'bg-gray-500/20 border border-gray-500/50': rank === 2,
          'bg-orange-500/20 border border-orange-500/50': rank === 3,
          'bg-white/5 border border-white/10': rank > 3,
        },
        getTrophyColor(rank),
        className
      )}
      title={`Rank ${rank}${isCurrentUser ? ' (You)' : ''}`}
    >
      {getTrophyEmoji(rank)}
    </div>
  )
}
