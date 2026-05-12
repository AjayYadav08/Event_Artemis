import React, { useEffect } from 'react';
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

  useEffect(() => {
    if (!activeTeam && !showCreateTeamForm && !showJoinTeamView) {
      startFlow('teams');
    } else if (activeTeam) {
      startFlow('team_details');
    }
  }, [activeTeam, showCreateTeamForm, showJoinTeamView, startFlow]);

  if (activeTeam) {
    return (
      <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xl flex flex-col   -95 " style={{ height: '70vh' }}>
        {/* Chat Top Bar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setActiveTeam(null)} className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-black text-sm">{activeTeam.name.charAt(0)}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-800">{activeTeam.name}</h3>
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-widest ${activeTeam.status === 'Open' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}>
                    {activeTeam.status}
                  </span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{activeTeam.hackathon}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-slate-100 p-1 rounded-2xl mr-2">
              {(['Chat', 'Members', 'Requests'] as const).map(tab => {
                if (tab === 'Requests' && teamHosts[activeTeam.id] !== 'me') return null;
                const pendingCount = tab === 'Requests' ? (joinRequests[activeTeam.id] || []).filter(r => r.status === 'Pending').length : 0;

                return (
                  <button
                    key={tab}
                    id={tab === 'Members' ? 'tour-team-members-btn' : undefined}
                    onClick={() => {
                      setActiveTab(tab);
                      // Tutorial progression check for Members tab
                      if (tab === 'Members') {
                        advanceStep();
                      }
                    }}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    {tab}
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
                className={`px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${activeTeam.status === 'Open' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                  }`}
              >
                {activeTeam.status === 'Open' ? 'Close Team' : 'Open Team'}
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col relative">
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
    <div className="space-y-6" id="tour-my-teams-list">
      {/* Navigation & Title Section */}
      <div className="flex flex-col gap-4 mb-2" id="tour-teams-header-nav">
        <button
          id="tour-back-to-events"
          onClick={() => setShowTeamsView(false)}
          className="flex items-center gap-2 self-start px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] text-slate-500 bg-slate-50 border border-slate-100 hover:bg-white hover:border-indigo-200 hover:text-indigo-600 hover:shadow-lg transition-all group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Events Feed
        </button>

        <div className="flex items-center justify-between" id="tour-current-teams-title">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-indigo-500 rounded-full" />
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Current Teams</h2>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-xl">
            <Users2 className="w-4 h-4 text-indigo-500" />
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{teams.length} Active</span>
          </div>
        </div>
      </div>

      {teams.map((team, tIdx) => (
        <button
          key={team.id}
          id={tIdx === 0 ? 'tour-first-team-card' : undefined}
          onClick={() => { setActiveTeam(team); setActiveTab('Chat'); }}
          className="w-full bg-white border border-slate-100 rounded-3xl p-5 flex items-center gap-5 hover:border-indigo-200 hover:shadow-lg transition-all group text-left"
        >
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200/50 shrink-0 group-hover:scale-110 transition-transform">
            <span className="text-white font-black text-lg">{team.name.charAt(0)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-black text-slate-900 truncate group-hover:text-indigo-600 transition-colors">{team.name}</h3>
              <span className={`text-[8px] font-black px-2 py-0.5 rounded-lg uppercase tracking-widest ${team.status === 'Open' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>{team.status}</span>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 truncate">{team.hackathon}</p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {team.members.slice(0, 3).map((m, mIdx) => (
                  <img key={`${m.id}-${mIdx}`} src={m.avatar} alt={m.name} className="w-7 h-7 rounded-full border-2 border-white shadow-sm" />
                ))}
                {team.members.length > 3 && (
                  <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[9px] font-black text-slate-500">+{team.members.length - 3}</div>
                )}
              </div>
              <span className="text-xs font-bold text-slate-400">{team.members.length} members</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors shrink-0" />
        </button>
      ))}
    </div>
  );
};

export default TeamPortal;
