
import React from 'react';
import { 
  Home, 
  GitBranch, 
  Users, 
  Calendar, 
  Zap, 
  Trophy, 
  HelpCircle, 
  BookOpen,
  Layout,
  Star,
  PartyPopper,
  Flame,
  Globe,
  Plus,
  ArrowRight,
  Ticket,
  Medal,
  BarChart3,
  MessageSquare,
  TrendingUp,
  Code
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unopenedEventsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, unopenedEventsCount = 0 }) => {
  const menuItems = [
    { name: 'Scorecard', icon: TrendingUp, id: 'Scorecard' },
    { name: 'My Timeline', icon: GitBranch, id: 'Timeline' },
    { name: 'Expert Sessions', icon: Users, id: 'Expert' },
    { name: 'Calendar', icon: Calendar, id: 'Calendar' },
    { name: 'Arena', icon: Code, id: 'Arena' },
    { name: 'Leaderboard', icon: Trophy, id: 'Leaderboard' },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col h-full shrink-0 z-40">
      {/* Brand Logo */}
      <div className="p-7">
        <div className="flex items-start space-x-3 mb-1">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-xl shadow-blue-100 shrink-0 mt-1">
            <Layout className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-slate-900 tracking-tight text-sm leading-tight">Newton School of Technology</span>
            <span className="text-[9px] text-slate-400 font-bold tracking-[0.1em] mt-1">V3.0 PLATFORM</span>
          </div>
        </div>
      </div>

      {/* Navigation Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-1">
        <button 
          onClick={() => setActiveTab('Home')}
          className={`flex items-center w-full px-4 py-3 rounded-2xl transition-all  ${
            activeTab === 'Home' 
              ? 'bg-slate-900 text-white shadow-lg shadow-slate-200 font-bold' 
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <Home className={`w-5 h-5 mr-3 transition-colors ${activeTab === 'Home' ? 'text-white' : 'text-slate-400'}`} />
          <span className="text-sm">Dashboard</span>
        </button>

        {/* Special Border Container for Events */}
        <div className="relative group mt-1">
          {/* Animated Gradient Border */}
          <div className={`absolute -inset-[2px] bg-gradient-to-r from-rose-400 via-orange-400 to-rose-400 rounded-[18px] opacity-70 blur-[1px] transition  ${
            activeTab === 'Events' ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'
          }`}></div>
          
          <button 
            onClick={() => setActiveTab('Events')}
            className={`relative flex items-center justify-between w-full px-4 py-3 rounded-2xl transition-all  bg-white border ${
              activeTab === 'Events' 
                ? 'border-transparent text-rose-600 font-bold' 
                : 'border-slate-100 text-slate-500 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center">
              <PartyPopper className={`w-5 h-5 mr-3 transition-colors ${activeTab === 'Events' ? 'text-rose-500' : 'text-slate-400'}`} />
              <span className="text-sm">Events</span>
            </div>
            {activeTab === 'Events' ? (
              <div className="flex items-center gap-1.5">
                 <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shadow-sm" />
                 <span className="text-[8px] font-black uppercase tracking-wider text-rose-400">Live</span>
              </div>
            ) : (
              <span className={`text-[8px] px-1.5 py-0.5 rounded font-black tracking-tighter transition-all ${unopenedEventsCount > 0 ? 'bg-rose-50 text-rose-500' : 'bg-slate-100 text-slate-400'}`}>
                {unopenedEventsCount > 0 ? `${unopenedEventsCount} NEW` : '0 NEW'}
              </span>
            )}
          </button>
        </div>

        <div className="pt-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center w-full px-4 py-3 rounded-2xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-200 font-bold' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 group'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 transition-colors ${activeTab === item.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
                <span className="text-sm">{item.name}</span>
              </button>
            )
          })}

          <button 
            className="flex items-center w-full px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-2xl transition-all group mt-1"
          >
            <MessageSquare className="w-5 h-5 mr-3 text-slate-400 group-hover:text-slate-600" />
            <span className="text-sm">Help & Support</span>
          </button>
        </div>
      </div>

      {/* Bottom Profile */}
      <div className="p-6 border-t border-slate-100">
      </div>
    </aside>
  );
};
