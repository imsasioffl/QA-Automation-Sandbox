import React, { useState, useRef, useEffect } from 'react';
import { useUIProps } from '../../lib/mutation';
import { Network, EyeOff, Clock } from 'lucide-react';

function ShadowDOMComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { id: shadowBtnId, text: shadowBtnTxt } = useUIProps("btn-shadow-action", "Trigger Shadow Boundary", "Hidden Activation");

  useEffect(() => {
    if (containerRef.current && !containerRef.current.shadowRoot) {
      const shadow = containerRef.current.attachShadow({ mode: 'open' });
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `
        <style>
          .s-wrap { display: flex; align-items: center; gap: 1rem; }
          .s-btn { 
            background: #0f172a; color: #fff; border: none; padding: 0.5rem 1rem; border-radius: 0.5rem; 
            font-family: inherit; font-size: 0.875rem; cursor: pointer; transition: 0.2s;
          }
          .s-btn:hover { background: #1e293b; }
          .s-status { font-size: 0.875rem; color: #10b981; font-family: monospace; display: none; }
        </style>
        <div class="s-wrap">
          <button id="${shadowBtnId}" class="s-btn">${shadowBtnTxt}</button>
          <span id="shadow-status" class="s-status">SHADOW_EVENT_001_OK</span>
        </div>
      `;
      shadow.appendChild(wrapper);

      wrapper.querySelector('button')?.addEventListener('click', () => {
        const s = wrapper.querySelector('#shadow-status') as HTMLElement;
        if(s) { s.style.display = 'block'; }
      });
    }
  }, [shadowBtnId, shadowBtnTxt]);

  return <div ref={containerRef} className="pt-2"></div>;
}

export function AdvancedTest() {
  const { id: asyncBtn, text: asyncBtnTxt } = useUIProps("btn-async-trigger", "Start Async Job", "Begin Latency Process");
  
  const [asyncStatus, setAsyncStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const triggerAsync = () => {
    setAsyncStatus('loading');
    setTimeout(() => {
      setAsyncStatus('success');
    }, 4000); // 4 second delay
  };

  return (
    <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">3. Advanced Document Boundaries & Timing</h2>
        <p className="text-slate-500 mt-2 text-sm">Tests agent constraints across iframes, shadow boundaries, and unreliable network latency conditions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Shadow DOM Box */}
        <div className="p-5 border border-slate-200 rounded-xl bg-slate-50/50">
          <div className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
            <EyeOff size={18} /> Shadow DOM Encapsulation
          </div>
          <p className="text-sm text-slate-500 mb-4 h-10">Element is rendered natively inside an open shadow root, immune to traditional `document.querySelector`.</p>
          <ShadowDOMComponent />
        </div>

        {/* Async Box */}
        <div className="p-5 border border-slate-200 rounded-xl bg-slate-50/50">
          <div className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
            <Clock size={18} /> Asynchronous Rendering Constraints
          </div>
          <p className="text-sm text-slate-500 mb-4 h-10">Simulates delayed application state. Agent must utilize explicit waits or polling until element appears.</p>
          
          <div className="flex items-center gap-4">
            <button 
              id={asyncBtn}
              onClick={triggerAsync}
              disabled={asyncStatus !== 'idle'}
              className="px-4 py-2 border border-slate-300 shadow-sm bg-white hover:bg-slate-50 text-slate-700 transition-colors rounded-lg font-medium text-sm disabled:opacity-50"
            >
              {asyncStatus !== 'idle' ? 'Processing...' : asyncBtnTxt}
            </button>
            
            {asyncStatus === 'loading' && (
               <div className="flex items-center gap-2 text-blue-600 text-sm font-medium animate-pulse">
                  <span className="h-4 w-4 rounded-full border-2 border-b-transparent border-blue-600 animate-spin flex-shrink-0" /> Fetching payload...
               </div>
            )}
            
            {asyncStatus === 'success' && (
                <div id="async-success-token" className="text-emerald-600 font-mono text-sm font-medium animate-in fade-in zoom-in duration-300">
                  <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded">ASYNC_PAYLOAD_RESOLVED_900X</span>
                </div>
            )}
          </div>
        </div>

        {/* Iframe Box */}
        <div className="lg:col-span-2 p-5 border border-slate-200 rounded-xl bg-slate-50/50">
           <div className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
            <Network size={18} /> Cross-Origin Iframe Context Simulation
          </div>
          <p className="text-sm text-slate-500 mb-4">The agent must explicitly switch execution context (`frameLocator`) to interact with this embedded document.</p>
          
          <div className="p-2 border border-slate-200 bg-slate-200 rounded-lg shadow-inner">
             {/* Simple self-contained document to ensure no CORS but enforces frame traversal */}
             <iframe 
               title="Isolated Test Frame"
               className="w-full h-32 bg-white rounded border border-slate-300 shadow-sm"
               srcDoc={`
                 <!DOCTYPE html>
                 <html lang="en">
                   <head>
                     <style>
                       body { font-family: ui-sans-serif, system-ui, sans-serif; padding: 20px; color: #334155; display: flex; align-items: center; justify-content: space-between;}
                       button { padding: 10px 20px; background: #6366f1; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
                       button:hover { background: #4f46e5; }
                       .success { display: none; color: #10b981; font-family: monospace; padding: 10px; background: #d1fae5; border-radius: 4px; }
                     </style>
                   </head>
                   <body>
                     <div>
                       <h3 style="margin:0 0 4px 0; font-size:16px;">External Widget</h3>
                       <p style="margin:0; font-size:13px; color:#64748b;">This isolated frame contains third-party elements.</p>
                     </div>
                     <button id="iframe-btn-confirm">Acknowledge</button>
                     <div class="success" id="iframe-status">FRAME_EXECUTION_VERIFIED</div>
                     <script>
                       document.getElementById('iframe-btn-confirm').addEventListener('click', function() {
                         this.style.display = 'none';
                         document.getElementById('iframe-status').style.display = 'block';
                       });
                     </script>
                   </body>
                 </html>
               `}
             />
          </div>
        </div>

      </div>
    </section>
  );
}
