import React, { useState, useEffect } from 'react';
import { X, Rocket, ChevronDown, Search, Calendar, Tag } from 'lucide-react';
import { CampusEvent } from '../types';

interface CreateTeamFormProps {
  availableEvents: CampusEvent[];
  setShowCreateTeamForm: (val: boolean) => void;
  newTeamData: { hackathon: string, name: string, description: string, maxMembers: number };
  setNewTeamData: (data: any) => void;
  handleCreateTeam: () => void;
}

const CreateTeamForm: React.FC<CreateTeamFormProps> = ({
  availableEvents,
  setShowCreateTeamForm,
  newTeamData,
  setNewTeamData,
  handleCreateTeam
}) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const filteredEvents = availableEvents.filter(e => 
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 sm:p-12 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-500"
        onClick={() => setShowCreateTeamForm(false)}
      />
      
      {/* Main Modal Container - Shifted slightly up for optical centering */}
      <div className="relative bg-white border border-slate-100 rounded-[40px] p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] max-w-3xl w-full animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 -translate-y-4">
        {/* Header - More Compact */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
              <Rocket className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Create New Team</h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Form your dream squad</p>
            </div>
          </div>
          <button 
            onClick={() => setShowCreateTeamForm(false)} 
            className="w-12 h-12 rounded-2xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all shadow-sm"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Hackathon Selection - Takes full row */}
          <div className="md:col-span-2">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Target Event</label>
            <button 
              onClick={() => setIsPickerOpen(true)}
              className="w-full bg-slate-50/50 border border-slate-100 rounded-[22px] px-6 py-4 text-sm font-bold text-left hover:bg-white hover:border-emerald-300 focus:ring-8 focus:ring-emerald-500/5 transition-all flex items-center justify-between group shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${newTeamData.hackathon ? "bg-emerald-50 text-emerald-500" : "bg-slate-100 text-slate-300"}`}>
                  <Calendar className="w-4 h-4" />
                </div>
                <span className={newTeamData.hackathon ? "text-slate-900" : "text-slate-400"}>
                  {newTeamData.hackathon || "Select a Hackathon"}
                </span>
              </div>
              <ChevronDown className={`w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-all ${isPickerOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Team Name */}
          <div className="space-y-2.5">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Team Name</label>
            <div className="relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors flex items-center justify-center">
                <Tag className="w-4 h-4" />
              </div>
              <input 
                type="text" 
                placeholder="e.g. Neural Knights"
                className="w-full bg-slate-50/50 border border-slate-100 rounded-[22px] pl-14 pr-6 py-4 text-sm font-bold focus:bg-white focus:border-emerald-300 focus:ring-8 focus:ring-emerald-500/5 transition-all shadow-sm"
                value={newTeamData.name}
                onChange={(e) => setNewTeamData({...newTeamData, name: e.target.value})}
              />
            </div>
          </div>

          {/* Max Members */}
          <div className="space-y-2.5">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Capacity</label>
            <div className="relative">
              <select 
                className="w-full bg-slate-50/50 border border-slate-100 rounded-[22px] px-6 py-4 text-sm font-bold appearance-none focus:bg-white focus:border-emerald-300 focus:ring-8 focus:ring-emerald-500/5 transition-all shadow-sm"
                value={newTeamData.maxMembers}
                onChange={(e) => setNewTeamData({...newTeamData, maxMembers: parseInt(e.target.value)})}
              >
                {[2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} Members Max</option>
                ))}
              </select>
              <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2 space-y-2.5">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Project Description</label>
            <textarea 
             placeholder="What is your team building? (goals, tech stack, vibes)"
             className="w-full bg-slate-50/50 border border-slate-100 rounded-[22px] px-6 py-5 text-sm font-bold focus:bg-white focus:border-emerald-300 focus:ring-8 focus:ring-emerald-500/5 transition-all h-28 resize-none shadow-sm"
             value={newTeamData.description}
             onChange={(e) => setNewTeamData({...newTeamData, description: e.target.value})}
            />
          </div>
          
          {/* Action Button */}
          <div className="md:col-span-2 pt-4">
            <button 
              onClick={handleCreateTeam}
              className="w-full py-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] hover:from-emerald-700 hover:to-teal-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-emerald-200/50 flex items-center justify-center gap-4 group"
            >
              <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Launch Team
            </button>
          </div>
        </div>
      </div>

      {/* Hackathon Selection Popup */}
      {isPickerOpen && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300" 
            onClick={() => setIsPickerOpen(false)}
          />
          <div className="relative bg-white w-full max-w-xl max-h-[85vh] rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-300 border border-slate-100 flex flex-col">
            <div className="p-8 pb-4 bg-white sticky top-0 z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Select Event</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Available Hackathons</p>
                </div>
                <button 
                  onClick={() => setIsPickerOpen(false)}
                  className="w-12 h-12 rounded-2xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                <input 
                  type="text"
                  placeholder="Search events..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold focus:ring-8 focus:ring-emerald-500/5 focus:border-emerald-500/30 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-2 scroll-smooth">
              {filteredEvents.length > 0 ? (
                filteredEvents.map(event => (
                  <button
                    key={event.id}
                    onClick={() => {
                      setNewTeamData({ ...newTeamData, hackathon: event.title });
                      setIsPickerOpen(false);
                    }}
                    className="w-full flex items-center gap-4 p-4 rounded-3xl hover:bg-slate-50 transition-all group text-left relative overflow-hidden"
                  >
                    {newTeamData.hackathon === event.title && (
                      <div className="absolute inset-y-4 left-1.5 w-1.5 bg-emerald-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
                    )}
                    <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-slate-100">
                      <img src={event.posterUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3 mb-1">
                        <h4 className="text-sm font-black text-slate-900 truncate group-hover:text-emerald-600 transition-colors">{event.title}</h4>
                        <span className="text-[9px] font-black px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase tracking-widest shrink-0">
                          {event.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-5">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                          <Calendar className="w-3.5 h-3.5 text-slate-300" />
                          {event.date}
                        </div>
                        <div className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${
                          event.type === 'Live' ? 'text-rose-500' : 'text-emerald-500'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${event.type === 'Live' ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`} />
                          {event.type}
                        </div>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="py-20 text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-slate-200" />
                  </div>
                  <p className="text-lg font-black text-slate-900">No events found</p>
                  <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Try another search term</p>
                </div>
              )}
            </div>
            <div className="h-10 bg-gradient-to-t from-white to-transparent sticky bottom-0 pointer-events-none" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTeamForm;
