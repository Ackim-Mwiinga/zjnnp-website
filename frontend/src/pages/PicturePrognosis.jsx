import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/useAuth';

const PicturePrognosis = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    files: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setForm({ ...form, files: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      if (form.files) formData.append('files', form.files);

      await axios.post('/api/cases', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSuccess('Case submitted successfully!');
      setForm({ title: '', description: '', files: null });
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-4">Submit a Medical Case (Picture Prognosis)</h1>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            rows={5}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Attach Image (optional)</label>
          <input type="file" name="files" onChange={handleChange} accept="image/*" />
        </div>
        <button
          type="submit"
          className="bg-[#1f5f43] text-white px-6 py-2 rounded hover:bg-[#103b55]"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Case'}
        </button>
      </form>
    </div>
  );
};

export default PicturePrognosis;
