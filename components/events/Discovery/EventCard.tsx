import React from 'react';
import { Clock, MapPin, Users, Ticket, ArrowRight, Zap, GraduationCap, Trophy, Terminal, Palette, Mic2, Heart, ThumbsDown } from 'lucide-react';
import { CampusEvent } from '../types';
import ImageWithFallback from '../ImageWithFallback';

interface EventCardProps {
  event: CampusEvent;
  isInterested: boolean;
  isRegistered: boolean;
  isPast: boolean;
  isUrgent: boolean;
  timeString: string | null;
  onExplore: (event: CampusEvent) => void;
  toggleInterested: (id: string) => void;
  markNotInterested: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  isInterested,
  isRegistered,
  isPast,
  isUrgent,
  timeString,
  onExplore,
  toggleInterested,
  markNotInterested
}) => {
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Competition': return <Trophy className="w-4 h-4" />;
      case 'Workshop': return <Terminal className="w-4 h-4" />;
      case 'Fest': return <Palette className="w-4 h-4" />;
      case 'Seminar': return <Mic2 className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <div 
      className="group relative bg-white rounded-[32px] overflow-hidden transition-all border border-slate-100 hover:border-blue-400 hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.12)] hover:-translate-y-2 flex flex-col h-full opacity-100"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <ImageWithFallback 
          src={event.posterUrl} 
          alt={event.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700 brightness-[1.05] contrast-[1.05]"
          fallbackSrc={
            event.category === 'Competition' ? 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000' :
            event.category === 'Workshop' ? 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000' :
            event.category === 'Fest' ? 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1000' :
            'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1000'
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/0 to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
        
        <div className="absolute top-5 left-5 flex flex-col gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <span className="text-white text-[10px] font-black uppercase tracking-widest">{event.category}</span>
          </div>
          {event.featured && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-400 rounded-xl shadow-lg animate-pulse">
               <Zap className="w-3 h-3 text-slate-900 fill-slate-900" />
               <span className="text-slate-900 text-[9px] font-black uppercase tracking-widest">Featured</span>
            </div>
          )}
        </div>

        {isRegistered && (
          <div className="absolute top-5 right-5 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white animate-bounce">
            <Ticket className="w-5 h-5" />
          </div>
        )}

        <div className="absolute top-5 right-5 flex flex-col gap-2">
           <button 
             onClick={(e) => { e.stopPropagation(); toggleInterested(event.id); }}
             className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg border-2 ${
               isInterested ? 'bg-rose-500 border-rose-400 text-white' : 'bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20'
             }`}
           >
             <Heart className={`w-5 h-5 ${isInterested ? 'fill-current' : ''}`} />
           </button>
           <button 
             onClick={(e) => { e.stopPropagation(); markNotInterested(event.id); }}
             className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-lg"
           >
             <ThumbsDown className="w-5 h-5" />
           </button>
        </div>

        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
           <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 text-white font-black text-sm">
                 {event.dayOfMonth}
              </div>
              <div className="flex flex-col">
                 <span className="text-white text-[10px] font-black uppercase tracking-widest">{event.date.split(' ')[1]}</span>
                 <span className="text-white/60 text-[9px] font-bold uppercase">{event.time}</span>
              </div>
           </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
             <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors truncate mb-1">{event.title}</h3>
             <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-xs font-bold truncate">{event.location}</span>
             </div>
          </div>
          {isUrgent && (
            <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-600 rounded-xl border border-rose-100">
               <div className="w-1.5 h-1.5 bg-rose-600 rounded-full animate-ping" />
               <span className="text-[9px] font-black uppercase tracking-widest">Urgent</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
           <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <Users className="w-4 h-4 text-slate-400" />
              <div className="flex flex-col">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight leading-none mb-1">Participants</span>
                 <span className="text-xs font-bold text-slate-700">{event.attendees}+</span>
              </div>
           </div>
           <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <Clock className="w-4 h-4 text-slate-400" />
              <div className="flex flex-col">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight leading-none mb-1">Status</span>
                 <span className={`text-xs font-bold ${isUrgent ? 'text-rose-600' : 'text-slate-700'}`}>{timeString}</span>
              </div>
           </div>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                 {getCategoryIcon(event.category)}
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{event.teamSize}</span>
           </div>
           <button 
             onClick={() => onExplore(event)}
             className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black hover:shadow-lg transition-all group/btn"
           >
             Explore <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
           </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EventCard);
