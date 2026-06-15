import React from 'react';
import { MutationProvider } from './lib/mutation';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { FormTest } from './components/Sandbox/FormTest';
import { TableTest } from './components/Sandbox/TableTest';
import { AdvancedTest } from './components/Sandbox/AdvancedTest';
import { EdgeCaseTest } from './components/Sandbox/EdgeCaseTest';

export default function App() {
  return (
    <MutationProvider>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
        <Sidebar />
        <div className="flex-1 ml-64 flex flex-col relative w-[calc(100%-16rem)]">
           <TopNav />
           <main className="flex-1 overflow-y-auto w-full p-6 lg:p-10 lg:pb-32 pb-24">
             <div className="max-w-5xl mx-auto space-y-8 lg:space-y-12">
               {/* Hero Header Area */}
               <div className="mb-2">
                 <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Validations</h1>
                 <p className="text-slate-500 mt-2 text-base max-w-2xl leading-relaxed">
                   Execute robust end-to-end automation test flows against unstable schemas, unreliable networks, and complex DOM boundary structures. Test assertions across multi-frame scopes and dynamic locators.
                 </p>
               </div>
               
               <FormTest />
               <TableTest />
               <AdvancedTest />
               <EdgeCaseTest />
             </div>
           </main>
        </div>
      </div>
    </MutationProvider>
  );
}
