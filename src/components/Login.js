import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { notification } from 'antd'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const history = useHistory()

  const openNotification = () => {
  notification.open({
    message: 'Error',
    description: 'Wrong Username or Password',
  });

};

  const Auth = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/login', {
        data: JSON.stringify({
          username: email,
          password: password,
        }),
      }).then((res) => {
        if (res.data === "User not found") {
          openNotification()
        } else {
          localStorage.setItem(
            'data',
            JSON.stringify({
              username: email,
              password: password,
            })
          )
        history.push('/dashboard')

        }
      })
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }

  const Register = () => {
    history.push('/register')
  }

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <form onSubmit={Auth} className="box">
                <p className="has-text-centered">{msg}</p>
                <div className="field mt-5">
                  <label className="label">Email or Username</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Username"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Password</label>
                  <div className="controls">
                    <input
                      type="password"
                      className="input"
                      placeholder="******"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button className="button is-success is-fullwidth">
                    Login
                  </button>
                </div>
                <p onClick={Register}>Register</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
