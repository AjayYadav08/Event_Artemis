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
    <div className="space-y-6">
      <div id={id} className="flex items-center justify-between border-b border-slate-100 pb-4 px-0">
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${colorClass.replace('bg-', 'text-')}`} />
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h2>
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{events.length} results</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {React.useMemo(() => events.map(event => {
          const isInterested = interestedIds.has(event.id);
          const isNotInterested = notInterestedIds.has(event.id);
          const isRegistered = registeredIds.has(event.id);
          let isPast = event.dayOfMonth < todayDay;
          
          const eventDate = parseDateTime(event.date, event.time);
          let timeString = null;
          let isUrgent = false;

          if (eventDate) {
            const diff = eventDate.getTime() - now.getTime();
            const absDiff = Math.abs(diff);
            const isToday = eventDate.toDateString() === now.toDateString();

            if (diff > 0) {
              if (isToday) {
                timeString = title === "Closing Soon" ? "Ends today" : "Starting today";
                isUrgent = true;
              } else if (diff < (24 * 60 * 60 * 1000)) {
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                timeString = `${hours}h ${mins}m left`;
                isUrgent = true;
              } else if (title === "Closing Soon") {
                const days = Math.ceil(diff / (24 * 60 * 60 * 1000));
                timeString = `${days} days left`;
                isUrgent = diff < (48 * 60 * 60 * 1000);
              } else {
                const days = Math.ceil(diff / (24 * 60 * 60 * 1000));
                timeString = `Starts in ${days} days`;
                isUrgent = false;
              }
            } else {
              isPast = true;
              if (isToday) {
                timeString = "Ended today";
              } else {
                const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
                if (days > 0) {
                  timeString = `Ended ${days} days ago`;
                } else {
                  const hours = Math.floor(absDiff / (1000 * 60 * 60));
                  timeString = `Ended ${hours} hours ago`;
                }
              }
              isUrgent = false;
            }
          } else {
            timeString = isPast ? "Event ended" : "Date pending";
            isUrgent = false;
          }

          return (
            <div 
              key={`${title}-${event.id}`} 
              style={{ 
                contentVisibility: 'auto', 
                containIntrinsicSize: '1px 500px' // Provides a rough estimate of height to prevent scroll jump
              } as React.CSSProperties}
            >
              <EventCard 
                event={event}
                isInterested={isInterested}
                isRegistered={isRegistered}
                isNotInterested={isNotInterested}
                isPast={isPast}
                isUrgent={isUrgent}
                timeString={timeString}
                onExplore={onExplore}
                toggleInterested={toggleInterested}
                markNotInterested={markNotInterested}
              />
            </div>
          );
        }), [events, interestedIds, notInterestedIds, registeredIds, now, todayDay, title, onExplore, toggleInterested, markNotInterested])}
      </div>
    </div>
  );
};

export default React.memo(EventGrid);
