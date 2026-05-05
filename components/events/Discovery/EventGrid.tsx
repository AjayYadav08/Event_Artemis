import React from 'react';
import { CampusEvent } from '../types';
import EventCard from './EventCard';
import { parseDateTime, formatTimeDiff, formatTimeAgo } from '../utils';

interface EventGridProps {
  events: CampusEvent[];
  title: string;
  Icon: any;
  colorClass: string;
  id?: string;
  interestedIds: Set<string>;
  notInterestedIds: Set<string>;
  registeredIds: Set<string>;
  toggleInterested: (id: string) => void;
  markNotInterested: (id: string) => void;
  todayDay: number;
  now: Date;
  onExplore: (event: CampusEvent) => void;
}

const EventGrid: React.FC<EventGridProps> = ({
  events,
  title,
  Icon,
  colorClass,
  id,
  interestedIds,
  notInterestedIds,
  registeredIds,
  toggleInterested,
  markNotInterested,
  todayDay,
  now,
  onExplore
}) => {
  if (events.length === 0) return null;

  return (
    <div className="space-y-8">
      <div id={id} className="flex items-center justify-between border-b border-slate-100 pb-4 px-0">
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${colorClass.replace('bg-', 'text-')}`} />
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h2>
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{events.length} results</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map(event => {
          const isInterested = interestedIds.has(event.id);
          const isNotInterested = notInterestedIds.has(event.id);
          const isRegistered = registeredIds.has(event.id);
          let isPast = event.dayOfMonth < todayDay;
          
          const eventDate = parseDateTime(event.date, event.time);
          let timeString = null;
          let isUrgent = false;

          if (eventDate) {
            const diff = eventDate.getTime() - now.getTime();
            
            if (diff > (48 * 60 * 60 * 1000)) {
               const days = Math.ceil(diff / (24 * 60 * 60 * 1000));
               timeString = `${days} days left`;
               isUrgent = false;
            } else if (diff < 0) {
               timeString = formatTimeAgo(diff);
               isUrgent = false;
               isPast = true;
            } else {
               timeString = formatTimeDiff(diff);
               isUrgent = true;
            }
          } else if (isPast) {
             timeString = "Event ended";
             isUrgent = false;
          }

          return (
            <EventCard 
              key={event.id}
              event={event}
              isInterested={isInterested}
              isRegistered={isRegistered}
              isPast={isPast}
              isUrgent={isUrgent}
              timeString={timeString}
              onExplore={onExplore}
              toggleInterested={toggleInterested}
              markNotInterested={markNotInterested}
            />
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(EventGrid);
