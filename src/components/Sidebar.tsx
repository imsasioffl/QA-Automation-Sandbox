import React from 'react';
import { useMutation } from '../lib/mutation';
import { Network, TestTube2, LayoutDashboard, Shuffle, Settings, Workflow } from 'lucide-react';

export function Sidebar() {
  const { isScrambled, toggleScramble } = useMutation();

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 text-slate-300 flex flex-col h-screen fixed top-0 left-0 z-50">
      <div className="p-6 border-b border-slate-800/60 flex items-center gap-3">
        <TestTube2 className="text-emerald-400" size={24} />
        <h1 className="font-bold text-lg text-white tracking-tight">QA Sandbox</h1>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Core Testing Modules</div>
        
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm bg-slate-800/80 text-white rounded-lg transition-colors">
          <LayoutDashboard size={18} /> Dashboard
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-slate-800/50 rounded-lg transition-colors">
          <Workflow size={18} /> API Endpoints
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-slate-800/50 rounded-lg transition-colors">
          <Settings size={18} /> Configuration
        </button>
      </nav>

      <div className="p-6 bg-slate-900/50 border-t border-slate-800">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">UI Mutation Engine</div>
        
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-white flex items-center gap-2">
              <Shuffle size={16} className={isScrambled ? "text-amber-400" : "text-slate-500"} />
              Scramble DOM Selectors
            </span>
            <button 
              id="mng-toggle-scramble"
              onClick={toggleScramble}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isScrambled ? 'bg-amber-500' : 'bg-slate-600'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isScrambled ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            When enabled, dynamically replaces semantic IDs and textual identifiers with chaotic hashes to test self-healing resilience.
          </p>
        </div>
      </div>
    </aside>
  );
}
