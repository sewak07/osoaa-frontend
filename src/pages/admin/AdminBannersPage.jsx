import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, Image, Upload } from 'lucide-react';
import api from '../../services/api';

export const AdminBannersPage = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    badge: 'A Journey of Wellness',
    ctaText: 'Shop Now',
    ctaLink: '/shop',
    displayOrder: 0,
    isActive: true,
  });
  const [desktopImage, setDesktopImage] = useState(null);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const res = await api.get('/banners?includeInactive=true');
      setBanners(res.data.data || []);
    } catch (err) {
      console.error('Failed to load banners:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (desktopImage) formData.append('desktopImage', desktopImage);

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      await api.post('/banners', formData, config);
      setShowModal(false);
      fetchBanners();
    } catch (err) {
      alert(err.customMessage || 'Failed to save banner');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this banner slide?')) return;
    try {
      await api.delete(`/banners/${id}`);
      setBanners(banners.filter((b) => b._id !== id));
    } catch (err) {
      alert(err.customMessage || 'Failed to delete banner');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Hero Banners</h1>
          <p className="text-xs text-slate-400 mt-1">Manage homepage carousel images, promotional badges, and action links</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Hero Slide</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((ban) => (
          <div key={ban._id} className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="aspect-video rounded-2xl overflow-hidden bg-slate-950 relative">
              <img
                src={ban.desktopImage?.url || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80'}
                alt=""
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => handleDelete(ban._id)}
                className="absolute top-3 right-3 p-2 rounded-xl bg-rose-500/80 hover:bg-rose-500 text-white shadow-lg transition"
                title="Delete Banner"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div>
              <span className="px-2.5 py-0.5 bg-orange-500/20 text-orange-400 font-bold text-[10px] rounded-full">
                {ban.badge || 'Hero Slide'}
              </span>
              <h3 className="font-bold text-white text-base mt-1">{ban.title}</h3>
              <p className="text-xs text-slate-300 mt-0.5 line-clamp-2">{ban.subtitle}</p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800">
              <span>CTA: <strong className="text-white">{ban.ctaText}</strong> &rarr; <span className="text-slate-300">{ban.ctaLink}</span></span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                ban.isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
              }`}>
                {ban.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Create Hero Slide</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white block mb-1">Headline Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-white block mb-1">Subtitle / Slogan</label>
                <textarea
                  rows={2}
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-white block mb-1">Badge</label>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-white block mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={form.ctaText}
                    onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-white block mb-1">Hero Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setDesktopImage(e.target.files?.[0] || null)}
                  className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-orange-500 file:text-white hover:file:bg-orange-600 cursor-pointer"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-orange-500/20 transition active:scale-98"
                >
                  Create Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
