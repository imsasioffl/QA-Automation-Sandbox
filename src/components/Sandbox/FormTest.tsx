import React, { useState } from 'react';
import { useUIProps, useMutation } from '../../lib/mutation';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export function FormTest() {
  const { id: btnSubmit, text: btnSubmitText } = useUIProps("btn-submit-form", "Submit Form", "Send Now");
  const { id: inputEmail, text: lblEmail } = useUIProps("input-usr-email", "Email Address", "Contact Email");
  const { id: inputPass, text: lblPass } = useUIProps("input-usr-pass", "Password", "Secret Phrase");
  
  const [success, setSuccess] = useState(false);
  const { isScrambled } = useMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000); // reset after 5s
  };

  return (
    <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          1. Standard Form Controls
        </h2>
        <p className="text-slate-500 mt-2 text-sm">Tests agent ability to fill varied input types and locate submit triggers amidst mutation.</p>
      </div>

      {success && (
        <div 
          id="alert-success-submission" 
          className="mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-4"
        >
          <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="text-emerald-800 font-medium text-sm">QA_TOKEN_FORM_SUCCESS_200</h4>
            <p className="text-emerald-600/90 text-sm mt-1">
              Form payload systematically processed. Testing milestone achieved.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor={inputEmail} className="text-sm font-medium text-slate-700">{lblEmail}</label>
            <input 
              required
              type="email" 
              id={inputEmail} 
              data-testid={isScrambled ? undefined : "input-usr-email"}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors" 
              placeholder="agent@example.com"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor={inputPass} className="text-sm font-medium text-slate-700">{lblPass}</label>
            <input 
              required
              type="password" 
              id={inputPass} 
              data-testid={isScrambled ? undefined : "input-usr-pass"}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="textarea-bio" className="text-sm font-medium text-slate-700">Additional Context</label>
          <textarea 
            id="textarea-bio"
            rows={3} 
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors resize-none"
            placeholder="Agent narrative..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700">Target Framework</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input type="radio" name="framework" defaultChecked className="text-emerald-600 focus:ring-emerald-500" />
                Playwright
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input type="radio" name="framework" className="text-emerald-600 focus:ring-emerald-500" />
                Selenium
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input type="radio" name="framework" className="text-emerald-600 focus:ring-emerald-500" />
                Cypress
              </label>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700">Capabilities</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input type="checkbox" id="chk-screenshots" className="rounded text-emerald-600 focus:ring-emerald-500" />
                Record Screenshots
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input type="checkbox" id="chk-network" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500" />
                Trace Network Graph
              </label>
            </div>
            
            <div className="pt-2">
               <select id="sel-region" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
                  <option value="">Select execution region...</option>
                  <option value="us-east-1">US East (N. Virginia)</option>
                  <option value="eu-west-1">EU West (Ireland)</option>
                  <option value="ap-south-1">AP South (Mumbai)</option>
               </select>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex justify-end">
          <button 
            type="submit" 
            id={btnSubmit}
            data-testid={isScrambled ? undefined : "btn-submit-form"}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-sm shadow-emerald-600/20 transition-all active:scale-[0.98]"
          >
            {btnSubmitText}
          </button>
        </div>
      </form>
    </section>
  );
}
