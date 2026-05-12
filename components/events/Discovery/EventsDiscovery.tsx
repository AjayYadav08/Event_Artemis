import React from 'react';
import { Flame, Clock, History } from 'lucide-react';
import { CampusEvent } from '../types';
import SearchFilters from './SearchFilters';
import EventGrid from './EventGrid';

interface EventsDiscoveryProps {
  showTeamsView: boolean;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  activeFilter: string;
  setActiveFilter: (val: string) => void;
  setActiveNav: (val: string) => void;
  closingSoonEvents: CampusEvent[];
  upcomingEvents: CampusEvent[];
  pastEvents: CampusEvent[];
  interestedIds: Set<string>;
  notInterestedIds: Set<string>;
  registeredIds: Set<string>;
  toggleInterested: (id: string) => void;
  markNotInterested: (id: string) => void;
  todayDay: number;
  now: Date;
  onExplore: (event: CampusEvent) => void;
}

const EventsDiscovery: React.FC<EventsDiscoveryProps> = (props) => {
  const {
    showTeamsView,
    searchQuery, setSearchQuery,
    activeFilter, setActiveFilter,
    setActiveNav,
    closingSoonEvents, upcomingEvents, pastEvents,
    interestedIds, notInterestedIds, registeredIds,
    toggleInterested, markNotInterested,
    todayDay, now,
    onExplore
  } = props;

  if (showTeamsView) return null;

  return (
    <div className="space-y-12 px-8 pb-32">
      <SearchFilters 
        showTeamsView={showTeamsView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        setActiveNav={setActiveNav}
      />

      {/* SPOTLIGHT SECTION REMOVED */}

      <EventGrid 
        id="tour-closing"
        title="Closing Soon"
        Icon={Flame}
        colorClass="bg-rose-500"
        events={closingSoonEvents}
        interestedIds={interestedIds}
        notInterestedIds={notInterestedIds}
        registeredIds={registeredIds}
        toggleInterested={toggleInterested}
        markNotInterested={markNotInterested}
        todayDay={todayDay}
        now={now}
        onExplore={onExplore}
      />

      <EventGrid 
        id="tour-upcoming"
        title="Upcoming Feed"
        Icon={Clock}
        colorClass="bg-blue-600"
        events={upcomingEvents}
        interestedIds={interestedIds}
        notInterestedIds={notInterestedIds}
        registeredIds={registeredIds}
        toggleInterested={toggleInterested}
        markNotInterested={markNotInterested}
        todayDay={todayDay}
        now={now}
        onExplore={onExplore}
      />

      <EventGrid 
        id="tour-past"
        title="Past Feed"
        Icon={History}
        colorClass="bg-slate-400"
        events={pastEvents}
        interestedIds={interestedIds}
        notInterestedIds={notInterestedIds}
        registeredIds={registeredIds}
        toggleInterested={toggleInterested}
        markNotInterested={markNotInterested}
        todayDay={todayDay}
        now={now}
        onExplore={onExplore}
      />
    </div>
  );
};

export default EventsDiscovery;
