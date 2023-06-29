import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Navbar = () => {
  const history = useHistory()

  const Logout = async () => {
    localStorage.removeItem('data')
    try {
      await axios.post('https://tbd-be.vercel.app/api/login',
        {
          data: JSON.stringify({
            username: '',
            password: '',
          }),
      })
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <nav
      className="navbar is-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img src="/haikal-logo.png" width="56" height="100" alt="logo" />
          </a>

          <a
            href="/"
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a href="/" className="navbar-item">
              Home
            </a>
          </div>
          {/* <div>
            <ul>
              <li>
                <a href="/tugas-basdat" className="navbar-item">
                  Staff
                </a>
              </li>
              <li>
                <a href="/tugas-basdat" className="navbar-item">
                  Store
                </a>
              </li>
              <li>
                <a href="/tugas-basdat" className="navbar-item">
                  Payment
                </a>
              </li>
              <li>
                <a href="/tugas-basdat" className="navbar-item">
                  Book
                </a>
              </li>
            </ul> 
          </div> */}

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button onClick={Logout} className="button is-light">
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
