import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import WildlifeMonitoring from './pages/WildlifeMonitoring'
import Alerts from './pages/Alerts'
import MapPage from './pages/Map'
import Reports from './pages/Reports'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Wildlife Monitoring */}
        <Route path="/wildlife" element={<WildlifeMonitoring />} />

        {/* Alerts */}
        <Route path="/alerts" element={<Alerts />} />

        {/* Map */}
        <Route path="/map" element={<MapPage />} />

        {/* Reports */}
        <Route path="/reports" element={<Reports />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App