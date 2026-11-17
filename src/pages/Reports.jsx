import { useEffect, useState } from "react";
function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/alerts");

        if (!response.ok) {
          throw new Error("Failed to load reports");
        }

        const data = await response.json();

        const reportData = (data.alerts || []).map((alert) => ({
          id: alert.id,
          title: alert.reason || alert.type || alert.animal || "Wildlife incident",
          type: alert.type || alert.animal || "Wildlife",
          location: alert.location || "Unknown",
          date: alert.created_at
            ? new Date(alert.created_at).toLocaleDateString()
            : "Unknown",
          status: alert.status || "Open",
        }));

        setReports(reportData);
      } catch (err) {
        console.error("Error loading reports:", err);
        setError("Unable to load reports. Check the backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 md:px-8 py-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Reports
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Review wildlife monitoring and security incident reports
            </p>
          </div>

          <button className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-800 transition">
            + Generate Report
          </button>

        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 md:p-8">

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <p className="text-sm text-gray-500">
              Total Reports
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              {reports.length} 
            </h2>

            <p className="text-xs text-gray-500 mt-2">
              All recorded reports
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <p className="text-sm text-gray-500">
              Poaching Reports
            </p>

            <h2 className="text-3xl font-bold text-red-600 mt-2">
              {reports.filter((report) =>
              `${report.title} ${report.type}`.toLowerCase().includes("poach")
              ).length}
            </h2>

            <p className="text-xs text-red-500 mt-2">
              Requires monitoring
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <p className="text-sm text-gray-500">
              Wildlife Reports
            </p>

            <h2 className="text-3xl font-bold text-green-700 mt-2">
              {reports.filter((report) =>
              !["poaching", "security"].includes(report.type.toLowerCase())
              ).length}
            </h2>

            <p className="text-xs text-green-600 mt-2">
              Species detections
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <p className="text-sm text-gray-500">
              Resolved Cases
            </p>

            <h2 className="text-3xl font-bold text-blue-600 mt-2">
              {reports.filter((report) =>
              report.status.toLowerCase() === "resolved"
              ).length}
            </h2>

            <p className="text-xs text-blue-500 mt-2">
              Successfully closed
            </p>
          </div>

        </div>

        {/* Report Information */}
        <div className="bg-green-900 rounded-xl p-6 text-white mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <h2 className="text-xl font-bold">
                Wildlife Conservation Reports
              </h2>

              <p className="text-green-200 text-sm mt-1">
                Monitor incidents, wildlife detections, and security
                events recorded across protected areas.
              </p>
            </div>

            <div className="bg-green-800 px-4 py-2 rounded-lg text-sm">
              Last Updated: Today
            </div>

          </div>

        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

          <div className="p-6 border-b border-gray-200">

            <h2 className="text-lg font-bold text-gray-800">
              Recent Reports
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Latest incidents and wildlife monitoring reports
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="bg-gray-50">

                <tr>

                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Report ID
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Report
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Type
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Location
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Date
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100">

                {reports.map((report) => (

                  <tr
                    key={report.id}
                    className="hover:bg-gray-50 transition"
                  >

                    <td className="px-6 py-4">

                      <span className="font-semibold text-green-700">
                        {report.id}
                      </span>

                    </td>

                    <td className="px-6 py-4">

                      <p className="font-semibold text-gray-800">
                        {report.title}
                      </p>

                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          report.type === 'Poaching'
                            ? 'bg-red-100 text-red-700'
                            : report.type === 'Security'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {report.type}
                      </span>

                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      📍 {report.location}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {report.date}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          report.status === 'Open'
                            ? 'bg-red-100 text-red-700'
                            : report.status === 'Under Investigation'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {report.status}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>
  )
}

export default Reports