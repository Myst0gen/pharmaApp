import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Medicine } from "../types";
import api from "../api/axios";

const Medicines = () => {
  const[medicines, setMedicines] = useState<Medicine[]>([]);
  const navigate = useNavigate();
  const logout = async()=>{
    localStorage.removeItem("token");
    navigate("/login");
  }

  useEffect(() => {
    api.get<{ data: Medicine[] }>("/Medicine")
      .then((res) => setMedicines(res.data.data));
  }, []);

    return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600">Medicines</h1>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/medicines/add")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              + Add Medicine
            </button>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-blue-50 text-blue-700 uppercase text-xs">
              <tr>
                {["Name", "Brand", "Price", "Quantity", "Expiry",""].map((h) => (
                  <th key={h} className="px-6 py-3 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {medicines.map((m) => (
                <tr key={m.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3">{m.name}</td>
                  <td className="px-6 py-3">{m.brand}</td>
                  <td className="px-6 py-3">₹{m.price}</td>
                  <td className="px-6 py-3">{m.quantity}</td>
                  <td className="px-6 py-3">{new Date(m.expiryDate).toLocaleDateString()}</td>
                  <td className="px-6 py-3">
                        <span className={`inline-block w-3 h-3 rounded-full ${m.colorCode}`}></span>
                    </td>
                </tr>
              ))}
              {medicines.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-400">No medicines found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Medicines