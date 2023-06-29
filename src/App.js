import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Register from './components/Register'
import { Book } from './components/Buku'
import { Store } from './components/Store'
import { Update } from './components/Update'
import { Staff } from './components/Staff'
import { Payment } from './components/Payment'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/tugas-basdat">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/dashboard">
          <Navbar />
          <Dashboard />
        </Route>
        <Route path="/book">
          <Navbar />
          <Book />
        </Route>
        <Route path="/store">
          <Navbar />
          <Store />
        </Route>
        <Route path="/Update/:id">
          <Navbar />
          <Update />
        </Route>
        <Route path="/Staff">
          <Navbar />
          <Staff />
        </Route>
        <Route path="/Payment">
          <Navbar />
          <Payment />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
