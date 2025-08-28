
// React Router Dom
import { Outlet } from 'react-router-dom'

import './App.css'

// Componentes

import Navbar from './components/Navbar'

function App() {
  return (
    <div className='App'>
      <Navbar />
      <div className="container">
      <Outlet />
      </div>
    </div>
  )
}

export default App
