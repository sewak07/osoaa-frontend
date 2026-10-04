import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useSettingsStore } from '../../store/settingsStore';

export const AnnouncementBar = () => {
  const { settings } = useSettingsStore();

  if (settings?.announcementBar?.enabled === false) return null;

  const text = settings?.announcementBar?.text || '⚡ Free Nationwide Delivery Across Nepal on Orders Over Rs. 3,500 | 100% Authentic Wellness & Nutrition';
  const link = settings?.announcementBar?.link || '/shop';

  return (
    <div className="bg-[#E5E7EB] text-black text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 border-b border-gray-300">
      <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse shrink-0" />
      <span>{text}</span>
      {link && (
        <Link to={link} className="underline font-bold text-orange-600 hover:text-orange-700 ml-1 transition">
          Shop Now
        </Link>
      )}
    </div>
  );
};
