
import { useEffect, useState } from "react";

function Alerts() {
 
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
      const fetchAlerts = async () => {
        try {
          const response = await fetch(
            "http://127.0.0.1:5000/api/alerts"
          );

          if (!response.ok) {
            throw new Error("Failed to load alerts");
          }

          const data = await response.json();
          setAlerts(data.alerts || []);
        } catch (err) {
          console.error("Error fetching alerts:", err);
          setError("Unable to load alerts. Please check the backend.");
        } finally {
          setLoading(false);
        }
      };

      fetchAlerts();
        }, []);

      

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 md:px-8 py-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Security Alerts
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Review and manage wildlife protection alerts
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>

            <span className="text-sm font-medium text-green-700">
              Alert System Active
            </span>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 md:p-8">

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          {/* Active */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Active Alerts
                </p>

                <h2 className="text-3xl font-bold text-red-600 mt-2">
                  3
                </h2>
              </div>

              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-2xl">
                🚨
              </div>

            </div>

          </div>

          {/* High Priority */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  High Priority
                </p>

                <h2 className="text-3xl font-bold text-orange-600 mt-2">
                  2
                </h2>
              </div>

              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
                ⚠️
              </div>

            </div>

          </div>

          {/* Investigation */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Under Investigation
                </p>

                <h2 className="text-3xl font-bold text-yellow-600 mt-2">
                  2
                </h2>
              </div>

              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-2xl">
                🔎
              </div>

            </div>

          </div>

          {/* Resolved */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Resolved
                </p>

                <h2 className="text-3xl font-bold text-green-600 mt-2">
                  12
                </h2>
              </div>

              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">
                ✓
              </div>

            </div>

          </div>

        </div>

        {/* Alert Notice */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-8">

          <div className="flex gap-4">

            <div className="text-2xl">
              🚨
            </div>

            <div>
              <h2 className="font-bold text-red-800">
                Immediate Attention Required
              </h2>

              <p className="text-sm text-red-700 mt-1">
                High-priority alerts have been detected by the AI
                monitoring system. Forest officers should review these
                alerts and take appropriate action.
              </p>
            </div>

          </div>

        </div>

        {/* Alerts List */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

          <div className="p-6 border-b border-gray-200">

            <h2 className="text-lg font-bold text-gray-800">
              Recent Alerts
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Alerts generated from monitored forest areas
            </p>

          </div>

          <div className="divide-y divide-gray-100">

            {alerts.map((alert, index) => (

              <div
                key={index}
                className="p-6 hover:bg-gray-50 transition"
              >

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                  {/* Alert Information */}
                  <div className="flex gap-4">

                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                        alert.severity === 'High'
                          ? 'bg-red-100'
                          : alert.severity === 'Medium'
                          ? 'bg-yellow-100'
                          : 'bg-green-100'
                      }`}
                    >
                      {alert.severity === 'High'
                        ? '🚨'
                        : alert.severity === 'Medium'
                        ? '⚠️'
                        : '✓'}
                    </div>

                    <div>

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="font-bold text-gray-800">
                          {alert.type}
                        </h3>

                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            alert.severity === 'High'
                              ? 'bg-red-100 text-red-700'
                              : alert.severity === 'Medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {alert.severity} Priority
                        </span>

                      </div>

                      <p className="text-sm text-gray-500 mt-2">
                        {alert.reason}
                      </p>

                      <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">

                        <span>
                          📍 {alert.location}
                        </span>

                        <span>
                          📹 {alert.camera}
                        </span>

                        <span>
                          🕐 {alert.time}
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-3">

                    <span
                      className={`text-xs font-semibold px-3 py-2 rounded-full ${
                        alert.status === 'Active'
                          ? 'bg-red-100 text-red-700'
                          : alert.status === 'Under Investigation'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {alert.status}
                    </span>

                    <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                      View Details
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </main>

    </div>
  )
}

export default Alerts