import React from 'react';
import { ShieldCheck, FlaskConical, Target } from 'lucide-react';
import { NablTrustSection } from '../../components/trust/NablTrustSection';

export const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 bg-white min-h-[75vh]">
      
      {/* Hero Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">About OSOAA</span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy tracking-tight">
          A Journey of Wellness & Authentic Nutrition in Nepal.
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Founded to eliminate counterfeit risks in Nepal's fitness community, OSOAA provides pure, tested, and reliable sports supplements backed by rigorous laboratory standards.
        </p>
      </div>

      {/* Core Mission & Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-brand-navy">100% Guaranteed Authenticity</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every product batch is sealed, imported directly from authentic sources, and tracked with individual lot numbers to ensure zero adulteration.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <FlaskConical className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-brand-navy">NABL Tested Standards</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We collaborate with NABL-accredited testing facilities to verify protein content, heavy metals safety, and zero banned substance contamination.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-brand-navy">Athlete-Centric Formulations</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Designed for real human physiology with digestive enzymes to eliminate bloating and maximize protein bio-utilization.
          </p>
        </div>
      </div>

      {/* NABL Lab Section */}
      <NablTrustSection />

    </div>
  );
};
