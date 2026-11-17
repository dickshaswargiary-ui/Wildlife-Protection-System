import { useEffect, useState } from "react";
function MapPage() {
  const [detections, setDetections] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [protectedAreas, setProtectedAreas] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const zones = [
    {
      name: 'Zone A',
      risk: 'High',
      reason: 'Suspicious human activity',
      detections: 6,
    },
    {
      name: 'Zone B',
      risk: 'Medium',
      reason: 'Frequent wildlife movement',
      detections: 8,
    },
    {
      name: 'Zone C',
      risk: 'High',
      reason: 'Possible poaching incident',
      detections: 4,
    },
    {
      name: 'Zone D',
      risk: 'Low',
      reason: 'Normal monitoring activity',
      detections: 6,
    },
  ]


  useEffect(() => {
    const fetchMapData = async () => {
      try {
        setLoading(true);
        setError("");

        const [detectionsResponse, alertsResponse, dashboardResponse] =
          await Promise.all([
            fetch("http://127.0.0.1:5000/api/detections"),
            fetch("http://127.0.0.1:5000/api/alerts"),
            fetch("http://127.0.0.1:5000/api/dashboard"),
          ]);;

        if (
              !detectionsResponse.ok ||
              !alertsResponse.ok ||
              !dashboardResponse.ok
            ) {
              throw new Error("Failed to load map data");
            }

        const detectionsData = await detectionsResponse.json();
        const alertsData = await alertsResponse.json();
        const dashboardData = await dashboardResponse.json();

        setDetections(detectionsData.detections || []);
        setAlerts(alertsData.alerts || []);
        setProtectedAreas(dashboardData.dashboard?.protected_areas ?? 0);
      } catch (err) {
        console.error("Map data error:", err);
        setError("Unable to load map data. Check that Flask is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchMapData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 md:px-8 py-5">
        <h1 className="text-2xl font-bold text-gray-800">
          Monitoring Map
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Wildlife activity and high-risk zone monitoring
        </p>
      </header>

      <main className="p-6 md:p-8">

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <p className="text-sm text-gray-500">
              High-Risk Zones
            </p>

            <h2 className="text-3xl font-bold text-red-600 mt-2">
            {zones.filter((zone) => zone.risk === "High").length}
           </h2>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <p className="text-sm text-gray-500">
              Wildlife Detections
            </p>

            <h2 className="text-3xl font-bold text-green-700 mt-2">
              {loading ? "..." : detections.length}
            </h2>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <p className="text-sm text-gray-500">
              Protected Areas
            </p>

            <h2 className="text-3xl font-bold text-blue-700 mt-2">
              {loading ? "..." : protectedAreas}
            </h2>
          </div>

        </div>

        {/* Map Placeholder */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">

          <div className="flex items-center justify-between mb-5">

            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Forest Monitoring Map
              </h2>

              <p className="text-sm text-gray-500">
                Wildlife detections and risk zones
              </p>
            </div>

            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
              Live Monitoring
            </span>

          </div>

          <div className="relative h-96 bg-green-100 rounded-xl border-2 border-dashed border-green-300 overflow-hidden">

            {/* Forest background */}
            <div className="absolute inset-0 flex items-center justify-center text-green-700">

              <div className="text-center">

                <div className="text-6xl mb-3">
                  🌲
                </div>

                <p className="font-semibold">
                  Forest Monitoring Area
                </p>

                <p className="text-sm">
                  Google Maps API will be integrated here
                </p>

              </div>

            </div>

            {/* Zone markers */}
            <div className="absolute top-16 left-20 w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
              A
            </div>

            <div className="absolute top-28 right-28 w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
              B
            </div>

            <div className="absolute bottom-24 left-1/3 w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
              C
            </div>

            <div className="absolute bottom-16 right-20 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
              D
            </div>

          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-6 mt-5 text-sm">

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              High Risk
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              Medium Risk
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              Low Risk
            </div>

          </div>

        </div>

        {/* Zone Details */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

          <div className="p-6 border-b border-gray-200">

            <h2 className="text-lg font-bold text-gray-800">
              Zone Risk Overview
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Current risk assessment for monitored forest zones
            </p>

          </div>

          <div className="divide-y divide-gray-100">

                      
          {loading ? (
            <p className="p-4 text-sm text-gray-500">
              Loading alerts...
            </p>
          ) : error ? (
            <p className="p-4 text-sm text-red-600">{error}</p>
          ) : alerts.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">
              No alerts found.
            </p>
          ) : (
            alerts.slice(0, 10).map((alert) => {
              const risk = String(alert.severity || "Medium").toLowerCase();
              const riskLabel = risk.charAt(0).toUpperCase() + risk.slice(1);
              const riskClass =
                risk === "high" || risk === "critical"
                  ? "bg-red-100 text-red-700"
                  : risk === "low"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700";

              return (
                <div
                  key={alert.id}
                  className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-gray-50 transition"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-gray-800">
                        {alert.type || alert.animal || "Wildlife alert"}
                      </h3>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${riskClass}`}>
                        {riskLabel} Risk
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      {alert.location || "Location unavailable"}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {alert.reason || alert.description || "No additional details"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Status: {alert.status || "Unknown"}
                    </p>
                  </div>
                </div>
              );
            })
          )}


          </div>

        </div>

      </main>

    </div>
  )
}

export default MapPage