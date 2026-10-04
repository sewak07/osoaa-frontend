import React, { useEffect, useState } from 'react';
import { Save, CheckCircle2, ShieldCheck, Truck, CreditCard, Building2, AlertCircle } from 'lucide-react';
import api from '../../services/api';

export const AdminSettingsPage = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Form States
  const [businessName, setBusinessName] = useState('OSOAA');
  const [category, setCategory] = useState('Welliness & Nutrition');
  const [tagline, setTagline] = useState('A Journey of Wellness');
  const [phone, setPhone] = useState('+977-9801234567');
  const [secondaryPhone, setSecondaryPhone] = useState('+977-01-4432100');
  const [email, setEmail] = useState('info@osoaa.com.np');
  const [address, setAddress] = useState('Durbar Marg, Kathmandu, Nepal');

  // Delivery & Payments
  const [standardDeliveryFee, setStandardDeliveryFee] = useState(150);
  const [freeDeliveryThreshold, setFreeDeliveryThreshold] = useState(3500);
  const [codEnabled, setCodEnabled] = useState(true);
  const [esewaEnabled, setEsewaEnabled] = useState(true);

  // NABL Certification
  const [nablEnabled, setNablEnabled] = useState(true);
  const [certName, setCertName] = useState('NABL Quality Testing & Compliance');
  const [labName, setLabName] = useState('Associated NABL Accredited Testing Facility');
  const [certNumber, setCertNumber] = useState('NABL-TC-8892-2024');
  const [accreditationScope, setAccreditationScope] = useState('Nutritional Analysis, Purity Verification & Heavy Metals Testing');
  const [nablDescription, setNablDescription] = useState('OSOAA works in strict association with NABL-accredited laboratory facilities to test each batch for protein authenticity, zero banned substances, and highest purity.');
  const [trustBadgesText, setTrustBadgesText] = useState(
    'NABL Laboratory Testing Partner\n100% Genuine & Authentic Batches\nZero Banned Substances\nHeavy Metals Tested & Cleared\nFast Nationwide Delivery Across Nepal'
  );

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings/public');
        const s = res.data.data;
        if (s) {
          setSettings(s);
          setBusinessName(s.businessName || 'OSOAA');
          setCategory(s.category || 'Welliness & Nutrition');
          setTagline(s.tagline || 'A Journey of Wellness');
          setPhone(s.contact?.phone || '+977-9801234567');
          setSecondaryPhone(s.contact?.secondaryPhone || '+977-01-4432100');
          setEmail(s.contact?.email || 'info@osoaa.com.np');
          setAddress(s.contact?.address || 'Durbar Marg, Kathmandu, Nepal');

          setStandardDeliveryFee(s.deliverySettings?.standardDeliveryFee ?? 150);
          setFreeDeliveryThreshold(s.deliverySettings?.freeDeliveryThreshold ?? 3500);
          setCodEnabled(s.paymentSettings?.codEnabled ?? true);
          setEsewaEnabled(s.paymentSettings?.esewaEnabled ?? true);

          if (s.nablCertification) {
            setNablEnabled(s.nablCertification.enabled ?? true);
            setCertName(s.nablCertification.certificationName || '');
            setLabName(s.nablCertification.laboratoryName || '');
            setCertNumber(s.nablCertification.certificateNumber || '');
            setAccreditationScope(s.nablCertification.accreditationScope || '');
            setNablDescription(s.nablCertification.shortDescription || '');
            setTrustBadgesText(s.nablCertification.trustBadges?.join('\n') || '');
          }
        }
      } catch (err) {
        console.error('Failed to load business settings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const payload = {
        businessName,
        category,
        tagline,
        contact: {
          phone,
          secondaryPhone,
          email,
          address,
        },
        deliverySettings: {
          standardDeliveryFee: Number(standardDeliveryFee),
          freeDeliveryThreshold: Number(freeDeliveryThreshold),
        },
        paymentSettings: {
          codEnabled,
          esewaEnabled,
        },
        nablCertification: {
          enabled: nablEnabled,
          certificationName: certName,
          laboratoryName: labName,
          certificateNumber: certNumber,
          accreditationScope,
          shortDescription: nablDescription,
          trustBadges: trustBadgesText.split('\n').map((b) => b.trim()).filter(Boolean),
        },
      };

      await api.put('/settings', payload);
      setMessage('Business settings & NABL configuration updated successfully!');
    } catch (err) {
      setError(err.customMessage || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center">
        <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      
      <div>
        <h1 className="text-2xl font-black text-white">Business & NABL Settings</h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure business metadata, Nepal delivery charges, payment options, and NABL accreditation details
        </p>
      </div>

      {message && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="space-y-8">
        
        {/* 1. General Business Branding */}
        <div className="p-6 sm:p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Building2 className="w-4 h-4 text-orange-400" />
            <h2 className="text-xs font-bold text-orange-400 uppercase tracking-wider">
              1. Business Branding & Location (Nepal)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-white block mb-1">Brand Name *</label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-white block mb-1">Business Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-white block mb-1">Tagline / Slogan</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="text-xs font-bold text-white block mb-1">Primary Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-white block mb-1">Secondary Phone</label>
              <input
                type="text"
                value={secondaryPhone}
                onChange={(e) => setSecondaryPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-white block mb-1">Support Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="text-xs font-bold text-white block mb-1">Store Address in Nepal</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 2. Delivery & Payment Rules */}
        <div className="p-6 sm:p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Truck className="w-4 h-4 text-orange-400" />
            <h2 className="text-xs font-bold text-orange-400 uppercase tracking-wider">
              2. Delivery Rules & Payment Gateways (NPR)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-white block mb-1">Standard Delivery Fee (NPR)</label>
              <input
                type="number"
                min={0}
                value={standardDeliveryFee}
                onChange={(e) => setStandardDeliveryFee(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-white block mb-1">Free Delivery Threshold (NPR)</label>
              <input
                type="number"
                min={0}
                value={freeDeliveryThreshold}
                onChange={(e) => setFreeDeliveryThreshold(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <label className="flex items-center gap-3 p-4 bg-slate-950 border border-slate-800 rounded-2xl cursor-pointer">
              <input
                type="checkbox"
                checked={codEnabled}
                onChange={(e) => setCodEnabled(e.target.checked)}
                className="rounded border-slate-700 text-orange-500 focus:ring-orange-500"
              />
              <div>
                <span className="text-xs font-bold text-white block">Cash on Delivery (COD) Enabled</span>
                <span className="text-[11px] text-slate-400">Accept payment upon physical delivery</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-4 bg-slate-950 border border-slate-800 rounded-2xl cursor-pointer">
              <input
                type="checkbox"
                checked={esewaEnabled}
                onChange={(e) => setEsewaEnabled(e.target.checked)}
                className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-500"
              />
              <div>
                <span className="text-xs font-bold text-emerald-400 block">eSewa Payment Gateway Enabled</span>
                <span className="text-[11px] text-slate-400">EPAY v2 server-to-server signature verification</span>
              </div>
            </label>
          </div>
        </div>

        {/* 3. NABL Accreditation Configuration */}
        <div className="p-6 sm:p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-orange-400" />
              <h2 className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                3. NABL Laboratory Accreditation & Quality Trust Section
              </h2>
            </div>
            <label className="flex items-center gap-2 cursor-pointer text-xs text-white">
              <input
                type="checkbox"
                checked={nablEnabled}
                onChange={(e) => setNablEnabled(e.target.checked)}
                className="rounded border-slate-700 text-orange-500 focus:ring-orange-500"
              />
              <span>Section Visible</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-white block mb-1">Certification / Quality Title</label>
              <input
                type="text"
                value={certName}
                onChange={(e) => setCertName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-white block mb-1">Laboratory Facility Name</label>
              <input
                type="text"
                value={labName}
                onChange={(e) => setLabName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-white block mb-1">Certificate Reference / Accreditation #</label>
              <input
                type="text"
                value={certNumber}
                onChange={(e) => setCertNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-white block mb-1">Accreditation Scope</label>
              <input
                type="text"
                value={accreditationScope}
                onChange={(e) => setAccreditationScope(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-white block mb-1">Factual Laboratory Testing Description</label>
              <textarea
                rows={3}
                value={nablDescription}
                onChange={(e) => setNablDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-white block mb-1">Trust Badges (One per line)</label>
              <textarea
                rows={4}
                value={trustBadgesText}
                onChange={(e) => setTrustBadgesText(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono placeholder-slate-400 focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-black text-sm rounded-2xl shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 transition active:scale-[0.99] disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Updating Settings...' : 'Save All Business Settings'}</span>
        </button>

      </form>

    </div>
  );
};
