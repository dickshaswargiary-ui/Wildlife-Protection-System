import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function Dashboard() {
    const navigate = useNavigate()
    const [dashboardData, setDashboardData] = useState({
  animals_detected: 0,
  active_alerts: 0,
  reported_incidents: 0,
  protected_areas: 0
  })

const [loading, setLoading] = useState(true)
const [error, setError] = useState('')
const [recentAlerts, setRecentAlerts] = useState([])

useEffect(() => {
  const fetchDashboard = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch('http://127.0.0.1:5000/api/dashboard')
      
      if (!response.ok) {
        throw new Error('Failed to load dashboard data')
      }

      const data = await response.json()
      const alertsResponse = await fetch('http://127.0.0.1:5000/api/alerts')

if (alertsResponse.ok) {
  const alertsData = await alertsResponse.json()
  setRecentAlerts(alertsData.alerts || [])
}

      
setDashboardData({
  animals_detected: data.dashboard?.animals_detected ?? 0,
  active_alerts: data.dashboard?.active_alerts ?? 0,
  reported_incidents: data.dashboard?.reported_incidents ?? 0,
  protected_areas: data.dashboard?.protected_areas ?? 0
})

    } catch (err) {
      setError('Could not load dashboard data from the backend.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  fetchDashboard()
}, [])

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-green-950 text-white min-h-screen hidden md:flex flex-col">

        {/* Logo */}
        <div className="p-6 border-b border-green-800">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🌿</span>

            <div>
              <h1 className="font-bold text-lg">
                Wildlife Protection
              </h1>

              <p className="text-green-300 text-xs">
                Anti-Poaching System
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">

          <p className="text-green-400 text-xs uppercase font-semibold px-3 mb-3">
            Main Menu
          </p>

          <div className="space-y-2">

            <button
  onClick={() => navigate('/wildlife')}
  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-900 text-left transition"
>
  <span>🐘</span>
  <span>Wildlife Monitoring</span>
</button>

            

            <button
  onClick={() => navigate('/alerts')}
  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-900 text-left transition"
>
  <span>🚨</span>
  <span>Alerts</span>
</button>

            <button
  onClick={() => navigate('/map')}
  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-900 text-left transition"
>
  <span>🗺️</span>
  <span>Map</span>
</button>

            <button
  onClick={() => navigate('/reports')}
  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-900 text-left transition"
>
  <span>📋</span>
  <span>Reports</span>
</button>

          </div>

          <p className="text-green-400 text-xs uppercase font-semibold px-3 mt-8 mb-3">
            System
          </p>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-900 text-left transition">
            <span>⚙️</span>
            <span>Settings</span>
          </button>

        </nav>

        {/* User */}
        <div className="p-4 border-t border-green-800">

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center">
              👤
            </div>

            <div>
              <p className="text-sm font-semibold">
                Forest Officer
              </p>

              <p className="text-xs text-green-300">
                Administrator
              </p>
            </div>
          </div>

          <button className="w-full py-2 rounded-lg border border-green-700 hover:bg-green-900 transition text-sm">
            Logout
          </button>

        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">

        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 md:px-8 py-5">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Dashboard
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Wildlife monitoring and conservation overview
              </p>
            </div>

            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-700">
                Forest Monitoring System
              </p>

              <p className="text-xs text-gray-400">
                System Status: <span className="text-green-600 font-semibold">Active</span>
              </p>
            </div>

          </div>

        </header>

        {/* Dashboard Content */}
        <div className="p-6 md:p-8">

          {/* Welcome */}
          <div className="bg-green-900 rounded-2xl p-6 md:p-8 text-white mb-8">

            <p className="text-green-300 text-sm mb-2">
              Welcome back, Forest Officer
            </p>

            <h1 className="text-2xl md:text-3xl font-bold">
              Wildlife Protection Overview
            </h1>

            <p className="text-green-200 mt-2 max-w-2xl">
              Monitor wildlife activity, review alerts, and track
              potential threats across protected forest areas.
            </p>

          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

            {/* Animals */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    Animals Detected
                  </p>

                  <h3 className="text-3xl font-bold text-gray-800 mt-2">
                     {dashboardData.animals_detected}
                  </h3>

                  <p className="text-xs text-green-600 mt-2">
                    ↑ 12% this week
                  </p>
                </div>

                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">
                  🐘
                </div>

              </div>

            </div>

            {/* Alerts */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    Active Alerts
                  </p>

                  <h3 className="text-3xl font-bold text-gray-800 mt-2">
                    3
                  </h3>

                  <p className="text-xs text-red-600 mt-2">
                    Requires attention
                  </p>
                </div>

                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-2xl">
                  🚨
                </div>

              </div>

            </div>

            {/* Incidents */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    Reported Incidents
                  </p>

                  <h3 className="text-3xl font-bold text-gray-800 mt-2">
                    {dashboardData.reported_incidents}
                  </h3>

                  <p className="text-xs text-orange-600 mt-2">
                    2 under investigation
                  </p>
                </div>

                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
                  ⚠️
                </div>

              </div>

            </div>

            {/* Protected Areas */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    Protected Areas
                  </p>

                  <h3 className="text-3xl font-bold text-gray-800 mt-2">
                    {dashboardData.protected_areas}
                  </h3>

                  <p className="text-xs text-blue-600 mt-2">
                    All systems operational
                  </p>
                </div>

                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
                  🌲
                </div>

              </div>

            </div>

          </div>

          {/* Lower Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Recent Alerts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">

              <div className="p-6 border-b border-gray-100 flex justify-between items-center">

                <div>
                  <h2 className="font-bold text-gray-800">
                    Recent Alerts
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Latest detected activities
                  </p>
                </div>

                <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">
                  3 Active
                </span>

              </div>

              <div className="p-6 space-y-4">

               {recentAlerts.length === 0 ? (
  <p className="p-4 text-sm text-gray-500">
    No alerts found.
  </p>
) : (
  recentAlerts.slice(0, 3).map((alert) => (
    <div
      key={alert.id}
      className="flex gap-4 p-4 bg-red-50 rounded-lg"
    >
      <span className="text-xl">🚨</span>
      <div>
        <p className="font-semibold text-gray-800">
          {alert.type || alert.animal || "Wildlife alert"}
        </p>
        <p className="text-sm text-gray-500">
          {alert.location} • {alert.status}
        </p>
      </div>
    </div>
  ))
)}

           {/* Monitoring Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">

              <div className="p-6 border-b border-gray-100">

                <h2 className="font-bold text-gray-800">
                  Monitoring Status
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Current surveillance system status
                </p>

              </div>

              <div className="p-6 space-y-5">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>

                    <div>
                      <p className="font-medium text-gray-800">
                        Forest Cameras
                      </p>

                      <p className="text-xs text-gray-500">
                        18 cameras connected
                      </p>
                    </div>
                  </div>

                  <span className="text-xs text-green-700 font-semibold">
                    Online
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>

                    <div>
                      <p className="font-medium text-gray-800">
                        AI Detection
                      </p>

                      <p className="text-xs text-gray-500">
                        Detection service running
                      </p>
                    </div>
                  </div>

                  <span className="text-xs text-green-700 font-semibold">
                    Active
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>

                    <div>
                      <p className="font-medium text-gray-800">
                        Alert System
                      </p>

                      <p className="text-xs text-gray-500">
                        Real-time notifications
                      </p>
                    </div>
                  </div>

                  <span className="text-xs text-green-700 font-semibold">
                    Active
                  </span>

                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">

                  <p className="text-sm font-semibold text-green-800">
                    ✓ All monitoring services are operational
                  </p>

                  <p className="text-xs text-green-700 mt-1">
                    Last system check: Just now
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
        </div>
      </div>
      </main>
    </div>
  );
}
export default Dashboard;