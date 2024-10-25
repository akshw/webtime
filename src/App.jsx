import { useState, useEffect } from "react";

function App() {
  const [timeData, setTimeData] = useState({});

  useEffect(() => {
    chrome.storage.local.get("timeData", (result) => {
      setTimeData(result.timeData || {});
    });
  }, []);

  return (
    <div className="p-4 m-6 mb-12 bg-gray-100 rounded-lg">
      <h1 className="text-xl font-bold mb-4 text-center">Screen Time</h1>
      <div className="bg-white shadow-md rounded p-2 m-4">
        {Object.keys(timeData).length === 0 ? (
          <p className="text-center text-gray-500">No data available.</p>
        ) : (
          <ul className="space-y-2">
            {Object.keys(timeData).map((domain) => (
              <li key={domain} className="flex justify-between">
                <span className="font-medium">{domain}</span>
                <span>{(timeData[domain] / 1000).toFixed(2)}minutes</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
