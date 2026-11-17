import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  
const handleSubmit = async (event) => {
  event.preventDefault()
  setError('')
  setLoading(true)

  try {
    const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      setError(data.message || 'Login failed')
      return
    }

    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('user', JSON.stringify(data.user))
    navigate('/dashboard')
  } catch (err) {
    setError('Cannot connect to the backend. Check that Flask is running.')
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="min-h-screen bg-green-950 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        {/* Project Title */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🌿</div>

          <h1 className="text-2xl font-bold text-green-900">
            Wildlife Protection
          </h1>

          <p className="text-gray-500 mt-2">
            AI-Powered Anti-Poaching System
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
                        <p className="text-sm text-red-600" role="alert">
                        {error}
                        </p>
                      )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition disabled:opacity-50"
          >
          {loading ? 'Logging in...' : 'Login'}
          s</button>

        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Wildlife Conservation & Protection
        </p>

      </div>

    </div>
  )
}

export default Login