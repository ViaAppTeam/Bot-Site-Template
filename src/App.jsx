import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Main/HomePage'
import Commands from './pages/Main/Commands'
import Policy from './pages/Main/Policy'
import Login from './pages/Main/Login'
import Servers from './pages/Dashboard/Servers'
import Home from './pages/Dashboard/Systems/Home'
import WelcomeSystem from './pages/Dashboard/Systems/WelcomeSystem'
import TicketSystem from './pages/Dashboard/Systems/TicketSystem'
import GuardSystem from './pages/Dashboard/Systems/GuardSystem'
import AutoroleSystem from './pages/Dashboard/Systems/AutoroleSystem'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/commands" element={<Commands />} />
      <Route path="/privacy-policy" element={<Policy />} />
      <Route path="/callback" element={<Login />} />

      <Route path="/dashboard" element={<Servers />} />
      <Route path="/dashboard/:id" element={<Home />} />
      <Route path="/dashboard/:id/welcome" element={<WelcomeSystem />} />
      <Route path="/dashboard/:id/autorole" element={<AutoroleSystem />} />
      <Route path="/dashboard/:id/ticket" element={<TicketSystem />} />
      <Route path="/dashboard/:id/guard" element={<GuardSystem />} />
    </Routes>
  )
}

export default App
