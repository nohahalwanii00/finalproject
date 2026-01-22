import React, { useEffect, useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';
import { useAuth } from '../context/AuthContext';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ 
    patient_name: '', 
    doctor_name: '', 
    date: '', 
    time: '', 
    status: 'Pending' 
  });
  const [editingId, setEditingId] = useState(null);
  const { logout, user } = useAuth();

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const res = await api.get('/patients');
      setPatients(res.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch patients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/patients/${editingId}`, formData);
        toast.success('Patient updated');
      } else {
        await api.post('/patients', formData);
        toast.success('Patient added');
      }
      setFormData({ patient_name: '', doctor_name: '', date: '', time: '', status: 'Pending' });
      setEditingId(null);
      fetchPatients();
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const handleEdit = (patient) => {
    setFormData({
      patient_name: patient.patient_name,
      doctor_name: patient.doctor_name,
      date: patient.date,
      time: patient.time,
      status: patient.status
    });
    setEditingId(patient.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await api.delete(`/patients/${id}`);
      toast.success('Patient deleted');
      fetchPatients();
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow p-4 mb-8 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Teeth Clinic Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Welcome, {user?.username}</span>
          <button onClick={logout} className="text-red-500 hover:text-red-700">Logout</button>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        <div className="bg-white p-6 rounded shadow mb-8">
          <h2 className="text-lg font-semibold mb-4">{editingId ? 'Edit Patient' : 'Add New Patient'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <input
              placeholder="Patient Name"
              value={formData.patient_name}
              onChange={e => setFormData({ ...formData, patient_name: e.target.value })}
              className="p-2 border rounded"
              required
            />
            <input
              placeholder="Doctor Name"
              value={formData.doctor_name}
              onChange={e => setFormData({ ...formData, doctor_name: e.target.value })}
              className="p-2 border rounded"
              required
            />
            <input
              type="date"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              className="p-2 border rounded"
              required
            />
            <input
              type="time"
              value={formData.time}
              onChange={e => setFormData({ ...formData, time: e.target.value })}
              className="p-2 border rounded"
              required
            />
             <select
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value })}
              className="p-2 border rounded"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
              {editingId ? 'Update' : 'Add'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => { setEditingId(null); setFormData({ patient_name: '', doctor_name: '', date: '', time: '', status: 'Pending' }); }}
                className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        <div className="bg-white rounded shadow overflow-x-auto">
          {loading ? (
            <div className="p-8"><Spinner /></div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="p-4">ID</th>
                  <th className="p-4">Patient Name</th>
                  <th className="p-4">Doctor Name</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Time</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map(patient => (
                  <tr key={patient.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{patient.id}</td>
                    <td className="p-4">{patient.patient_name}</td>
                    <td className="p-4">{patient.doctor_name}</td>
                    <td className="p-4">{patient.date}</td>
                    <td className="p-4">{patient.time}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-sm ${
                        patient.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        patient.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="p-4 flex gap-2">
                      <button onClick={() => handleEdit(patient)} className="text-blue-600 hover:text-blue-800">Edit</button>
                      <button onClick={() => handleDelete(patient.id)} className="text-red-600 hover:text-red-800">Delete</button>
                    </td>
                  </tr>
                ))}
                {patients.length === 0 && (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-gray-500">No patients found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Patients;