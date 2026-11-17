import { useEffect, useState } from 'react'
function WildlifeMonitoring() {
  const [animals, setAnimals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
  const fetchDetections = async () => {
    try {
      const response = await fetch(
        'http://127.0.0.1:5000/api/detections'
      )

      if (!response.ok) {
        throw new Error('Failed to load wildlife detections')
      }

      const data = await response.json()
      setAnimals(
  (data.detections || []).map((detection) => ({
    id: detection.id,
    species: detection.detected_object,
    status: detection.status,
    location: detection.location,
    confidence: `${Math.round(detection.confidence * 100)}%`,
    source: detection.image_path
      ? detection.image_path.split('/').pop()
      : 'Unknown',
    time: detection.timestamp
      ? new Date(detection.timestamp).toLocaleString()
      : 'Unknown',
  }))
)
    } catch (err) {
      console.error('Error fetching detections:', err)
      setError('Unable to load detections. Please check the backend.')
    } finally {
      setLoading(false)
    }
  }

  fetchDetections()
}, [])

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 md:px-8 py-5">
        <h1 className="text-2xl font-bold text-gray-800">
          Wildlife Monitoring
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          AI-based wildlife detection and monitoring
        </p>
      </header>

      {/* Content */}
      <main className="p-6 md:p-8">

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <p className="text-sm text-gray-500">
              Total Detections
            </p>

            <h2 className="text-3xl font-bold text-green-800 mt-2">
              24
            </h2>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <p className="text-sm text-gray-500">
              Species Identified
            </p>

            <h2 className="text-3xl font-bold text-blue-700 mt-2">
              8
            </h2>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <p className="text-sm text-gray-500">
              Active Cameras
            </p>

            <h2 className="text-3xl font-bold text-green-700 mt-2">
              18
            </h2>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <p className="text-sm text-gray-500">
              Monitoring Status
            </p>

            <h2 className="text-lg font-bold text-green-600 mt-3">
              ● Active
            </h2>
          </div>

        </div>

        {/* AI Detection Information */}
        <div className="bg-green-900 rounded-xl p-6 text-white mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <h2 className="text-xl font-bold">
                AI Detection System
              </h2>

              <p className="text-green-200 text-sm mt-1">
                Computer vision system is monitoring connected camera feeds
                for wildlife activity.
              </p>
            </div>

            <div className="bg-green-800 px-4 py-2 rounded-lg text-sm">
              ● AI System Active
            </div>

          </div>

        </div>

        {/* Detection Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

          <div className="p-6 border-b border-gray-200">

            <h2 className="text-lg font-bold text-gray-800">
              Recent Wildlife Detections
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Latest animals identified by the monitoring system
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="bg-gray-50">

                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Animal
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Status
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Location
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Confidence
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Source
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Detected
                  </th>
                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100">

                {animals.map((animal, index) => (

                  <tr key={index} className="hover:bg-gray-50 transition">

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-xl">
                          🐾
                        </div>

                        <span className="font-semibold text-gray-800">
                          {animal.species}
                        </span>

                      </div>

                    </td>

                    <td className="px-6 py-4">

                      <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        {animal.status}
                      </span>

                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      📍 {animal.location}
                    </td>

                    <td className="px-6 py-4">

                      <span className="font-semibold text-green-700">
                        {animal.confidence}
                      </span>

                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {animal.source}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {animal.time}
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

export default WildlifeMonitoring