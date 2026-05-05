import React from 'react';
import { createPortal } from 'react-dom';
import { 
  X, Users, CalendarDays, Clock, MapPin, History, UserPlus, ArrowRight, Heart, 
  ThumbsDown, CheckCircle2, Sparkles, Camera, Gift, Cpu, Award, Timer, HelpCircle, 
  LifeBuoy, Phone, Mail, GraduationCap, Trophy, Shield, Briefcase, Zap 
} from 'lucide-react';
import { CampusEvent } from '../types';
import ImageWithFallback from '../ImageWithFallback';

interface EventDetailsModalProps {
  exploringEvent: CampusEvent;
  closeExplorer: () => void;
  isExploringEventPast: boolean;
  isRegistered: boolean;
  setShowPeersModal: (val: boolean) => void;
  onRegisterClick: () => void;
  isInterested: boolean;
  toggleInterested: (id: string) => void;
  isNotInterested: boolean;
  markNotInterested: (id: string) => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  exploringEvent,
  closeExplorer,
  isExploringEventPast,
  isRegistered,
  setShowPeersModal,
  onRegisterClick,
  isInterested,
  toggleInterested,
  isNotInterested,
  markNotInterested
}) => {
  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-white overflow-y-auto font-sans will-change-scroll">
       
       <button 
          onClick={closeExplorer} 
          className="fixed top-6 right-6 z-[10000] w-12 h-12 flex items-center justify-center rounded-full bg-black/10 backdrop-blur-xl border border-white/10 text-white shadow-2xl transition-all  hover:bg-rose-500 hover:border-rose-500 hover:scale-110 active:scale-90 group"
          title="Close Details"
       >
          <X className="w-5 h-5 stroke-[3px] group-hover:rotate-90 transition-transform " />
       </button>

       <div className="w-full h-[50vh] relative bg-slate-900">
          <ImageWithFallback src={exploringEvent.posterUrl} alt="Cover" className="w-full h-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/50" />
       </div>

       <div className="max-w-4xl mx-auto px-6 -mt-32 relative z-10 pb-32">
          <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12">
             
             <div className="flex flex-col gap-6 mb-8">
                <div className="flex flex-wrap items-center gap-3">
                   <span className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-black uppercase tracking-widest border border-slate-200">
                      {exploringEvent.category}
                   </span>
                   <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[11px] font-black uppercase tracking-widest border border-blue-100 flex items-center gap-2">
                      <Users className="w-3 h-3" /> {exploringEvent.attendees} Attending
                   </span>
                   {exploringEvent.type === 'Live' && (
                     <span className="px-4 py-1.5 rounded-full bg-rose-50 text-rose-500 text-[11px] font-black uppercase tracking-widest border border-rose-100 animate-pulse">
                        Live Event
                     </span>
                   )}
                </div>
                
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[0.95] tracking-tight">
                   {exploringEvent.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-slate-500 font-medium text-sm">
                   <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                      <CalendarDays className="w-4 h-4 text-blue-500" />
                      {exploringEvent.date}
                   </div>
                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                      <Clock className="w-4 h-4 text-blue-500" />
                      {isExploringEventPast ? "Event Concluded" : exploringEvent.time}
                   </div>
                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      {exploringEvent.location}
                   </div>
                </div>
             </div>

             <div className="flex flex-col sm:flex-row gap-4 mb-8 p-3 bg-slate-50/50 rounded-2xl border border-slate-100">
                 <button 
                   onClick={isExploringEventPast ? undefined : (isRegistered ? () => setShowPeersModal(true) : onRegisterClick)}
                   disabled={isExploringEventPast}
                   className={`flex-1 py-4 px-8 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-lg flex items-center justify-center gap-3 ${
                     isExploringEventPast
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none border border-slate-300'
                      : isRegistered 
                      ? 'bg-emerald-500 text-white shadow-emerald-200 hover:bg-emerald-600 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0'
                      : 'bg-slate-900 text-white hover:bg-black shadow-slate-300 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0'
                   }`}
                 >
                   {isExploringEventPast 
                      ? <><History className="w-5 h-5"/> Event Concluded</>
                      : isRegistered 
                      ? <><UserPlus className="w-5 h-5"/> Invite Peers</> 
                      : <>Register Now <ArrowRight className="w-5 h-5"/></>
                   }
                 </button>
                 
                 <div className="flex gap-2">
                     <button 
                       onClick={() => toggleInterested(exploringEvent.id)}
                       className={`px-6 py-3 rounded-xl border-2 font-bold transition-all flex items-center justify-center gap-2 flex-1 sm:flex-none ${
                          isInterested 
                          ? 'border-rose-200 bg-rose-50 text-rose-600'
                          : 'border-slate-200 bg-white text-slate-500 hover:border-rose-200 hover:text-rose-500'
                       }`}
                       title="Interested"
                     >
                       <Heart className={`w-5 h-5 ${isInterested ? 'fill-current' : ''}`} />
                       <span className="hidden sm:inline text-xs uppercase tracking-widest">Interested</span>
                     </button>

                     <button 
                       onClick={() => markNotInterested(exploringEvent.id)}
                       className={`px-6 py-3 rounded-xl border-2 font-bold transition-all flex items-center justify-center gap-2 ${
                          isNotInterested 
                          ? 'border-slate-300 bg-slate-100 text-slate-600'
                          : 'border-slate-200 bg-white text-slate-500 hover:border-slate-400 hover:text-slate-700'
                       }`}
                       title="Not Interested"
                     >
                       <ThumbsDown className="w-5 h-5" />
                     </button>
                 </div>
             </div>
             
             {isRegistered && !isExploringEventPast && (
                <div className="mb-8 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700 font-bold text-sm gap-2">
                  <CheckCircle2 className="w-5 h-5" /> You are registered for this event.
                </div>
             )}

             <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
                <div className="flex -space-x-3 shrink-0">
                   {Array.from({ length: 4 }).map((_, i) => (
                     <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 shadow-sm" style={{ backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 15})`, backgroundSize: 'cover' }} />
                   ))}
                   <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600 shadow-sm">
                     +{exploringEvent.attendees > 4 ? exploringEvent.attendees - 4 : 0}
                   </div>
                </div>
                <div>
                   <p className="text-sm font-bold text-slate-800">
                     <span className="text-indigo-600">{exploringEvent.attendees} people</span> from worldwide are participating
                   </p>
                   <p className="text-xs text-slate-500 mt-0.5">Don't miss out! Join the global community in this event.</p>
                </div>
             </div>

             <div className="h-px bg-slate-100 w-full mb-12" />

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                   <div>
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                         <Sparkles className="w-4 h-4 text-amber-500" /> About Event
                      </h3>
                      <p className="text-lg text-slate-600 leading-relaxed">
                         {exploringEvent.description}
                      </p>
                   </div>

                  {exploringEvent.gallery && (
                     <div>
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                           <Camera className="w-4 h-4 text-pink-500" /> Event Gallery
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-64">
                           {exploringEvent.gallery.map((img, idx) => (
                              <div key={idx} className={`relative overflow-hidden rounded-2xl group h-full shadow-sm border border-slate-100 ${idx === 0 ? 'md:col-span-2' : ''}`}>
                                 <ImageWithFallback src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover transition-transform  group-hover:scale-110" />
                                 <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {exploringEvent.prizesList && (
                    <div>
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                         <Gift className="w-4 h-4 text-rose-500" /> Prize Pool
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {exploringEvent.prizesList.map((prize, index) => (
                          <div key={index} className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition-all group">
                            <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${prize.color} opacity-10 rounded-bl-[40px] transition-transform group-hover:scale-110`} />
                            <div className="relative z-10">
                              <h4 className="text-2xl font-black text-slate-900 mb-1">{prize.amount}</h4>
                              <h5 className="font-bold text-slate-800 text-sm uppercase tracking-wide mb-2">{prize.title}</h5>
                              <p className="text-xs text-slate-500 leading-relaxed">{prize.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                   {exploringEvent.tracks && exploringEvent.tracks.length > 0 && (
                      <div>
                         <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            <Cpu className="w-4 h-4 text-blue-500" /> Focus Tracks
                         </h3>
                         <div className="flex flex-wrap gap-2">
                            {exploringEvent.tracks.map(track => (
                               <span key={track} className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 text-xs font-bold shadow-sm hover:bg-white hover:shadow-md transition-all cursor-default">
                                  {track}
                               </span>
                            ))}
                         </div>
                      </div>
                   )}

                   {exploringEvent.judges && (
                     <div>
                       <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                          <Award className="w-4 h-4 text-purple-500" /> Jury & Speakers
                       </h3>
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                         {exploringEvent.judges.map((judge, idx) => (
                           <div key={idx} className="flex flex-col items-center text-center group">
                             <div className="w-20 h-20 rounded-full mb-3 overflow-hidden border-2 border-slate-100 shadow-sm group-hover:border-purple-200 transition-all">
                               <ImageWithFallback src={judge.avatarUrl} alt={judge.name} className="w-full h-full" />
                             </div>
                             <h4 className="font-bold text-slate-900 text-sm">{judge.name}</h4>
                             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mt-1">{judge.role}</p>
                             <p className="text-[10px] text-slate-400 mt-0.5">{judge.company}</p>
                           </div>
                         ))}
                       </div>
                     </div>
                   )}

                   <div className="bg-slate-50 rounded-[32px] p-8 border border-slate-100">
                       <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                         <Timer className="w-4 h-4" /> Schedule Flow
                      </h3>
                      <div className="space-y-0 relative pl-2">
                         <div className="absolute left-[13px] top-2 bottom-4 w-0.5 bg-slate-200" />
                         
                         {exploringEvent.timeline.map((t, i) => (
                            <div key={i} className="flex gap-6 relative pb-10 last:pb-0">
                               <div className="w-3 h-3 bg-blue-500 rounded-full mt-1.5 shrink-0 ring-4 ring-slate-50 relative z-10" />
                               <div>
                                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-1">{t.time}</span>
                                  <h4 className="font-bold text-slate-900 text-base">{t.title}</h4>
                                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">{t.desc}</p>
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>
                   
                   {exploringEvent.faqs && (
                     <div>
                       <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-teal-500" /> Frequently Asked Questions
                       </h3>
                       <div className="grid grid-cols-1 gap-4">
                         {exploringEvent.faqs.map((faq, idx) => (
                           <div key={idx} className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                             <h4 className="font-bold text-slate-900 text-sm mb-2">{faq.q}</h4>
                             <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                           </div>
                         ))}
                       </div>
                     </div>
                   )}

                   <div className="border-t border-slate-100 pt-12">
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                         <LifeBuoy className="w-4 h-4 text-slate-400" /> Organizer Contact
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <a href={`tel:${exploringEvent.organizerContact?.phone}`} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-lg transition-all group">
                            <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
                               <Phone className="w-5 h-5" />
                            </div>
                            <div>
                               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Emergency Contact</span>
                               <span className="text-sm font-black text-slate-800">{exploringEvent.organizerContact?.phone || "+91 99887 76655"}</span>
                            </div>
                         </a>
                         
                         <a href={`mailto:${exploringEvent.organizerContact?.email}`} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-lg transition-all group">
                            <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-rose-600 group-hover:border-rose-100 transition-colors">
                               <Mail className="w-5 h-5" />
                            </div>
                            <div>
                               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Official Email</span>
                               <span className="text-sm font-black text-slate-800">{exploringEvent.organizerContact?.email || "events@artemis.events"}</span>
                            </div>
                         </a>
                      </div>
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="p-6 rounded-[32px] border border-slate-200 bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] space-y-6">
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] border-b border-slate-100 pb-4">
                         Essentials
                      </h3>
                      
                      <div className="space-y-5">
                         <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Eligibility</span>
                            <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
                               <GraduationCap className="w-4 h-4 text-slate-400" />
                               {exploringEvent.eligibility}
                            </span>
                         </div>
                         <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Team Size</span>
                            <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
                               <Users className="w-4 h-4 text-slate-400" />
                               {exploringEvent.teamSize}
                            </span>
                         </div>
                         <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Prize Pool</span>
                            <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
                               <Trophy className="w-4 h-4 text-amber-500" />
                               {exploringEvent.prizePool || 'N/A'}
                            </span>
                         </div>
                      </div>
                   </div>
                   
                   {exploringEvent.rules && (
                      <div className="p-6 rounded-[32px] border border-slate-200 bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] space-y-6">
                         <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] border-b border-slate-100 pb-4 flex items-center gap-2">
                           <Shield className="w-4 h-4 text-slate-400" /> Key Rules
                         </h3>
                         <ul className="space-y-3">
                            {exploringEvent.rules.map((rule, idx) => (
                              <li key={idx} className="text-xs text-slate-600 leading-relaxed flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                                {rule}
                              </li>
                            ))}
                         </ul>
                      </div>
                   )}

                   {exploringEvent.sponsors && (
                     <div className="p-6 rounded-[32px] bg-slate-50 border border-slate-100 space-y-6">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] pb-2 flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-slate-400" /> Partners
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {exploringEvent.sponsors.map((sponsor, idx) => (
                            <span key={idx} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wide border ${
                              sponsor.tier === 'Platinum' ? 'bg-white border-slate-200 text-slate-800 shadow-sm' : 
                              'bg-transparent border-slate-200 text-slate-500'
                            }`}>
                              {sponsor.name}
                            </span>
                          ))}
                        </div>
                     </div>
                   )}

                   <div className="p-8 rounded-[32px] bg-gradient-to-br from-indigo-600 to-blue-700 text-white shadow-xl shadow-blue-200 relative overflow-hidden group">
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform " />
                      
                      <div className="relative z-10">
                         <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                           <Zap className="w-5 h-5 fill-white" />
                         </div>
                         <div className="text-4xl font-black mb-1 tracking-tight">{exploringEvent.xp} XP</div>
                         <p className="text-blue-100 text-xs font-bold uppercase tracking-widest opacity-80">Earned upon completion</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>,
    document.body
  );
};

export default React.memo(EventDetailsModal);
