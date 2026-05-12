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
    // Step 1 — Overview: introduce the Teams section from the header nav
    {
      targetId: 'tour-teams-tab',
      title: 'Welcome to Your Teams',
      content: 'This is your Teams Hub. From here you can manage your active squads, create a new team, or discover and join other teams across all events.',
      position: 'bottom'
    },
    // Step 2 — Current Teams section title
    {
      targetId: 'tour-current-teams-title',
      title: 'Current Teams',
      content: 'All squads you are part of appear here. Each card shows the team name, event, status (Open / Closed), and current member count.',
      position: 'bottom'
    },
    // Step 3 — First team card: how to open a team
    {
      targetId: 'tour-first-team-card',
      title: 'Open Your Squad',
      content: 'Click any team card to enter your squad workspace — access team chat, manage members, review join requests, and track your hackathon progress.',
      position: 'bottom'
    },
    // Step 4 — New Team button
    {
      targetId: 'tour-create-team-btn',
      title: 'Create a New Team',
      content: 'Have a vision? Hit "New Team" to create your own squad. Set expectations, define your team size, and recruit the right talent for your hackathon.',
      position: 'bottom'
    },
    // Step 5 — Join Team button
    {
      targetId: 'tour-team-search',
      title: 'Join an Existing Team',
      content: 'Browse the global teams pool and filter by event or skill. Found a great match? Send a personalized join request and wait for host approval.',
      position: 'bottom'
    },
    // Step 6 — Back to Events navigation
    {
      targetId: 'tour-back-to-events',
      title: 'Back to Events',
      content: 'Done exploring? Use this button to return to the main Events Feed at any time.',
      position: 'right'
    }
  ],
  team_details: [
    // Step 1 — Team Chat
    {
      targetId: 'tour-team-chat',
      title: 'Team Chat',
      content: 'Stay in sync with your squad in real time. Discuss strategy, share updates, and coordinate your work — all in one place.',
      position: 'top'
    },
    // Step 2 — Members tab (requires clicking to advance)
    {
      targetId: 'tour-team-members-btn',
      title: 'Squad Management',
      content: 'Switch to the Members tab to view your teammates, assign the Host role, rate collaborators, or review and manage incoming join requests.',
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
