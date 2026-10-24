import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { ChevronLeft, Users2, ChevronRight } from 'lucide-react';
import { Team, ChatMessage, JoinRequest } from '../types';
import TeamChat from './TeamChat';
import TeamMembers from './TeamMembers';
import TeamRequests from './TeamRequests';
import TeamDiscovery from './TeamDiscovery';
import CreateTeamForm from './CreateTeamForm';
import { useTutorial } from '../../tutorial/TutorialContext';

interface TeamPortalProps {
  availableEvents: any[];
  activeTeam: Team | null;
  setActiveTeam: (team: Team | null) => void;
  showCreateTeamForm: boolean;
  setShowCreateTeamForm: (val: boolean) => void;
  showJoinTeamView: boolean;
  setShowJoinTeamView: (val: boolean) => void;
  teams: Team[];
  activeTab: 'Chat' | 'Members' | 'Requests';
  setActiveTab: (tab: 'Chat' | 'Members' | 'Requests') => void;
  teamHosts: Record<string, string>;
  joinRequests: Record<string, JoinRequest[]>;
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
  removedMembers: Record<string, Set<string>>;
  submittedRatings: Record<string, { stars: number; feedback: string }>;
  handleMakeHost: (teamId: string, memberId: string) => void;
  setConfirmRemoveTarget: (id: string | null) => void;
  confirmRemoveTarget: string | null;
  handleRemoveMember: (teamId: string, memberId: string) => void;
  setRatingTarget: (id: string | null) => void;
  ratingTarget: string | null;
  setRatingStars: (stars: number) => void;
  ratingStars: number;
  setRatingFeedback: (feedback: string) => void;
  ratingFeedback: string;
  handleSubmitRating: () => void;
  teamMessages: Record<string, ChatMessage[]>;
  chatInput: string;
  setChatInput: (val: string) => void;
  sendMessage: () => void;
  chatEndRef: React.RefObject<HTMLDivElement>;
  handleAcceptRequest: (request: JoinRequest) => void;
  handleRejectRequest: (request: JoinRequest) => void;
  teamSearchQuery: string;
  setTeamSearchQuery: (val: string) => void;
  filteredTeamsPool: Team[];
  setPreviewingTeam: (team: Team) => void;
  newTeamData: any;
  setNewTeamData: (data: any) => void;
  handleCreateTeam: () => void;
  setShowTeamsView: (val: boolean) => void;
}

const TeamPortal: React.FC<TeamPortalProps> = (props) => {
  const {
    availableEvents,
    activeTeam, setActiveTeam,
    showCreateTeamForm, setShowCreateTeamForm,
    showJoinTeamView, setShowJoinTeamView,
    teams,
    activeTab, setActiveTab,
    teamHosts, joinRequests,
    setTeams,
    removedMembers, submittedRatings,
    handleMakeHost, setConfirmRemoveTarget, confirmRemoveTarget, handleRemoveMember,
    setRatingTarget, ratingTarget, setRatingStars, ratingStars, setRatingFeedback, ratingFeedback, handleSubmitRating,
    teamMessages, chatInput, setChatInput, sendMessage, chatEndRef,
    handleAcceptRequest, handleRejectRequest,
    teamSearchQuery, setTeamSearchQuery, filteredTeamsPool, setPreviewingTeam,
    newTeamData, setNewTeamData, handleCreateTeam,
    setShowTeamsView
  } = props;

  const { startFlow, advanceStep } = useTutorial();

  // Ref flags — ensure each flow is started at most once per component mount lifecycle
  const didStartTeamsFlow = useRef(false);
  const didStartTeamDetailsFlow = useRef(false);

  // References to measure horizontal boundaries for the lower panel
  const cardRef = useRef<HTMLDivElement>(null);
  const chatTabRef = useRef<HTMLButtonElement>(null);
  const [lowerPanelRightMargin, setLowerPanelRightMargin] = useState<number>(360);

  useLayoutEffect(() => {
    if (!activeTeam) return;

    const updateBounds = () => {
      if (!cardRef.current) return;
      const cardRect = cardRef.current.getBoundingClientRect();

      let rightMargin = 360;
      if (chatTabRef.current) {
        const chatTabRect = chatTabRef.current.getBoundingClientRect();
        // Move right boundary significantly inward so that it sits to the left of the Chat navigation button's left edge
        rightMargin = Math.max(80, (cardRect.right - chatTabRect.left) + 16);
      }

      setLowerPanelRightMargin(prev => {
        if (Math.abs(prev - rightMargin) < 0.5) return prev;
        return rightMargin;
      });
    };

    updateBounds();
    const t = setTimeout(updateBounds, 60);

    window.addEventListener('resize', updateBounds);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && cardRef.current) {
      ro = new ResizeObserver(updateBounds);
      ro.observe(cardRef.current);
      if (chatTabRef.current) ro.observe(chatTabRef.current);
    }

    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', updateBounds);
      ro?.disconnect();
    };
  }, [activeTeam]);

  useEffect(() => {
    if (!activeTeam && !showCreateTeamForm && !showJoinTeamView) {
      if (!didStartTeamsFlow.current) {
        didStartTeamsFlow.current = true;
        // Delay slightly so dynamic header buttons (New Team / Join Team) are in the DOM
        const t = setTimeout(() => startFlow('teams'), 350);
        return () => clearTimeout(t);
      }
    }
  }, []); // Run once on mount of the main list view

  useEffect(() => {
    if (activeTeam) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      const pageContainer = document.getElementById('events-page-scroll-container') || document.querySelector('.overflow-y-auto');
      if (pageContainer) pageContainer.scrollTop = 0;
      if (!didStartTeamDetailsFlow.current) {
        didStartTeamDetailsFlow.current = true;
        const t = setTimeout(() => startFlow('team_details'), 350);
        return () => clearTimeout(t);
      }
    }
  }, [activeTeam]); // eslint-disable-line react-hooks/exhaustive-deps

  if (activeTeam) {
    return (
      <div 
        ref={cardRef} 
        className="flex-1 min-h-0 flex flex-col relative w-full mb-1" 
        style={{ height: 'calc(100vh - 124px)', maxHeight: 'calc(100vh - 124px)' }}
      >
        {/* Upper Rectangle (Wider rectangle, length L) */}
        <div className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl rounded-bl-none p-4 flex items-center justify-between shrink-0 shadow-sm relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl border border-[#BFDBFE] bg-[#EBF3FF] flex items-center justify-center text-[#1D4ED8] font-bold text-sm shadow-sm shrink-0">
              <span>{activeTeam.name.charAt(0)}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-800">{activeTeam.name}</h3>
                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-widest ${activeTeam.status === 'Open' ? 'bg-[#EBF3FF] text-[#1D4ED8] border border-[#BFDBFE]' : 'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}>
                  {activeTeam.status}
                </span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{activeTeam.hackathon}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-slate-100/80 p-1 rounded-2xl gap-1">
              {(['Chat', 'Members', 'Requests'] as const).map(tab => {
                if (tab === 'Requests' && teamHosts[activeTeam.id] !== 'me') return null;
                const pendingCount = tab === 'Requests' ? (joinRequests[activeTeam.id] || []).filter(r => r.status === 'Pending').length : 0;
                const isActive = activeTab === tab;

                return (
                  <button
                    key={tab}
                    ref={tab === 'Chat' ? chatTabRef : undefined}
                    id={tab === 'Members' ? 'tour-team-members-btn' : undefined}
                    onClick={() => {
                      setActiveTab(tab);
                      // Tutorial progression check for Members tab
                      if (tab === 'Members') {
                        advanceStep();
                      }
                    }}
                    className={`h-9 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 select-none active:scale-[0.98] ${
                      isActive
                        ? 'bg-[#EBF3FF] text-[#1D4ED8] border border-[#BFDBFE] shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 active:bg-[#EBF3FF] active:text-[#1D4ED8]'
                    }`}
                  >
                    <span>{tab}</span>
                    {pendingCount > 0 && (
                      <span className="w-4 h-4 bg-amber-500 text-white rounded-full flex items-center justify-center text-[8px]">{pendingCount}</span>
                    )}
                  </button>
                );
              })}
            </div>

            {teamHosts[activeTeam.id] === 'me' && (
              <button
                onClick={() => {
                  const newStatus = activeTeam.status === 'Open' ? 'Closed' : 'Open';
                  setTeams(prev => prev.map(t => t.id === activeTeam.id ? { ...t, status: newStatus } : t));
                  setActiveTeam({ ...activeTeam, status: newStatus });
                }}
                className={`h-9 px-3.5 rounded-2xl text-xs font-bold transition-all border flex items-center gap-2 shadow-sm bg-white border-slate-200 hover:bg-slate-100 hover:border-slate-300 hover:text-slate-900 active:bg-[#EBF3FF] active:border-[#BFDBFE] active:scale-[0.98] ${
                  activeTeam.status === 'Open'
                    ? 'text-amber-700'
                    : 'text-[#1D4ED8]'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${activeTeam.status === 'Open' ? 'bg-amber-500' : 'bg-[#1D4ED8]'}`} />
                {activeTeam.status === 'Open' ? 'Close Team' : 'Open Team'}
              </button>
            )}
          </div>
        </div>

        {/* Lower Container — Consistent dimensions across Chat, Members, and Requests */}
        <div 
          className="flex-1 min-h-0 flex flex-col bg-white border-x border-b border-slate-200 rounded-b-2xl shadow-sm overflow-hidden relative -mt-[1px]"
          style={{
            marginLeft: 0,
            marginRight: `${lowerPanelRightMargin}px`,
          }}
        >
          {activeTab === 'Members' ? (
            <TeamMembers
              activeTeam={activeTeam}
              removedMembers={removedMembers}
              teamHosts={teamHosts}
              submittedRatings={submittedRatings}
              handleMakeHost={handleMakeHost}
              setConfirmRemoveTarget={setConfirmRemoveTarget}
              confirmRemoveTarget={confirmRemoveTarget}
              handleRemoveMember={handleRemoveMember}
              setRatingTarget={setRatingTarget}
              ratingTarget={ratingTarget}
              setRatingStars={setRatingStars}
              ratingStars={ratingStars}
              setRatingFeedback={setRatingFeedback}
              ratingFeedback={ratingFeedback}
              handleSubmitRating={handleSubmitRating}
            />
          ) : activeTab === 'Requests' ? (
            <TeamRequests
              activeTeam={activeTeam}
              joinRequests={joinRequests}
              handleAcceptRequest={handleAcceptRequest}
              handleRejectRequest={handleRejectRequest}
            />
          ) : (
            <TeamChat
              activeTeam={activeTeam}
              teamMessages={teamMessages}
              chatInput={chatInput}
              setChatInput={setChatInput}
              sendMessage={sendMessage}
              chatEndRef={chatEndRef}
            />
          )}
        </div>
      </div>
    );
  }

  if (showCreateTeamForm) return <CreateTeamForm availableEvents={availableEvents} setShowCreateTeamForm={setShowCreateTeamForm} newTeamData={newTeamData} setNewTeamData={setNewTeamData} handleCreateTeam={handleCreateTeam} />;

  if (showJoinTeamView) return <TeamDiscovery setShowJoinTeamView={setShowJoinTeamView} setShowTeamsView={setShowTeamsView} teamSearchQuery={teamSearchQuery} setTeamSearchQuery={setTeamSearchQuery} filteredTeamsPool={filteredTeamsPool} setPreviewingTeam={setPreviewingTeam} />;

  return (
    <div className="space-y-4" id="tour-my-teams-list">
      {/* Title Section (duplicate back button removed) */}
      <div className="flex items-center justify-between mb-2" id="tour-teams-header-nav">
        <div className="flex items-center gap-3" id="tour-current-teams-title">
          <div className="w-1.5 h-6 bg-[#1D4ED8] rounded-full" />
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Current Teams</h2>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#EBF3FF] rounded-xl border border-[#BFDBFE]">
          <Users2 className="w-4 h-4 text-[#1D4ED8]" />
          <span className="text-[10px] font-black text-[#1D4ED8] uppercase tracking-widest">{teams.length} Active</span>
        </div>
      </div>

      {teams.map((team, tIdx) => (
        <button
          key={team.id}
          id={tIdx === 0 ? 'tour-first-team-card' : undefined}
          onClick={() => { setActiveTeam(team); setActiveTab('Chat'); }}
          className="w-full bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-100 rounded-2xl p-5 flex items-center gap-4 hover:shadow-sm active:bg-[#EBF3FF] active:border-[#BFDBFE] transition-all group text-left active:scale-[0.99]"
        >
          <div className="w-12 h-12 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-white group-hover:border-slate-300 group-hover:text-slate-900 group-active:bg-white group-active:border-[#BFDBFE] group-active:text-[#1D4ED8] transition-all shrink-0">
            <span className="font-bold text-base">{team.name.charAt(0)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold text-slate-900 truncate group-hover:text-slate-900 group-active:text-[#1D4ED8] transition-colors">{team.name}</h3>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-wider ${team.status === 'Open' ? 'bg-[#EBF3FF] text-[#1D4ED8] border border-[#BFDBFE]' : 'bg-slate-100 text-slate-500'}`}>{team.status}</span>
            </div>
            <p className="text-xs font-medium text-slate-400 mb-2 truncate">{team.hackathon}</p>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {team.members.slice(0, 3).map((m, mIdx) => (
                  <img key={`${m.id}-${mIdx}`} src={m.avatar} alt={m.name} className="w-6 h-6 rounded-full border-2 border-white shadow-sm" />
                ))}
                {team.members.length > 3 && (
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[9px] font-bold text-slate-500">+{team.members.length - 3}</div>
                )}
              </div>
              <span className="text-xs font-semibold text-slate-700">{team.members.length} members</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 group-active:text-[#1D4ED8] group-hover:translate-x-0.5 transition-all shrink-0" />
        </button>
      ))}
    </div>
  );
};

export default TeamPortal;
