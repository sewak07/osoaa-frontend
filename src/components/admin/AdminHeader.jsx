import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { LogOut, User } from 'lucide-react';

export const AdminHeader = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-400">Environment:</span>
        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold rounded-full">
          Production Live
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 font-bold flex items-center justify-center text-xs">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-bold text-white leading-none">{user?.name}</p>
            <p className="text-[10px] text-orange-400 font-medium">Administrator</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
