import React, { useState } from 'react';
import { useUIProps } from '../../lib/mutation';
import { AlertTriangle, Info, X, Clock } from 'lucide-react';

export function EdgeCaseTest() {
  const { id: btnModalId, text: btnModalTxt } = useUIProps("btn-open-modal", "Open Blocking Modal", "Trigger Dialog Overlay");
  const { id: btnToastId, text: btnToastTxt } = useUIProps("btn-trigger-toast", "Show Toast Notification", "Display Auto-dismiss Alert");
  
  const [modalOpen, setModalOpen] = useState(false);
  const [toasts, setToasts] = useState<{id: number, message: string}[]>([]);

  const handleShowToast = () => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message: "Ephemeral Action State Updated." }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  return (
    <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">4. Edge Cases & Flaky UI Conditions</h2>
        <p className="text-slate-500 mt-2 text-sm">Tests z-index occlusion, ephemeral presence (tooltips, toasts), and trap focus isolation.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Modals & Overlays */}
        <div className="flex-1 p-5 border border-slate-200 rounded-xl bg-slate-50/50 flex flex-col items-start gap-4">
           <div className="text-slate-700 font-semibold flex items-center gap-2"><AlertTriangle size={18} className="text-amber-500"/> Occlusion & Modals</div>
           <p className="text-sm text-slate-500">Requires agent to identify blocking overlays, switch active context to the overlay, and locate a non-semantic closing mechanism.</p>
           <button 
             id={btnModalId}
             onClick={() => setModalOpen(true)}
             className="px-4 py-2 border border-slate-300 bg-white shadow-sm rounded font-medium text-sm text-slate-700 hover:bg-slate-50 transition-colors mt-auto"
           >
             {btnModalTxt}
           </button>
        </div>

        {/* Hover Tooltips */}
        <div className="flex-1 p-5 border border-slate-200 rounded-xl bg-slate-50/50 flex flex-col items-start gap-4">
           <div className="text-slate-700 font-semibold flex items-center gap-2"><Info size={18} className="text-blue-500"/> Actionable Tooltips</div>
           <p className="text-sm text-slate-500">Critical data required for the test assertion is completely hidden inside the DOM until a hover simulation is performed.</p>
           
           <div className="mt-auto pt-2">
              <div className="group relative inline-flex items-center justify-center">
                 <div className="px-4 py-2 bg-slate-800 text-white rounded font-medium text-sm cursor-help shadow-sm">
                   Hover to expose token
                 </div>
                 <div className="absolute bottom-full mb-2 [transform:translateY(10px)] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:[transform:translateY(0)] transition-all duration-200">
                    <div className="bg-slate-900 text-white text-xs px-3 py-2 rounded shadow-xl whitespace-nowrap border border-slate-700 relative">
                      TOOLTIP_AUTH_REQ_509
                      <div className="absolute w-2 h-2 bg-slate-900 border-r border-b border-slate-700 rotate-45 -bottom-1 left-1/2 -translate-x-1/2" />
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Transient Toasts */}
        <div className="flex-1 p-5 border border-slate-200 rounded-xl bg-slate-50/50 flex flex-col items-start gap-4">
           <div className="text-slate-700 font-semibold flex items-center gap-2"><Clock size={18} className="text-emerald-500"/> Ephemeral Toasts</div>
           <p className="text-sm text-slate-500">Alerts appear dynamically at the document root and self-destruct after 4 seconds. Assertion requires rapid locator binding.</p>
           
           <button 
             id={btnToastId}
             onClick={handleShowToast}
             className="px-4 py-2 border border-slate-300 bg-white shadow-sm rounded font-medium text-sm text-slate-700 hover:bg-slate-50 transition-colors mt-auto"
           >
             {btnToastTxt}
           </button>
        </div>
      </div>

      {/* Modal Portal (relative to root) */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
           <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-sm w-full relative animate-in zoom-in-95 duration-200">
              <button 
                id="modal-icon-close" 
                onClick={() => setModalOpen(false)} 
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 hover:bg-slate-100 w-8 h-8 flex items-center justify-center rounded-full transition-colors"
                aria-label="Close dialog"
              >
                 <X size={20} />
              </button>
              
              <div className="mb-6 flex justify-center text-amber-500">
                 <AlertTriangle size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-center text-slate-900 mb-2">Occlusion Alert</h3>
              <p className="text-slate-600 text-center text-sm mb-6 leading-relaxed">
                 You are currently trapped in a modal overlay preventing interaction with the background document. You must click the 'X' icon or acknowledge strictly within this scope to proceed.
              </p>
              
              <button 
                 onClick={() => setModalOpen(false)}
                 className="w-full py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
              >
                 Acknowledge Event
              </button>
           </div>
        </div>
      )}

      {/* Toast Portal (relative to root) */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
           <div 
             key={toast.id}
             className="bg-slate-950 text-white px-4 py-3 rounded-xl shadow-2xl pointer-events-auto border border-slate-800 border-l-4 border-l-blue-500 flex items-center gap-3 animate-in slide-in-from-right-8 fade-in duration-300"
           >
             <Info size={18} className="text-blue-400" />
             <div className="text-sm font-medium">{toast.message}</div>
           </div>
        ))}
      </div>
    </section>
  );
}
