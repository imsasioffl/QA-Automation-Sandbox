import React, { useState } from 'react';
import { useUIProps, useMutation } from '../lib/mutation';
import { ChevronDown, Beaker, X, UserCircle, LogOut } from 'lucide-react';

export function TopNav() {
  const { id: navRootId, text: navRootText } = useUIProps("nav-services-menu", "Services", "Offerings");
  const { id: navBtnAuthId } = useUIProps("nav-btn-auth", "", "");
  const { isScrambled } = useMutation();
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    // Simulate network delay
    setTimeout(() => {
      setUser({ id: 'user-123', name: 'QA Admin', email: loginForm.email || 'admin@example.com' });
      setIsLoggingIn(false);
      setShowLoginModal(false);
      setLoginForm({ email: '', password: '' });
    }, 1200);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-40">
        <div className="flex items-center gap-2 text-slate-800">
          <Beaker size={20} className="text-emerald-500" />
          <span className="font-semibold tracking-tight text-lg">Test Suite Environment</span>
        </div>

        <nav>
          <ul className="flex items-center gap-2">
            {/* Top Level Item */}
            <li className="relative group px-3 py-2 cursor-pointer text-sm font-medium text-slate-600 hover:text-slate-900 rounded-md transition-colors hover:bg-slate-50">
              <div id={navRootId} className="flex items-center gap-1">
                {navRootText} <ChevronDown size={14} className="opacity-70 group-hover:rotate-180 transition-transform" />
              </div>

              {/* First Dropdown */}
              <div className="absolute left-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all origin-top scale-95 group-hover:scale-100">
                <ul className="py-2">
                  <li className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer">Security Testing</li>
                  
                  {/* Second Level Nested Item */}
                  <li className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer relative group/sub flex items-center justify-between">
                    Performance 
                    <ChevronDown size={14} className="-rotate-90 opacity-70" />

                    {/* Second Dropdown */}
                    <div className="absolute left-full top-0 ml-1 w-48 bg-white border border-slate-200 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all origin-left scale-95 group-hover/sub:scale-100">
                      <ul className="py-2">
                        <li className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer">Load Balancers</li>
                        <li className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer" id="nav-deep-click">Latency Probes</li>
                      </ul>
                    </div>
                  </li>
                  
                  <li className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer">API Fuzzing</li>
                </ul>
              </div>
            </li>

            <li className="ml-4">
              {user ? (
                <div className="relative group">
                  <button 
                    id={navBtnAuthId} 
                    data-testid={isScrambled ? undefined : "nav-btn-user-profile"}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-slate-50 border border-slate-200 text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
                  >
                    <UserCircle size={18} className="text-emerald-600" />
                    <span>{user.name}</span>
                    <ChevronDown size={14} className="opacity-70 group-hover:rotate-180 transition-transform" />
                  </button>

                  <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all origin-top scale-95 group-hover:scale-100">
                    <ul className="py-2">
                      <li className="px-4 py-2 text-sm text-slate-700 border-b border-slate-100 pb-2 mb-2">
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-xs text-slate-500 truncate">{user.email}</div>
                      </li>
                      <li className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer flex items-center gap-2" onClick={handleLogout} data-testid={isScrambled ? undefined : "btn-logout"}>
                        <LogOut size={16} /> Logout
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <button 
                  id={navBtnAuthId} 
                  data-testid={isScrambled ? undefined : "nav-btn-auth"}
                  onClick={() => setShowLoginModal(true)}
                  className="px-4 py-2 text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 rounded-md shadow-sm transition-colors"
                >
                  <span className={isScrambled ? "blur-[2px] opacity-80" : ""}>{isScrambled ? "Authorize Client" : "User Login"}</span>
                </button>
              )}
            </li>
          </ul>
        </nav>
      </header>

      {/* Login Modal Overlay */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md relative animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-lg text-slate-900">Authenticate</h3>
              <button 
                onClick={() => setShowLoginModal(false)}
                className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-1.5 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleLoginSubmit} className="p-6">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Enterprise Email</label>
                  <input 
                    type="email" 
                    required
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm"
                    placeholder="name@company.com"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Single Sign-On Password</label>
                  <input 
                    type="password" 
                    required
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="mt-8">
                <button 
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoggingIn ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-b-transparent border-white animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    "Secure Login"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
