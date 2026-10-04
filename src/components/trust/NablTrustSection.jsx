import React from 'react';
import { ShieldCheck, CheckCircle2, Award, FlaskConical, Check } from 'lucide-react';
import { useSettingsStore } from '../../store/settingsStore';

export const NablTrustSection = () => {
  const { settings } = useSettingsStore();

  const nabl = settings?.nablCertification;
  if (nabl?.enabled === false) return null;

  const certName = nabl?.certificationName || 'NABL Quality Testing & Compliance';
  const labName = nabl?.laboratoryName || 'Associated NABL Accredited Testing Facility';
  const certNumber = nabl?.certificateNumber || '';
  const description = nabl?.shortDescription || 'OSOAA works in strict association with NABL-accredited laboratory facilities to test our product batches for authentic protein concentration, absence of heavy metals, and zero banned substances.';
  const badges = nabl?.trustBadges?.length > 0 ? nabl.trustBadges : [
    'NABL Laboratory Testing Partner',
    '100% Genuine & Authentic Batches',
    'Zero Banned Substances',
    'Heavy Metals Tested & Cleared',
    'Fast Nationwide Delivery Across Nepal',
  ];

  return (
    <section className="py-16 bg-brand-navy text-white relative overflow-hidden">
      
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Accreditation Description */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <FlaskConical className="w-4 h-4" />
              <span>Quality Assurance & Lab Standards</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Quality You Can Trust. <br />
              <span className="text-orange-400">
                Tested with NABL Accredited Facilities.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-navy-100 leading-relaxed">
              {description}
            </p>

            {/* Factual Trust Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {badges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3.5 rounded-xl bg-navy-800/80 border border-navy-700">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                  <span className="text-xs font-semibold text-white">{badge}</span>
                </div>
              ))}
            </div>

            {/* Official Lab Info Footer */}
            <div className="p-4 rounded-xl bg-navy-900 border border-navy-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-orange-400 font-bold uppercase tracking-wider">Partner Facility</p>
                <p className="text-sm font-semibold text-white">{labName}</p>
                {certNumber && (
                  <p className="text-[11px] text-navy-200 font-mono mt-0.5">Cert Ref: {certNumber}</p>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-white bg-orange-500 px-3.5 py-2 rounded-xl shadow-orange-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Standards</span>
              </div>
            </div>

          </div>

          {/* Right Trust Verification Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative p-8 rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-brand-navy text-white rounded-2xl shadow-md">
                    <Award className="w-7 h-7 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-brand-navy">Authenticity Seal</h3>
                    <p className="text-xs text-slate-500">Nepal Wellness & Nutrition</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                  Active
                </span>
              </div>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-orange-50 text-orange-600 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <p><strong className="text-brand-navy">Protein Concentration Verification:</strong> Verified protein percentage matching label claims.</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-orange-50 text-orange-600 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <p><strong className="text-brand-navy">Heavy Metals & Toxins Screening:</strong> Zero harmful lead, arsenic, or mercury contamination.</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-orange-50 text-orange-600 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <p><strong className="text-brand-navy">No Amino Spiking:</strong> Clean, non-spiked amino acid profile for clean lean muscle gains.</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Primary Market: <strong className="text-brand-navy">Nepal</strong></span>
                <span>Currency: <strong className="text-brand-navy">NPR</strong></span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
