// src/pages/Home.jsx
import { useState } from "react";
import IncidentForm from "../components/IncidentForm";
import IncidentList from "../components/IncidentList";

export default function Home() {
  const [refresh, setRefresh] = useState(0);

  const handleIncidentCreated = () => {
    setRefresh((r) => r + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
        Gender Equality App
      </h1>

      <div className="flex flex-col md:flex-row gap-8 justify-center">
        {/* LEFT: FORM */}
        <div className="md:w-1/3 bg-white shadow-md rounded-lg p-6">
          <IncidentForm onIncidentCreated={handleIncidentCreated} />
        </div>

        {/* RIGHT: LIST */}
        <div className="md:w-2/3">
          <IncidentList refresh={refresh} />
        </div>
      </div>
    </div>
  );
}
