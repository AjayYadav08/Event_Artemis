
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Bell, UserPlus, Search, User, Zap, Command, Trash2, Clock, Star, Terminal, Code2, Award, ExternalLink, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';

export interface Notification {
  id: number;
  text: string;
  eventName: string;
  eventId: string;
  timestamp: Date;
  read: boolean;
}

interface TopBarProps {
  notifications?: Notification[];
  onNotificationClick?: (eventId: string) => void;
  onClearNotifications?: () => void;
  onMarkRead?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ 
  notifications = [], 
  onNotificationClick = (eventId: string) => {}, 
  onClearNotifications = () => {},
  onMarkRead = () => {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!isOpen) {
      onMarkRead();
    }
    setIsOpen(!isOpen);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md px-8 flex items-center justify-between shrink-0 sticky top-0 z-30 transition-all  relative">
      <div className="flex items-center gap-6">
        {/* Branch Selector */}
        <button className="group flex items-center gap-3 pl-1 pr-4 py-1.5 rounded-full hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
            <span className="text-[10px] text-white font-black">N</span>
          </div>
          <div className="flex flex-col items-start">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-0.5">Platform</span>
             <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-700 leading-none">Even t Artemis</span>
                <ChevronDown className="w-3 h-3 text-slate-400 group-hover:translate-y-0.5 transition-transform" />
             </div>
          </div>
        </button>
      </div>

      {/* Global Search - Centered */}
      <div className="flex-1 max-w-xl px-8 hidden md:block">
         <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search for tasks, events, or peers..." 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-2.5 pl-11 pr-12 text-sm font-medium text-slate-600 focus:bg-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none placeholder:text-slate-400"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-white border border-slate-200 rounded-md px-1.5 py-0.5 pointer-events-none">
               <Command className="w-3 h-3 text-slate-400" />
               <span className="text-[10px] font-bold text-slate-400">K</span>
            </div>
         </div>
      </div>

      <div className="flex items-center gap-6">
        {/* XP Tracker - Enhanced */}
        <div className="hidden lg:flex items-center bg-slate-900 text-white px-1 py-1 pr-4 rounded-full shadow-xl shadow-slate-200 hover:shadow-2xl transition-all cursor-default group">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mr-3 shadow-inner group-hover:rotate-12 transition-transform">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <div className="flex flex-col">
             <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-0.5">Total XP</span>
             <span className="text-sm font-black tracking-tight leading-none">2,366</span>
          </div>
        </div>

        <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block" />

        {/* Icons and Profile */}
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all relative">
            <UserPlus className="w-5 h-5" />
          </button>
          
          {/* Notification Bell with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              id="tour-notifications"
              onClick={handleToggle}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all relative ${isOpen ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-50 text-slate-400 hover:text-blue-600'}`}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
              )}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute top-full right-0 mt-4 w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden   -95 duration-200 origin-top-right z-50">
                <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                   <div className="flex items-center gap-2">
                     <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Notifications</h3>
                     <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-[10px] font-bold">{notifications.length}</span>
                   </div>
                   {notifications.length > 0 && (
                     <button 
                       onClick={onClearNotifications}
                       className="text-[10px] font-bold text-slate-400 hover:text-rose-500 flex items-center gap-1 transition-colors uppercase tracking-wider"
                     >
                       <Trash2 className="w-3 h-3" /> Clear
                     </button>
                   )}
                </div>
                
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-12 text-center flex flex-col items-center">
                      <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                        <Bell className="w-5 h-5 text-slate-300" />
                      </div>
                      <p className="text-sm font-bold text-slate-400">No new notifications</p>
                      <p className="text-[10px] text-slate-300 mt-1 uppercase tracking-wide">You're all caught up!</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-50">
                      {notifications.map(notif => (
                        <div 
                          key={notif.id}
                          onClick={() => { onNotificationClick(notif.eventId); setIsOpen(false); }}
                          className="p-4 hover:bg-slate-50 transition-colors cursor-pointer group relative"
                        >
                          <div className="flex justify-between items-start mb-1">
                             <h4 className="text-[11px] font-black text-slate-700 uppercase tracking-wide group-hover:text-blue-600 transition-colors">{notif.eventName}</h4>
                             <span className="text-[10px] font-bold text-slate-300 flex items-center gap-1">
                               <Clock className="w-3 h-3" /> {formatTime(notif.timestamp)}
                             </span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium leading-relaxed pr-4">
                            {notif.text}
                          </p>
                          {!notif.read && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white shadow-sm" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="pl-2 relative" ref={profileDropdownRef}>
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`w-10 h-10 rounded-full bg-slate-100 border-2 shadow-sm transition-all overflow-hidden ${isProfileOpen ? 'border-blue-500 ring-2 ring-blue-100' : 'border-white hover:border-blue-200'}`}
            >
               <img src="https://i.pravatar.cc/150?img=12" alt="Profile" className="w-full h-full object-cover" />
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-4 w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden   -95 duration-200 origin-top-right z-50">
                {/* Header */}
                <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-10">
                     <User className="w-24 h-24" />
                   </div>
                   <div className="relative z-10 flex items-center gap-4">
                     <img src="https://i.pravatar.cc/150?img=12" alt="Profile" className="w-14 h-14 rounded-full border-2 border-white/20 shadow-lg" />
                     <div>
                       <h3 className="text-base font-black tracking-tight">Ajay Yadav</h3>
                       <p className="text-[11px] font-bold text-slate-300 uppercase tracking-widest mt-0.5">Software Eng • Year 3</p>
                     </div>
                   </div>
                </div>

                <div className="p-5 max-h-[400px] overflow-y-auto no-scrollbar space-y-6">
                  {/* Stats & Rating */}
                  <div className="flex items-center justify-between bg-slate-50 rounded-2xl p-4 border border-slate-100">
                     <div className="flex flex-col items-center flex-1 border-r border-slate-200">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Rating</span>
                        <div className="flex flex-col items-center gap-0.5">
                           <div className="flex items-center gap-1 text-slate-700">
                             <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                             <span className="text-sm font-black">4.8</span>
                           </div>
                           <span className="text-[9px] font-bold text-slate-400">(120 ratings)</span>
                        </div>
                     </div>
                     <div className="flex flex-col items-center flex-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Events</span>
                        <div className="flex items-center gap-1 text-slate-700">
                           <Award className="w-4 h-4 text-blue-500" />
                           <span className="text-sm font-black">12</span>
                        </div>
                     </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Core Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold flex items-center gap-1.5 border border-blue-100"><Code2 className="w-3 h-3" /> React</span>
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold flex items-center gap-1.5 border border-emerald-100"><Terminal className="w-3 h-3" /> Node.js</span>
                      <span className="px-2.5 py-1 bg-purple-50 text-purple-600 rounded-lg text-[10px] font-bold flex items-center gap-1.5 border border-purple-100"><Zap className="w-3 h-3" /> Gen AI</span>
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold flex items-center gap-1.5 border border-slate-200">UI/UX</span>
                    </div>
                  </div>

                  {/* Peer Feedback */}
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5"><MessageSquare className="w-3 h-3" /> Peer Feedback</h4>
                    <div className="space-y-2">
                      <div className="bg-emerald-50/50 border border-emerald-100 p-3 rounded-xl">
                        <div className="flex items-start gap-2">
                          <ThumbsUp className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <p className="text-[11px] font-medium text-slate-600 leading-relaxed italic">"Great teammate, very reliable and fast coder during hackathons."</p>
                        </div>
                      </div>
                      <div className="bg-amber-50/50 border border-amber-100 p-3 rounded-xl">
                        <div className="flex items-start gap-2">
                          <ThumbsDown className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <p className="text-[11px] font-medium text-slate-600 leading-relaxed italic">"Good technical skills but needs slightly better communication."</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Participation History */}
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Recent Participation</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                          <Award className="w-4 h-4 text-slate-400" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-slate-800">Global AI Hackathon</h5>
                          <p className="text-[10px] text-slate-500 font-medium">Winner • Top 1%</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                          <Terminal className="w-4 h-4 text-slate-400" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-slate-800">Web3 Build Sprint</h5>
                          <p className="text-[10px] text-slate-500 font-medium">Participant • Frontend</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 border-t border-slate-50 bg-slate-50/50">
                  <button className="w-full py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-700 uppercase tracking-widest hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2 shadow-sm">
                    View Full Profile <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
