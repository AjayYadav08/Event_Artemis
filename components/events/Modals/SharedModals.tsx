import React from 'react';
import { Check, UserPlus, X, Send } from 'lucide-react';
import { CampusEvent } from '../types';

interface SharedModalsProps {
  showConfirmModal: boolean;
  setShowConfirmModal: (val: boolean) => void;
  exploringEvent: CampusEvent | null;
  confirmRegistration: () => void;
  showSuccessModal: boolean;
  setShowSuccessModal: (val: boolean) => void;
  setShowPeersModal: (val: boolean) => void;
  showPeersModal: boolean;
  invitedPeersMap: Record<string, Set<string>>;
  onInvitePeer: (peerId: string) => void;
  PEERS_MOCK: any[];
}

const SharedModals: React.FC<SharedModalsProps> = ({
  showConfirmModal, setShowConfirmModal, exploringEvent, confirmRegistration,
  showSuccessModal, setShowSuccessModal, setShowPeersModal,
  showPeersModal, invitedPeersMap, onInvitePeer, PEERS_MOCK
}) => {
  return (
    <>
      {showConfirmModal && exploringEvent && (
        <div className="fixed inset-0 z-[2100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-slate-100 animate-in zoom-in-95 fade-in duration-300 slide-in-from-bottom-4">
             <h3 className="text-xl font-black text-slate-900 mb-2">Confirm Registration</h3>
             <p className="text-slate-500 text-sm mb-8 leading-relaxed">
               Are you sure you want to register for <span className="font-bold text-slate-800">{exploringEvent.title}</span>? This will secure your spot and notify the organizers.
             </p>
             <div className="flex gap-3">
                <button 
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-3 text-slate-600 font-bold text-sm bg-slate-100 hover:bg-slate-200 rounded-xl transition-all active:scale-95"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmRegistration}
                  className="flex-1 py-3 text-white font-bold text-sm bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-lg shadow-blue-200 active:scale-95"
                >
                  Confirm
                </button>
             </div>
          </div>
        </div>
      )}
      
      {showSuccessModal && (
        <div className="fixed inset-0 z-[2100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-slate-100 animate-in zoom-in-95 fade-in duration-300 slide-in-from-bottom-4 text-center">
             <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <Check className="w-8 h-8" />
             </div>
             <h3 className="text-2xl font-black text-slate-900 mb-2">Registration completed successfully</h3>
             <p className="text-slate-500 text-sm mb-8 leading-relaxed">
               You are now officially part of the event. Get ready to compete and learn!
             </p>
             <div className="flex flex-col gap-3">
                <button 
                  onClick={() => { setShowSuccessModal(false); setShowPeersModal(true); }}
                  className="w-full py-4 text-white font-bold text-sm bg-slate-900 hover:bg-black rounded-xl transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2 active:scale-95"
                >
                  <UserPlus className="w-4 h-4" /> Ask Peers to Join
                </button>
                <button 
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full py-3 text-slate-500 font-bold text-sm hover:text-slate-800 transition-colors"
                >
                  Close
                </button>
             </div>
          </div>
        </div>
      )}

      {showPeersModal && exploringEvent && (
        <div className="fixed inset-0 z-[2100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 animate-in zoom-in-95 fade-in duration-300 slide-in-from-bottom-4 flex flex-col max-h-[80vh]">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-slate-900">Invite Peers</h3>
                <button onClick={() => setShowPeersModal(false)} className="p-2 bg-slate-50 rounded-full hover:bg-slate-100 text-slate-500">
                   <X className="w-5 h-5" />
                </button>
             </div>
             
             <div className="flex-1 overflow-y-auto pr-2 space-y-3 mb-6">
                {PEERS_MOCK.map(peer => {
                  const currentEventInvites = invitedPeersMap[exploringEvent.id];
                  const isInvited = currentEventInvites ? currentEventInvites.has(peer.id) : false;
                  
                  return (
                    <div key={peer.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                       <div className="flex items-center gap-3">
                          <img src={peer.avatar} alt={peer.name} className="w-10 h-10 rounded-full border border-white shadow-sm" />
                          <div>
                             <h4 className="text-sm font-bold text-slate-900">{peer.name}</h4>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{peer.role}</p>
                          </div>
                       </div>
                       <button 
                         onClick={() => onInvitePeer(peer.id)}
                         className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                           isInvited 
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                            : 'bg-[#0070F3] text-white hover:bg-[#0051B3] active:bg-[#004099] shadow-md shadow-blue-100'
                         }`}
                       >
                         {isInvited ? 'Invited' : <><Send className="w-3 h-3" /> Invite</>}
                       </button>
                    </div>
                  );
                })}
             </div>

             <div className="text-center">
                <p className="text-xs text-slate-400 font-medium">Invites are sent immediately via notification center.</p>
             </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SharedModals;
