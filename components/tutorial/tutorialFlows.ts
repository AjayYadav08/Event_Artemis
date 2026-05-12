import { TutorialStep } from '../TutorialOverlay';

export type FlowId = 'homepage' | 'teams' | 'team_details' | 'event_details' | 'calendar';

export const TUTORIAL_FLOWS: Record<FlowId, TutorialStep[]> = {
  homepage: [
    {
      targetId: 'tour-search-bar',
      title: 'Integrated Search & Filters',
      content: 'Experience our powerful new search. Categories like Competition, Workshop, and Fest are now conveniently tucked inside the Filter dropdown on the right.',
      position: 'bottom'
    },
    {
      targetId: 'tour-closing',
      title: 'Closing Soon',
      content: "The 'Closing Soon' feed keeps you on your toes with events ending within 48 hours. Don't let these opportunities slip away!",
      position: 'top'
    },
    {
      targetId: 'tour-upcoming',
      title: 'Upcoming Feed',
      content: 'Our primary feed showcases the most exciting upcoming hackathons and events, tailored to your interests.',
      position: 'top'
    },
    {
      targetId: 'tour-past',
      title: 'Past Feed',
      content: 'Missed something? The Past Feed lets you explore completed events, view rankings, and check out historical prize pools.',
      position: 'top'
    },
    {
      targetId: 'tour-calendar',
      title: 'AI Calendar Assistant',
      content: 'Our intelligent Calendar assistant helps you track deadlines. It marks dates for events you are interested in or registered for.',
      position: 'top'
    },
    {
      targetId: 'tour-teams-tab',
      title: 'Your Teams Portal',
      content: 'Take collaboration to the next level. Switch to the Teams view to manage your current squads or find new teammates.',
      position: 'bottom',
      requiresAction: true,
    }
  ],
  teams: [
    {
      targetId: 'tour-team-search',
      title: 'Join a Squad',
      content: 'Explore the global teams pool, filter by event, and send join requests with personalized expectations to find your perfect match.',
      position: 'bottom'
    },
    {
      targetId: 'tour-create-team-btn',
      title: 'Lead a Mission',
      content: 'Have a vision? Create your own team, set your expectations, and recruit top talent from the community.',
      position: 'bottom'
    },
    {
      targetId: 'tour-my-teams-list',
      title: 'Operations Hub',
      content: 'Your central command for all active squads. Access chat, member management, and event details here.',
      position: 'top'
    }
  ],
  team_details: [
    {
      targetId: 'tour-team-chat',
      title: 'Real-time Coordination',
      content: 'Communicate with your squad instantly. Discuss strategy, share resources, and keep everyone in the loop.',
      position: 'left'
    },
    {
      targetId: 'tour-team-members-btn',
      title: 'Squad Management',
      content: 'The ultimate control center. View member profiles, assign roles, and review incoming join requests to keep your team sharp.',
      position: 'bottom',
      requiresAction: true
    }
  ],
  event_details: [
    {
      targetId: 'tour-event-overview',
      title: 'Mission Deep-Dive',
      content: 'Explore the full event description, rules, and detailed schedules for every hackathon or workshop.',
      position: 'bottom'
    },
    {
      targetId: 'tour-event-essentials',
      title: 'The Numbers',
      content: 'Check eligibility, team constraints, prize pools, and registration fees at a glance.',
      position: 'left'
    },
    {
      targetId: 'tour-event-register',
      title: 'Ready for Lift-off?',
      content: 'Register instantly or save the mission to your "Interested" list for later coordination.',
      position: 'bottom'
    }
  ],
  calendar: [
    {
      targetId: 'tour-cal-event-dot',
      title: 'Mission Dates',
      content: 'Days with a pulse indicate active events. Tap to see which missions are live!',
      position: 'bottom'
    },
    {
      targetId: 'tour-cal-interested',
      title: 'Your Watchlist',
      content: 'Events you are interested in are highlighted with an indigo border. Keep an eye on them!',
      position: 'bottom'
    },
    {
      targetId: 'tour-cal-registered',
      title: 'Active Duty',
      content: 'Solid highlights mean you are officially registered. Prepare for the challenge!',
      position: 'bottom'
    }
  ]
};
