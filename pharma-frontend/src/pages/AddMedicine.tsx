import React, { useState } from 'react'
import type { MedicineForm } from '../types';
import { replace, useNavigate } from 'react-router-dom';
import api from '../api/axios';

interface Field {
  key: keyof MedicineForm;
  label: string;
  type: string;
}

const fields: Field[] = [
  { key: "name", label: "Name", type: "text" },
  { key: "brand", label: "Brand", type: "text" },
  { key: "notes", label: "Notes", type: "text" },
  { key: "price", label: "Price", type: "number" },
  { key: "quantity", label: "Quantity", type: "number" },
  { key: "expiryDate", label: "Expiry Date", type: "date" },
];
const AddMedicine = () => {
    const[error, setError] = useState<string | null>(null);
    const[form, setForm] = useState<MedicineForm>
    ({ name: "", brand: "", price: "", quantity: "", expiryDate: "" ,notes: ""});
    const navigate = useNavigate();
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            await api.post("/Medicine", form);
            navigate("/medicines");
        } catch (error) {
            console.log(error);
            setError("Failed to add medicine");
        }
    }
    
    
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Add Medicine</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(({ key, label, type }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                type={type}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                required
              />
            </div>
          ))}
          <div className="flex gap-3">
            <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Save
            </button>
            <button type="button" onClick={() => navigate("/medicines")} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMedicine