const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api'

async function parseResponse(response: Response) {
  const json = await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error(json?.message || response.statusText)
  }
  return json
}

export async function apiFetch(path: string, options: Omit<RequestInit, 'body'> & { body?: unknown } = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers ?? {}),
  }

  const body = options.body !== undefined && typeof options.body !== 'string' ? JSON.stringify(options.body) : options.body

  const response = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    ...options,
    headers,
    body: body as BodyInit,
  })

  return parseResponse(response)
}
