import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import { logout as authLogout } from "./services/authService";

export default function Navbar({user, onLogout, theme, setTheme}) {
  const navigate = useNavigate()

  function handleLogout() {
    authLogout()
    onLogout()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <div className="brand">Slooze — Commodities</div>

      <nav className="nav-links">
        {user && (
          <>
            {/* Dashboard visible only to Managers */}
            {user.role === 'Manager' && (
              <NavLink
                to="/dashboard"
                className={({isActive}) => (isActive ? 'active' : '')}
              >
                Dashboard
              </NavLink>
            )}

            <NavLink
              to="/products"
              className={({isActive}) => (isActive ? 'active' : '')}
            >
              Products
            </NavLink>

            {/* Add product only for Manager */}
            {user.role === 'Manager' && (
              <NavLink
                to="/products/new"
                className={({isActive}) => (isActive ? 'active' : '')}
              >
                Add Product
              </NavLink>
            )}
          </>
        )}
      </nav>

      <div className="nav-right">
        <button
          className="btn ghost"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? '🌞 Light' : '🌙 Dark'}
        </button>

        {user ? (
          <>
            <span className="user-pill">
              {user.name} ({user.role})
            </span>
            <button className="btn danger" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login" className="btn">
            Login
          </NavLink>
        )}
      </div>
    </header>
  )
}
