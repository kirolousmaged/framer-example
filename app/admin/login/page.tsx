'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    setLoading(false)

    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      setError('Incorrect password. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-off-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <p className="font-italiana text-3xl text-off-black">Olivia Sinclair</p>
          <p className="font-montserrat text-sm text-off-black/50 mt-2 uppercase tracking-widest">
            Admin Panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="font-montserrat text-xs text-off-black uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="px-4 py-3 border border-gray-200 font-raleway text-sm text-off-black focus:outline-none focus:border-accent transition-colors"
              placeholder="Enter admin password"
            />
          </div>

          {error && (
            <p className="font-raleway text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3.5 bg-accent text-white font-raleway font-bold text-sm hover:bg-accent-hover transition-colors duration-200 disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
