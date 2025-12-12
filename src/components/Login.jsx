import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { login } from "./services/authService";

export default function Login({onLogin}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setErr('')
    setLoading(true)
    try {
      const user = await login({email, password})
      onLogin(user)
      navigate('/products')
    } catch (e) {
      setErr(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card center-card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Email</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          placeholder="use manager@slooze.com or storekeeper@slooze.com"
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {err && <div className="error">{err}</div>}
        <button disabled={loading} className="btn primary">
          {loading ? 'Logging...' : 'Login'}
        </button>
      </form>

      <div className="hint">
        <strong>Test users:</strong>
        <div>manager@slooze.com / manager123 → Manager</div>
        <div>storekeeper@slooze.com / keeper123 → StoreKeeper</div>
      </div>
    </div>
  )
}
