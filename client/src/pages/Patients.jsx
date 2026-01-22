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
  const [showForm, setShowForm] = useState(false);

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
        toast.success('Patient updated successfully');
      } else {
        await api.post('/patients', formData);
        toast.success('Patient added successfully');
      }
      setFormData({ patient_name: '', doctor_name: '', date: '', time: '', status: 'Pending' });
      setEditingId(null);
      setShowForm(false);
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
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this patient?')) return;
    try {
      await api.delete(`/patients/${id}`);
      toast.success('Patient deleted successfully');
      fetchPatients();
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🦷</span>
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent">
                Teeth Clinic
              </span>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-semibold text-slate-700">{user?.username}</span>
                <span className="text-xs text-slate-500">Administrator</span>
              </div>
              <button 
                onClick={logout} 
                className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Patient Management</h1>
            <p className="text-slate-500 mt-1">Manage appointments and patient records.</p>
          </div>
          <button 
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({ patient_name: '', doctor_name: '', date: '', time: '', status: 'Pending' });
            }}
            className={`px-6 py-2.5 rounded-lg text-white font-medium shadow-md transition transform hover:-translate-y-0.5 ${showForm ? 'bg-slate-500 hover:bg-slate-600' : 'bg-teal-600 hover:bg-teal-700'}`}
          >
            {showForm ? 'Cancel' : '+ Add New Patient'}
          </button>
        </div>

        {/* Form Section */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 mb-8 animate-fade-in-down">
            <h2 className="text-lg font-semibold text-slate-800 mb-6 pb-2 border-b border-slate-100">
              {editingId ? 'Edit Patient Details' : 'New Patient Registration'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Patient Name</label>
                <input
                  placeholder="e.g. John Doe"
                  value={formData.patient_name}
                  onChange={e => setFormData({ ...formData, patient_name: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Assigned Doctor</label>
                <input
                  placeholder="e.g. Dr. Smith"
                  value={formData.doctor_name}
                  onChange={e => setFormData({ ...formData, doctor_name: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Appointment Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Appointment Time</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={e => setFormData({ ...formData, time: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Status</label>
                <select
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex items-end">
                <button type="submit" className="w-full bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 font-medium shadow-md transition transform hover:-translate-y-0.5">
                  {editingId ? 'Save Changes' : 'Register Patient'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
          {loading ? (
            <div className="p-12 flex justify-center"><Spinner /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm uppercase tracking-wider">
                    <th className="p-5 font-semibold">ID</th>
                    <th className="p-5 font-semibold">Patient Name</th>
                    <th className="p-5 font-semibold">Doctor</th>
                    <th className="p-5 font-semibold">Date</th>
                    <th className="p-5 font-semibold">Time</th>
                    <th className="p-5 font-semibold">Status</th>
                    <th className="p-5 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {patients.map(patient => (
                    <tr key={patient.id} className="hover:bg-slate-50 transition duration-150">
                      <td className="p-5 text-slate-500 font-mono text-sm">#{patient.id}</td>
                      <td className="p-5 font-medium text-slate-800">{patient.patient_name}</td>
                      <td className="p-5 text-slate-600">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xs font-bold">
                            Dr
                          </div>
                          {patient.doctor_name}
                        </div>
                      </td>
                      <td className="p-5 text-slate-600">{patient.date}</td>
                      <td className="p-5 text-slate-600">{patient.time}</td>
                      <td className="p-5">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          patient.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          patient.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                             patient.status === 'Completed' ? 'bg-green-500' :
                             patient.status === 'Cancelled' ? 'bg-red-500' :
                             'bg-yellow-500'
                          }`}></span>
                          {patient.status}
                        </span>
                      </td>
                      <td className="p-5 text-right space-x-2">
                        <button 
                          onClick={() => handleEdit(patient)} 
                          className="text-slate-400 hover:text-teal-600 transition p-1"
                          title="Edit"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleDelete(patient.id)} 
                          className="text-slate-400 hover:text-red-600 transition p-1"
                          title="Delete"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {patients.length === 0 && (
                    <tr>
                      <td colSpan="7" className="p-12 text-center">
                        <div className="flex flex-col items-center justify-center text-slate-400">
                          <svg className="w-12 h-12 mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                          </svg>
                          <p className="text-lg font-medium">No patients found</p>
                          <p className="text-sm mt-1">Get started by adding a new patient above.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-slate-500 text-sm">
            © {new Date().getFullYear()} Teeth Clinic Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Patients;
