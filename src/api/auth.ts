import { apiFetch } from './http'

export type User = {
  id: number
  username: string
  topScore: number
}

export async function register(username: string, password: string) {
  return apiFetch('/register', {
    method: 'POST',
    body: { username, password },
  }) as Promise<{ user: User }>
}

export async function login(username: string, password: string) {
  return apiFetch('/login', {
    method: 'POST',
    body: { username, password },
  }) as Promise<{ user: User }>
}

export async function logout() {
  return apiFetch('/logout', {
    method: 'POST',
  })
}

export async function getCurrentUser() {
  return apiFetch('/user', {
    method: 'GET',
  }) as Promise<{ user: User }>
}

export async function saveScore(score: number) {
  return apiFetch('/score', {
    method: 'POST',
    body: { score },
  }) as Promise<{ topScore: number }>
}

export async function fetchLeaderboard(limit = 50, page = 1) {
  return apiFetch(`/leaderboard?limit=${limit}&page=${page}`) as Promise<{ data: Array<{ rank: number; username: string; topScore: number }> }>
}
