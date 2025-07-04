import React, { useState } from 'react';
import axios from 'axios';

const PeerReviewWaitlist = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    institution: '',
    motivation: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.post('/api/waitlist', form);
      setSuccess('You have been added to the waitlist!');
      setForm({ name: '', email: '', institution: '', motivation: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-4">Peer Review Workshop Waitlist</h1>
      <p className="mb-4">Join our upcoming peer review training program. Enter your details below to join the waitlist. Submissions will be sent to the chief editor's dashboard.</p>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Institution</label>
          <input
            type="text"
            name="institution"
            value={form.institution}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Motivation (optional)</label>
          <textarea
            name="motivation"
            value={form.motivation}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="bg-[#1f5f43] text-white px-6 py-2 rounded hover:bg-[#103b55]"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Join Waitlist'}
        </button>
      </form>
    </div>
  );
};

export default PeerReviewWaitlist;
