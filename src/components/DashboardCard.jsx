function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-green-950 text-white px-8 py-5">
        <h1 className="text-2xl font-bold">
          Wildlife Protection Dashboard
        </h1>

        <p className="text-green-200 text-sm mt-1">
          AI-Powered Anti-Poaching System
        </p>
      </header>

      {/* Dashboard Content */}
      <main className="p-8">

        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Overview
        </h2>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Animals */}
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500 text-sm">
              Animals Detected
            </p>

            <h3 className="text-3xl font-bold text-green-800 mt-2">
              24
            </h3>
          </div>

          {/* Alerts */}
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500 text-sm">
              Active Alerts
            </p>

            <h3 className="text-3xl font-bold text-red-600 mt-2">
              3
            </h3>
          </div>

          {/* Incidents */}
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500 text-sm">
              Incidents Reported
            </p>

            <h3 className="text-3xl font-bold text-orange-600 mt-2">
              7
            </h3>
          </div>

          {/* Protected Areas */}
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500 text-sm">
              Protected Areas
            </p>

            <h3 className="text-3xl font-bold text-blue-600 mt-2">
              12
            </h3>
          </div>

        </div>

        {/* Recent Alerts */}
        <div className="mt-10 bg-white rounded-xl shadow p-6">

          <h2 className="text-lg font-semibold text-gray-800 mb-5">
            Recent Alerts
          </h2>

          <div className="space-y-4">

            <div className="border-l-4 border-red-500 bg-red-50 p-4">
              <p className="font-medium text-gray-800">
                Suspicious human activity detected
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Zone A • 10 minutes ago
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4">
              <p className="font-medium text-gray-800">
                Tiger detected near monitoring area
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Zone B • 25 minutes ago
              </p>
            </div>

            <div className="border-l-4 border-orange-500 bg-orange-50 p-4">
              <p className="font-medium text-gray-800">
                Possible poaching activity detected
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Zone C • 1 hour ago
              </p>
            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default Dashboard