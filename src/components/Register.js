import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState(true)
  const [msg, setMsg] = useState('')
  const history = useHistory()

  const Register = async (e) => {
    e.preventDefault()
    try {
      await axios.post('https://tbd-be.vercel.app/api/register', {
        data: JSON.stringify({
          username: name,
          password: password,
        }),
      })
      history.push('/tugas-basdat')
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <form onSubmit={Register} className="box">
                <p className="has-text-centered">{msg}</p>
                <div className="field mt-5">
                  <label className="label">Name</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                  <label className="label">Confirm Password</label>
                  <div className="controls">
                    <input
                      type="password"
                      className="input"
                      placeholder="******"
                      onChange={(e) =>
                        e.target.value === password
                          ? setConfPassword(false)
                          : setConfPassword(true)
                      }
                    />
                  </div>
                </div>
                {confPassword ? (
                  <p className="has-text-danger">Password not match</p>
                ) : (
                  ''
                )}
                <div className="field mt-5">
                  <button className="button is-success is-fullwidth">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
