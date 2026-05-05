
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { 
  Zap, 
  Search, 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  ArrowRight, 
  Ticket, 
  CalendarDays,
  AlertCircle,
  ArrowUp,
  CalendarCheck,
  X,
  Rocket,
  ChevronRight, 
  Map as MapIcon,
  Timer,
  ThumbsDown,
  UserCheck,
  Layout,
  Heart,
  Terminal,
  Palette,
  Mic2,
  Trophy,
  ExternalLink,
  Code2,
  Cpu,
  ShieldAlert,
  Sparkles,
  MousePointer2,
  CheckCircle2,
  Image as ImageIcon,
  GraduationCap,
  ShieldCheck,
  Users2,
  Info,
  Target,
  Gift,
  Award,
  Briefcase,
  HelpCircle,
  Shield,
  Laptop,
  ChevronLeft,
  UserPlus,
  Send,
  Check,
  Flame,
  Phone,
  Mail,
  LifeBuoy,
  History,
  Camera,
  MessageCircle
} from 'lucide-react';
import { TutorialOverlay, TutorialStep } from './TutorialOverlay';

import { 
  CampusEvent, Team, TeamMember, ChatMessage, JoinRequest,
  TimelineItem, Prize, Sponsor, Judge, FAQ
} from './events/types';

export type { 
  CampusEvent, Team, TeamMember, ChatMessage, JoinRequest,
  TimelineItem, Prize, Sponsor, Judge, FAQ
};
import EventsHeader from './events/EventsHeader';
import TeamPortal from './events/TeamPortal/TeamPortal';
import EventsDiscovery from './events/Discovery/EventsDiscovery';
import EventDetailsModal from './events/Modals/EventDetailsModal';
import TeamPreviewModal from './events/Modals/TeamPreviewModal';
import SharedModals from './events/Modals/SharedModals';
import BackToTop from './events/BackToTop';
import ImageWithFallback from './events/ImageWithFallback';
import { parseDateTime } from './events/utils';

// -- Mock Helpers & Constants --
const TODAY_DAY = new Date().getDate();
const now = new Date();

const getUrgentDate = () => {
  const d = new Date();
  d.setHours(d.getHours() + 2);
  return {
    day: d.getDate(),
    dateStr: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    timeStr: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  };
};

const urgentInfo = getUrgentDate();
export const EVENTS_MOCK: CampusEvent[] = [
  {
    id: 'e_urgent_flash',
    title: 'Flash Code Sprint',
    category: 'Competition',
    type: 'Upcoming',
    date: urgentInfo.dateStr,
    dayOfMonth: urgentInfo.day,
    time: urgentInfo.timeStr,
    location: 'Server Room 404',
    xp: 5000,
    attendees: 50,
    sectionParticipants: 5,
    featured: true,
    prizePool: "₹50,000 Instant",
    tracks: ["Speed Coding", "Bug Fixing"],
    posterUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
    description: "A surprise lightning round of competitive programming. The clock is ticking, and the deadline is approaching fast.",
    jokes: ["Code faster, the server bills are due.", "Urgent? I thought you said URGENT."],
    timeline: [ { time: urgentInfo.timeStr, title: "Sprint Start", desc: "Go go go!" } ],
    venueDetails: "Server Room 404",
    eligibility: "Speedsters",
    teamSize: "Individual",
    certification: true,
    organizerContact: { phone: "+1 (555) 987-6543", email: "flash@artemis.events" }
  },
  {
    id: 'e_mumbai',
    title: 'Mumbai Developer Summit 2026',
    category: 'Competition',
    type: 'Upcoming',
    date: '15 Feb 2026',
    dayOfMonth: 15,
    time: '09:00 AM',
    location: 'IIT Bombay Campus',
    xp: 2500,
    attendees: 1200,
    sectionParticipants: 42,
    prizePool: "₹5,00,000",
    tracks: ["Web3 Foundations", "HFT Optimization", "Quantum Ready Apps"],
    posterUrl: "https://images.unsplash.com/photo-1540575467063-178cb50ee898?auto=format&fit=crop&q=80&w=1000",
    description: "The biggest tech convergence in the financial capital. From high-frequency trading algorithms to decentralized architectures. Experience the spirit of Mumbai's tech ecosystem without the traffic.",
    jokes: [
      "Mumbai jaana hai ya nahi- Take part in mumbai hacks"
    ],
    timeline: [
      { time: "09:00 AM", title: "Opening Keynote", desc: "Welcome address by industry leaders in AI and Finance." },
      { time: "11:30 AM", title: "Track A: Scalable Systems", desc: "Deep dive into distributed architectures." }
    ],
    venueDetails: "IIT Bombay Campus, Convocation Hall. Landmark: Main Building Gate No. 1.",
    eligibility: "Undergraduates & Professionals",
    teamSize: "1-4 Members",
    certification: true,
    organizerContact: { phone: "+91 22 2572 2545", email: "summit2026@iitb.ac.in" },
    gallery: [
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1614064641913-6b17fda71221?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1000"
    ]
  },
  {
    id: 'e1',
    title: 'Global AI Hackathon 2026',
    category: 'Competition',
    type: 'Live',
    date: '24 Jan 2026',
    dayOfMonth: 24,
    time: '48H Non-stop',
    location: 'Innovation Wing',
    xp: 1200,
    attendees: 420,
    sectionParticipants: 15,
    featured: true,
    prizePool: "$50,000",
    tracks: ["LLM Agents", "Computer Vision", "AI Safety", "Generative Art"],
    posterUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000",
    description: "The ultimate showdown of neural networks. Build the future of AGI in 48 hours. Dive into high-concurrency challenges and state-of-the-art inference optimization. No sleep, just code. This event brings together the brightest minds to solve real-world problems using the latest in AI technology.",
    jokes: ["AI Hackathon? Bhai, ChatGPT se copy-paste karna 'hacking' nahi hota."],
    timeline: [
      { time: "Day 1 - 08:00 AM", title: "Registration & Check-in", desc: "Get your badges, swag kits, and Wi-Fi credentials. Networking breakfast." },
      { time: "Day 1 - 10:00 AM", title: "Opening Ceremony", desc: "Keynote by Industry Leaders and Problem Statement Reveal." },
      { time: "Day 1 - 11:00 AM", title: "Hacking Starts", desc: "Official start of the 48-hour coding marathon." },
      { time: "Day 1 - 08:00 PM", title: "Mentorship Round 1", desc: "Industry experts visit tables for guidance." },
      { time: "Day 2 - 09:00 PM", title: "Code Freeze & Submission", desc: "Stop coding. Push to GitHub. Prepare for demos." }
    ],
    venueDetails: "Innovation Wing, 4th Floor Tech Park. Access via Lift B.",
    eligibility: "Open for All Students",
    teamSize: "Individual or Pairs",
    certification: true,
    prizesList: [
      { title: "Grand Winner", desc: "Best Overall AI Solution", amount: "$25,000", color: "from-amber-400 to-orange-500" },
      { title: "Runner Up", desc: "Second Place Excellence", amount: "$15,000", color: "from-slate-300 to-slate-400" },
      { title: "Innovation Award", desc: "Most creative use of LLMs", amount: "$5,000", color: "from-blue-400 to-indigo-500" },
      { title: "Student Track", desc: "Best project by undergraduates", amount: "MacBook Pros", color: "from-emerald-400 to-teal-500" }
    ],
    sponsors: [
      { name: "OpenAI", tier: "Platinum" },
      { name: "NVIDIA", tier: "Platinum" },
      { name: "Google Cloud", tier: "Gold" },
      { name: "AWS", tier: "Gold" },
      { name: "Anthropic", tier: "Silver" }
    ],
    judges: [
      { name: "Dr. Sarah Chen", role: "Head of AI", company: "DeepMind", avatarUrl: "https://i.pravatar.cc/150?img=5" },
      { name: "Alex Rivera", role: "Principal Engineer", company: "Anthropic", avatarUrl: "https://i.pravatar.cc/150?img=11" },
      { name: "Marcus Johnson", role: "VC Partner", company: "Sequoia", avatarUrl: "https://i.pravatar.cc/150?img=3" },
      { name: "Priya Patel", role: "CTO", company: "TechFlow", avatarUrl: "https://i.pravatar.cc/150?img=9" }
    ],
    rules: [
      "All code must be written during the event. Pre-existing codebases are not allowed.",
      "Teams can have a maximum of 4 members.",
      "Use of open-source libraries is encouraged, but plagiarism will lead to disqualification.",
      "Final submission must include a GitHub repo link and a 2-minute demo video.",
      "Be respectful to other participants and staff. Harassment of any kind will not be tolerated."
    ],
    faqs: [
      { q: "Do I need an idea beforehand?", a: "No! We will have an ideation session at the start of the event to help you form teams and brainstorm." },
      { q: "Is food provided?", a: "Yes, we provide breakfast, lunch, dinner, and midnight snacks for all 48 hours." },
      { q: "Can I participate remotely?", a: "This is a hybrid event. You can participate online, but in-person teams get access to hardware labs." },
      { q: "What hardware is provided?", a: "We have a limited number of GPUs available on the cloud. Bring your own laptop." }
    ],
    organizerContact: { phone: "+1 (555) 123-4567", email: "ai.hackathon@global.org" },
    gallery: [
      "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1000"
    ]
  },
  {
    id: 'e_cyber',
    title: 'Cyber Security Gauntlet',
    category: 'Competition',
    type: 'Live',
    date: '21 Jan 2026',
    dayOfMonth: 21,
    time: '12:00 PM',
    location: 'Secure Lab 7',
    xp: 800,
    attendees: 85,
    sectionParticipants: 4,
    prizePool: "Ethical Hacker Vouchers",
    tracks: ["Network Infiltration", "Cloud Security"],
    posterUrl: "https://images.unsplash.com/photo-1614064641913-6b17fda71221?auto=format&fit=crop&q=80&w=1000",
    description: "Defend your infrastructure against simulated zero-day attacks. The ultimate capture the flag event. One breach and you're out.",
    jokes: ["Your password is 'password123', isn't it? Please don't enter."],
    timeline: [{ time: "12:00 PM", title: "Breach Phase", desc: "Initial infiltration attempts start." }],
    venueDetails: "Basement Lab 7, Engineering Block.",
    eligibility: "Advanced Cybersecurity Students",
    teamSize: "Individual Only",
    certification: false,
    organizerContact: { phone: "+1 (555) 555-7890", email: "security@artemis.events" }
  },
  {
    id: 'e2',
    title: 'UI Mastery Workshop',
    category: 'Workshop',
    type: 'Upcoming',
    date: '26 Jan 2026',
    dayOfMonth: 26,
    time: '10:00 AM',
    location: 'Design Lab B',
    xp: 400,
    attendees: 120,
    sectionParticipants: 8,
    tracks: ["Figma 101", "Design Systems"],
    posterUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1000",
    description: "Sacred art of whitespace and color theory. Learn why 'making the logo bigger' is a sin and how to build components that don't break.",
    jokes: ["UI Master banega? Tera choice of colors dekh ke meri aankhein ro rahi hain."],
    timeline: [{ time: "10:00 AM", title: "Intro to Figma", desc: "Basics of layout." }],
    venueDetails: "Design Lab B, Arts Block.",
    eligibility: "Beginners to Design",
    teamSize: "No Limit",
    certification: true,
    organizerContact: { phone: "+1 (555) 111-2222", email: "design@artemis.events" }
  },
  {
    id: 'e_fintech',
    title: 'Algo-Trading Sprint',
    category: 'Competition',
    type: 'Upcoming',
    date: '29 Jan 2026',
    dayOfMonth: 29,
    time: '08:00 AM',
    location: 'Finance Hub',
    xp: 2000,
    attendees: 150,
    sectionParticipants: 12,
    prizePool: "$15,000",
    tracks: ["HFT", "Crypto Arbitrage", "Sentiment Analysis"],
    posterUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000",
    description: "Build the fastest trading bot. We provide the historical data; you provide the alpha. Warning: High variance event.",
    jokes: ["Buy high, sell low, right?", "My strategy is purely hope-based."],
    timeline: [
      { time: "08:00 AM", title: "Market Open", desc: "API keys distributed." },
      { time: "04:00 PM", title: "Market Close", desc: "Final P&L calculation." }
    ],
    venueDetails: "Finance Hub, Building C.",
    eligibility: "Quant Enthusiasts",
    teamSize: "1-3 Members",
    certification: true,
    organizerContact: { phone: "+1 (555) 333-4444", email: "fintech@artemis.events" }
  },
  {
    id: 'e_robowars',
    title: 'RoboWars 2026',
    category: 'Competition',
    type: 'Upcoming',
    date: '02 Feb 2026',
    dayOfMonth: 2,
    time: '10:00 AM',
    location: 'The Arena',
    xp: 3000,
    attendees: 800,
    sectionParticipants: 45,
    prizePool: "₹2,00,000",
    tracks: ["Deathmatch", "Obstacle Course"],
    posterUrl: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&q=80&w=1000",
    description: "Sparks, metal, and destruction. Bring your battle bots to the arena and fight for glory. Safety goggles mandatory.",
    jokes: ["It's not a bug, it's a surprise weapon.", "My robot is peaceful, said no one ever."],
    timeline: [
      { time: "10:00 AM", title: "Weigh In", desc: "Bot inspection." },
      { time: "12:00 PM", title: "Round 1", desc: "Fight!" }
    ],
    venueDetails: "Central Arena.",
    eligibility: "Engineering Teams",
    teamSize: "4-6 Members",
    certification: true,
    organizerContact: { phone: "+1 (555) 444-5555", email: "robotics@artemis.events" },
    gallery: [
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1524143986875-3b098d78b363?auto=format&fit=crop&q=80&w=1000"
    ]
  },
  {
    id: 'e_rust_workshop',
    title: 'Rust for Systems',
    category: 'Workshop',
    type: 'Upcoming',
    date: '30 Jan 2026',
    dayOfMonth: 30,
    time: '02:00 PM',
    location: 'Lab 2',
    xp: 600,
    attendees: 50,
    sectionParticipants: 10,
    tracks: ["Memory Safety", "Concurrency"],
    posterUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000",
    description: "Ditch C++. Embrace the crab. Learn memory safety without garbage collection.",
    jokes: ["I'm currently fighting the borrow checker.", "Rewrite it in Rust."],
    timeline: [{ time: "02:00 PM", title: "Hello World", desc: "Setup cargo." }],
    venueDetails: "Computer Lab 2.",
    eligibility: "CS Students",
    teamSize: "Individual",
    certification: true,
    organizerContact: { phone: "+1 (555) 555-6666", email: "rust@artemis.events" }
  },
  {
    id: 'e_music',
    title: 'Acoustic Night',
    category: 'Fest',
    type: 'Upcoming',
    date: '14 Feb 2026',
    dayOfMonth: 14,
    time: '06:00 PM',
    location: 'Amphitheatre',
    xp: 200,
    attendees: 500,
    sectionParticipants: 100,
    tracks: ["Live Music", "Open Mic"],
    posterUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1000",
    description: "Under the stars, music that heals. Bring your instruments or just your ears.",
    jokes: ["I play the triangle professionally.", "Free food? Count me in."],
    timeline: [{ time: "06:00 PM", title: "Opening Act", desc: "Local band performance." }],
    venueDetails: "Open Air Amphitheatre.",
    eligibility: "Open for All",
    teamSize: "N/A",
    certification: false,
    organizerContact: { phone: "+1 (555) 666-7777", email: "cultural@artemis.events" }
  },
  {
    id: 'e_gamejam',
    title: 'Indie Game Jam',
    category: 'Competition',
    type: 'Upcoming',
    date: '08 Feb 2026',
    dayOfMonth: 8,
    time: '48H Sprint',
    location: 'Media Lab',
    xp: 1500,
    attendees: 120,
    sectionParticipants: 20,
    prizePool: "Steam Credits",
    tracks: ["Pixel Art", "Unity", "Godot"],
    posterUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",
    description: "Make a game from scratch in 48 hours. Theme revealed at the start. Sleep is optional.",
    jokes: ["It's not a glitch, it's a feature.", "My physics engine is broken."],
    timeline: [{ time: "09:00 AM", title: "Theme Reveal", desc: "Start coding." }],
    venueDetails: "Media Lab, 3rd Floor.",
    eligibility: "Game Devs",
    teamSize: "1-4 Members",
    certification: true,
    organizerContact: { phone: "+1 (555) 777-8888", email: "gamedev@artemis.events" }
  },
  {
    id: 'e_blockchain',
    title: 'Web3 & DeFi Summit',
    category: 'Seminar',
    type: 'Upcoming',
    date: '25 Jan 2026',
    dayOfMonth: 25,
    time: '11:00 AM',
    location: 'Auditorium B',
    xp: 800,
    attendees: 200,
    sectionParticipants: 15,
    tracks: ["Smart Contracts", "DAOs"],
    posterUrl: "https://images.unsplash.com/photo-1639762681485-074b7f4ecb3c?auto=format&fit=crop&q=80&w=1000",
    description: "Understanding the future of finance. Beyond the hype of NFTs.",
    jokes: ["WAGMI", "HODL your questions till the end."],
    timeline: [{ time: "11:00 AM", title: "Keynote", desc: "Ethereum 2.0 roadmap." }],
    venueDetails: "Auditorium B.",
    eligibility: "Open for All",
    teamSize: "Individual",
    certification: true,
    organizerContact: { phone: "+1 (555) 888-9999", email: "web3@artemis.events" }
  },
  {
    id: 'e_startup',
    title: 'Student Founder Pitch',
    category: 'Competition',
    type: 'Upcoming',
    date: '10 Feb 2026',
    dayOfMonth: 10,
    time: '04:00 PM',
    location: 'Incubation Center',
    xp: 1000,
    attendees: 100,
    sectionParticipants: 8,
    prizePool: "Seed Funding",
    tracks: ["SaaS", "D2C"],
    posterUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&q=80&w=1000",
    description: "Got an idea? Pitch it to real VCs. 5 minutes to impress.",
    jokes: ["We are the Uber for Tacos.", "Pre-revenue, pre-product, post-hype."],
    timeline: [{ time: "04:00 PM", title: "Pitches Start", desc: "3 min pitch, 2 min Q&A." }],
    venueDetails: "Incubation Center.",
    eligibility: "Student Founders",
    teamSize: "1-5 Members",
    certification: false,
    organizerContact: { phone: "+1 (555) 999-0000", email: "startup@artemis.events" }
  },
  {
    id: 'e_design',
    title: 'Product Design Sprint',
    category: 'Competition',
    type: 'Upcoming',
    date: '03 Feb 2026',
    dayOfMonth: 3,
    time: '09:00 AM',
    location: 'Design Studio',
    xp: 900,
    attendees: 60,
    sectionParticipants: 12,
    prizePool: "Wacom Tablets",
    tracks: ["UX Research", "Prototyping"],
    posterUrl: "https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&q=80&w=1000",
    description: "Solve a user problem in 8 hours. Sketch, wireframe, and prototype.",
    jokes: ["Make the logo bigger.", "Comic Sans is forbidden."],
    timeline: [{ time: "09:00 AM", title: "Problem Brief", desc: "User personas." }],
    venueDetails: "Design Studio.",
    eligibility: "Designers",
    teamSize: "2-3 Members",
    certification: true,
    organizerContact: { phone: "+1 (555) 001-1111", email: "design.sprint@artemis.events" }
  },
  {
    id: 'e_datascience',
    title: 'Kaggle Masterclass',
    category: 'Workshop',
    type: 'Upcoming',
    date: '27 Jan 2026',
    dayOfMonth: 27,
    time: '03:00 PM',
    location: 'Data Lab',
    xp: 700,
    attendees: 90,
    sectionParticipants: 20,
    tracks: ["Pandas", "Scikit-Learn"],
    posterUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1000",
    description: "From CSV to predictions. Learn how to win data science competitions.",
    jokes: ["It's just linear regression in a trench coat.", "Data cleaning is 90% of the job."],
    timeline: [{ time: "03:00 PM", title: "EDA", desc: "Exploratory Data Analysis." }],
    venueDetails: "Data Lab.",
    eligibility: "Data Enthusiasts",
    teamSize: "Individual",
    certification: true,
    organizerContact: { phone: "+1 (555) 222-3333", email: "data@artemis.events" }
  },
  {
    id: 'e_drone',
    title: 'Drone Racing League',
    category: 'Competition',
    type: 'Upcoming',
    date: '18 Feb 2026',
    dayOfMonth: 18,
    time: '11:00 AM',
    location: 'Sports Field',
    xp: 1200,
    attendees: 400,
    sectionParticipants: 8,
    prizePool: "DJI Gear",
    tracks: ["FPV Racing"],
    posterUrl: "https://images.unsplash.com/photo-1524143986875-3b098d78b363?auto=format&fit=crop&q=80&w=1000",
    description: "High speed FPV drone racing through obstacle courses.",
    jokes: ["I believe I can fly... into a tree.", "Propellers are sharp."],
    timeline: [{ time: "11:00 AM", title: "Qualifiers", desc: "Time trials." }],
    venueDetails: "College Sports Field.",
    eligibility: "Licensed Pilots",
    teamSize: "Individual",
    certification: true,
    organizerContact: { phone: "+1 (555) 444-6666", email: "drone@artemis.events" }
  },
  {
    id: 'e_cloud',
    title: 'AWS DeepRacer',
    category: 'Competition',
    type: 'Upcoming',
    date: '12 Feb 2026',
    dayOfMonth: 12,
    time: '10:00 AM',
    location: 'Main Hall',
    xp: 1800,
    attendees: 150,
    sectionParticipants: 10,
    prizePool: "AWS Credits",
    tracks: ["Reinforcement Learning"],
    posterUrl: "https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&fit=crop&q=80&w=1000",
    description: "Train a reinforcement learning model to drive a car around a track autonomously.",
    jokes: ["My model drives better than me.", "Reward function hacking."],
    timeline: [{ time: "10:00 AM", title: "Model Upload", desc: "Testing on track." }],
    venueDetails: "Main Hall.",
    eligibility: "CS Students",
    teamSize: "Individual",
    certification: true,
    organizerContact: { phone: "+1 (555) 555-7777", email: "cloud@artemis.events" }
  }
];

export const MOCK_TEAMS: Team[] = [
  {
    id: 't1',
    name: 'Neural Knights',
    hackathon: 'Global AI Hackathon',
    description: 'Building LLM-powered agents for automated code review.',
    maxMembers: 4,
    status: 'Open',
    members: [
      { id: 'me', name: 'Ajay Yadav', role: 'Team Lead', skills: ['Full-Stack', 'Python'], avatar: 'https://i.pravatar.cc/150?img=12' },
      { id: 'm2', name: 'Sarah Chen', role: 'AI Engineer', skills: ['PyTorch', 'NLP'], avatar: 'https://i.pravatar.cc/150?img=45' }
    ],
    messages: [
      { id: '1', senderId: 'm2', senderName: 'Sarah', text: 'Hey team! Just finished the baseline model.', timestamp: '10:30 AM', isMe: false },
      { id: '2', senderId: 'me', senderName: 'Ajay', text: 'Awesome! I am working on the frontend integration.', timestamp: '10:35 AM', isMe: true }
    ]
  }
];

export const MOCK_TEAMS_POOL: Team[] = [
  {
    id: 'tp1',
    name: 'Byte Busters',
    hackathon: 'Flash Code Sprint',
    description: 'Fast and efficient bug hunters.',
    maxMembers: 3,
    status: 'Open',
    members: [
      { id: 'u1', name: 'Mike Ross', role: 'Lead', skills: ['C++', 'Rust'], avatar: 'https://i.pravatar.cc/150?img=33' }
    ],
    messages: []
  },
  {
    id: 'tp2',
    name: 'Design Dynamos',
    hackathon: 'Global AI Hackathon',
    description: 'Creating the most intuitive UI for AI.',
    maxMembers: 5,
    status: 'Open',
    members: [
      { id: 'u2', name: 'Elena Gilbert', role: 'UI/UX', skills: ['Figma', 'React'], avatar: 'https://i.pravatar.cc/150?img=22' }
    ],
    messages: []
  }
];export const PEERS_MOCK = [
  { id: 'p1', name: 'Zoe Kravitz', role: 'Full-Stack', avatar: 'https://i.pravatar.cc/150?img=32' },
  { id: 'p2', name: 'Robert Pattinson', role: 'DevOps', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: 'p3', name: 'Lily Rose', role: 'UI/UX', avatar: 'https://i.pravatar.cc/150?img=25' },
  { id: 'p4', name: 'Timothee Chalamet', role: 'AI Engineer', avatar: 'https://i.pravatar.cc/150?img=18' }
];


interface EventsPageProps {
  selectedDate: number | null;
  isCalendarOpen: boolean;
  interestedIds: Set<string>;
  notInterestedIds: Set<string>;
  registeredIds: Set<string>;
  toggleInterested: (id: string) => void;
  markNotInterested: (id: string) => void;
  handleRegister: (id: string) => void;
  externalExploringId?: string | null;
  onCloseExternalExplorer?: () => void;
  onDetailsToggle?: (isOpen: boolean) => void;
  onEventView?: (id: string) => void;
  viewedEventIds: Set<string>;
}

export const EventsPage: React.FC<EventsPageProps> = ({ 
  selectedDate, 
  isCalendarOpen, 
  interestedIds, 
  notInterestedIds,
  registeredIds,
  toggleInterested,
  markNotInterested,
  handleRegister,
  externalExploringId,
  onCloseExternalExplorer,
  onDetailsToggle,
  onEventView,
  viewedEventIds
}) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('tour-closing');
  const [exploringEvent, setExploringEvent] = useState<CampusEvent | null>(null);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Teams feature state
  const [showTeamsView, setShowTeamsView] = useState(false);
  const [teams, setTeams] = useState<Team[]>(MOCK_TEAMS);
  const [activeTeam, setActiveTeam] = useState<Team | null>(null);
  const [showTeamMembers, setShowTeamMembers] = useState(false);
  const [showCreateTeamForm, setShowCreateTeamForm] = useState(false);
  const [showJoinTeamView, setShowJoinTeamView] = useState(false);
  const [discoverySearchQuery, setDiscoverySearchQuery] = useState('');
  const [newTeamData, setNewTeamData] = useState({
    name: '',
    hackathon: '',
    description: '',
    maxMembers: 4
  });
  const [chatInput, setChatInput] = useState('');
  const [teamMessages, setTeamMessages] = useState<Record<string, ChatMessage[]>>(
    MOCK_TEAMS.reduce((acc, t) => ({ ...acc, [t.id]: t.messages }), {} as Record<string, ChatMessage[]>)
  );
  const chatEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = useCallback(() => {
    if (!chatInput.trim() || !activeTeam) return;
    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: 'me',
      senderName: 'Ajay',
      text: chatInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };
    setTeamMessages(prev => ({ ...prev, [activeTeam.id]: [...(prev[activeTeam.id] || []), newMsg] }));
    setChatInput('');
  }, [chatInput, activeTeam]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [teamMessages, activeTeam]);

  // Host & Rating state
  const [teamHosts, setTeamHosts] = useState<Record<string, string>>(
    MOCK_TEAMS.reduce((acc, t) => ({ ...acc, [t.id]: 'me' }), {} as Record<string, string>)
  );
  const [removedMembers, setRemovedMembers] = useState<Record<string, Set<string>>>({});
  const [confirmRemoveTarget, setConfirmRemoveTarget] = useState<string | null>(null);
  const [ratingTarget, setRatingTarget] = useState<string | null>(null);
  const [ratingStars, setRatingStars] = useState(0);
  const [ratingFeedback, setRatingFeedback] = useState('');

  // Join Request State
  const [joinRequests, setJoinRequests] = useState<Record<string, JoinRequest[]>>({});
  const [previewingTeam, setPreviewingTeam] = useState<Team | null>(null);
  const [joinRequestMessage, setJoinRequestMessage] = useState('');
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [requestSentToast, setRequestSentToast] = useState(false);
  const [activeTab, setActiveTab] = useState<'Chat' | 'Members' | 'Requests'>('Chat');
  const [submittedRatings, setSubmittedRatings] = useState<Record<string, { stars: number; feedback: string }>>({});
  const [ratingToast, setRatingToast] = useState(false);

  const isHost = activeTeam ? teamHosts[activeTeam.id] === 'me' : false;

  const handleRemoveMember = useCallback((teamId: string, memberId: string) => {
    setRemovedMembers(prev => {
      const s = new Set(prev[teamId] || []);
      s.add(memberId);
      return { ...prev, [teamId]: s };
    });
  }, []);

  const handleMakeHost = useCallback((teamId: string, memberId: string) => {
    setTeamHosts(prev => ({ ...prev, [teamId]: memberId }));
  }, []);

  const handleSubmitRating = useCallback(() => {
    if (!ratingTarget || ratingStars === 0) return;
    setSubmittedRatings(prev => ({ ...prev, [ratingTarget]: { stars: ratingStars, feedback: ratingFeedback } }));
    setRatingTarget(null);
    setRatingStars(0);
    setRatingFeedback('');
    setRatingToast(true);
    setTimeout(() => setRatingToast(false), 2500);
  }, [ratingTarget, ratingStars, ratingFeedback]);

  const handleSendJoinRequest = (team: Team) => {
    setIsSendingRequest(true);
    setTimeout(() => {
      const newRequest: JoinRequest = {
        id: `req_${Date.now()}`,
        teamId: team.id,
        userId: 'me',
        userName: 'Ajay Yadav',
        userAvatar: 'https://i.pravatar.cc/150?img=12',
        message: joinRequestMessage.trim() || `Hi, I'd like to join ${team.name}!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Pending'
      };
      
      setJoinRequests(prev => ({
        ...prev,
        [team.id]: [...(prev[team.id] || []), newRequest]
      }));
      
      setIsSendingRequest(false);
      setJoinRequestMessage('');
      setPreviewingTeam(null);
      setRequestSentToast(true);
      setTimeout(() => setRequestSentToast(false), 3000);
    }, 800);
  };

  const handleAcceptRequest = (request: JoinRequest) => {
    const team = teams.find(t => t.id === request.teamId);
    if (!team) return;

    // Add member to team
    const newMember: TeamMember = {
      id: request.userId,
      name: request.userName,
      avatar: request.userAvatar,
      role: 'Contributor',
      skills: ['New Member']
    };

    setTeams(prev => prev.map(t => 
      t.id === team.id ? { ...t, members: [...t.members, newMember] } : t
    ));

    // Update request status
    setJoinRequests(prev => ({
      ...prev,
      [team.id]: (prev[team.id] || []).map(r => 
        r.id === request.id ? { ...r, status: 'Accepted' } : r
      )
    }));
  };

  const handleRejectRequest = (request: JoinRequest) => {
    setJoinRequests(prev => ({
      ...prev,
      [request.teamId]: (prev[request.teamId] || []).map(r => 
        r.id === request.id ? { ...r, status: 'Rejected' } : r
      )
    }));
  };

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop > 300) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  }, []);

  const scrollToTop = useCallback(() => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  const [now, setNow] = useState(new Date());

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPeersModal, setShowPeersModal] = useState(false);
  
  const [showTutorial, setShowTutorial] = useState(false);
  
  const [invitedPeersMap, setInvitedPeersMap] = useState<Record<string, Set<string>>>({});

  const isRegistered = exploringEvent ? registeredIds.has(exploringEvent.id) : false;
  const isInterested = exploringEvent ? interestedIds.has(exploringEvent.id) : false;
  const isNotInterested = exploringEvent ? notInterestedIds.has(exploringEvent.id) : false;
  const isExploringEventPast = exploringEvent ? exploringEvent.dayOfMonth < TODAY_DAY : false;

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tutorialDone = localStorage.getItem('campus_pilot_tutorial_done');
    if (!tutorialDone) {
      const timer = setTimeout(() => setShowTutorial(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    localStorage.setItem('campus_pilot_tutorial_done', 'true');
  };

  useEffect(() => {
    if (externalExploringId) {
      const event = EVENTS_MOCK.find(e => e.id === externalExploringId);
      if (event) {
        setExploringEvent(event);
        onEventView?.(event.id);
      }
    }
  }, [externalExploringId, onEventView]);

  useEffect(() => {
    onDetailsToggle?.(!!exploringEvent);
    return () => onDetailsToggle?.(false);
  }, [exploringEvent, onDetailsToggle]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeExplorer();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const closeExplorer = useCallback(() => {
    setExploringEvent(null);
    onCloseExternalExplorer?.();
    setShowConfirmModal(false);
    setShowSuccessModal(false);
    setShowPeersModal(false);
  }, [onCloseExternalExplorer]);

  const handleInvitePeer = useCallback((peerId: string) => {
    if (!exploringEvent) return;
    setInvitedPeersMap(prev => {
      const current = prev[exploringEvent.id] || new Set();
      const next = new Set(current);
      next.add(peerId);
      return { ...prev, [exploringEvent.id]: next };
    });
  }, [exploringEvent]);

  const confirmRegistration = useCallback(() => {
    if (!exploringEvent) return;
    handleRegister(exploringEvent.id);
    setShowConfirmModal(false);
    setShowSuccessModal(true);
  }, [exploringEvent, handleRegister]);

  const filteredData = useMemo(() => {
    return EVENTS_MOCK.filter(e => {
      const matchesCategory = activeFilter === 'All' || e.category === activeFilter;
      const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDate = selectedDate ? e.dayOfMonth === selectedDate : true;
      return matchesCategory && matchesSearch && matchesDate;
    });
  }, [activeFilter, searchQuery, selectedDate]);

  const categories = useMemo(() => {
    const nearDeadline = filteredData.filter(e => e.dayOfMonth >= TODAY_DAY && e.dayOfMonth <= TODAY_DAY + 3);
    const upcoming = filteredData.filter(e => e.dayOfMonth > TODAY_DAY + 3);
    const past = filteredData.filter(e => e.dayOfMonth < TODAY_DAY);
    return { nearDeadline, upcoming, past };
  }, [filteredData]);

  const onRegisterClick = () => {
    setShowConfirmModal(true);
  };


  const handleCreateTeam = () => {
    if (!newTeamData.name || !newTeamData.hackathon) return;
    const nt: Team = {
      id: `t_${Date.now()}`,
      name: newTeamData.name,
      hackathon: newTeamData.hackathon,
      description: newTeamData.description,
      maxMembers: newTeamData.maxMembers,
      status: 'Open',
      members: [
        { id: 'me', name: 'Ajay Yadav', role: 'Team Lead', skills: ['Full-Stack'], avatar: 'https://i.pravatar.cc/150?img=12' }
      ],
      messages: []
    };
    setTeams([...teams, nt]);
    setTeamHosts(prev => ({...prev, [nt.id]: 'me'}));
    setShowCreateTeamForm(false);
    setNewTeamData({ name: '', hackathon: '', description: '', maxMembers: 4 });
  };

  const tutorialSteps: TutorialStep[] = [
    {
      targetId: 'tour-filter',
      title: 'Smart Filters',
      content: 'Use these filters to quickly find specific types of events like Hackathons, Workshops, or Fests.',
      position: 'bottom'
    },
    {
      targetId: 'tour-closing',
      title: 'Closing Soon',
      content: 'These events are starting or closing registration soon. Act fast to secure your spot!',
      position: 'top'
    },
    {
      targetId: 'tour-upcoming',
      title: 'Upcoming Events',
      content: 'Browse all future events here. Plan your schedule ahead of time.',
      position: 'top'
    },
    {
      targetId: 'tour-past',
      title: 'Past Archives',
      content: 'View previous events to see what you missed or check out winners and galleries.',
      position: 'top'
    }
  ];

  return (
    <div 
      ref={scrollContainerRef}
      onScroll={handleScroll}
      style={{ willChange: 'transform' }}
      className={`flex-1 flex flex-col transition-all pb-32 ${isCalendarOpen ? 'pr-[320px]' : ''} max-w-7xl mx-auto w-full`}
    >
      
      {showTutorial && (
        <TutorialOverlay 
          steps={tutorialSteps} 
          onClose={handleTutorialComplete} 
          onComplete={handleTutorialComplete} 
        />
      )}

      <EventsHeader 
        showTeamsView={showTeamsView}
        setShowTeamsView={setShowTeamsView}
        setActiveTeam={setActiveTeam}
        setShowTeamMembers={setShowTeamMembers}
        setShowCreateTeamForm={setShowCreateTeamForm}
        setShowJoinTeamView={setShowJoinTeamView}
        teams={teams}
        showCreateTeamForm={showCreateTeamForm}
        showJoinTeamView={showJoinTeamView}
      />

      {showTeamsView && (
        <div className="px-4 mt-6    ">
          <TeamPortal 
            activeTeam={activeTeam}
            setActiveTeam={setActiveTeam}
            showCreateTeamForm={showCreateTeamForm}
            setShowCreateTeamForm={setShowCreateTeamForm}
            showJoinTeamView={showJoinTeamView}
            setShowJoinTeamView={setShowJoinTeamView}
            teams={teams}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            teamHosts={teamHosts}
            joinRequests={joinRequests}
            setTeams={setTeams}
            removedMembers={removedMembers}
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
            teamMessages={teamMessages}
            chatInput={chatInput}
            setChatInput={setChatInput}
            sendMessage={sendMessage}
            chatEndRef={chatEndRef}
            handleAcceptRequest={handleAcceptRequest}
            handleRejectRequest={handleRejectRequest}
            teamSearchQuery={discoverySearchQuery}
            setTeamSearchQuery={setDiscoverySearchQuery}
            filteredTeamsPool={MOCK_TEAMS_POOL}
            setPreviewingTeam={setPreviewingTeam}
            newTeamData={newTeamData}
            setNewTeamData={setNewTeamData}
            handleCreateTeam={handleCreateTeam}
          />
        </div>
      )}

      {!showTeamsView && (
        <EventsDiscovery 
          showTeamsView={showTeamsView}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          setActiveNav={setActiveNav}
          closingSoonEvents={categories.nearDeadline}
          upcomingEvents={categories.upcoming}
          pastEvents={categories.past}
          interestedIds={interestedIds}
          notInterestedIds={notInterestedIds}
          registeredIds={registeredIds}
          toggleInterested={toggleInterested}
          markNotInterested={markNotInterested}
          todayDay={TODAY_DAY}
          now={now}
          onExplore={(e) => { setExploringEvent(e); onEventView?.(e.id); }}
        />
      )}

      {exploringEvent && (
        <EventDetailsModal 
          exploringEvent={exploringEvent}
          closeExplorer={closeExplorer}
          isExploringEventPast={exploringEvent.dayOfMonth < TODAY_DAY}
          isRegistered={registeredIds.has(exploringEvent.id)}
          setShowPeersModal={setShowPeersModal}
          onRegisterClick={onRegisterClick}
          isInterested={interestedIds.has(exploringEvent.id)}
          toggleInterested={toggleInterested}
          isNotInterested={notInterestedIds.has(exploringEvent.id)}
          markNotInterested={markNotInterested}
        />
      )}

      {previewingTeam && (
        <TeamPreviewModal 
          previewingTeam={previewingTeam}
          setPreviewingTeam={setPreviewingTeam}
          joinRequestMessage={joinRequestMessage}
          setJoinRequestMessage={setJoinRequestMessage}
          isSendingRequest={isSendingRequest}
          handleSendJoinRequest={handleSendJoinRequest}
        />
      )}

      <SharedModals 
        showConfirmModal={showConfirmModal}
        setShowConfirmModal={setShowConfirmModal}
        exploringEvent={exploringEvent}
        confirmRegistration={confirmRegistration}
        showSuccessModal={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
        setShowPeersModal={setShowPeersModal}
        showPeersModal={showPeersModal}
        invitedPeersMap={invitedPeersMap}
        onInvitePeer={handleInvitePeer}
        PEERS_MOCK={PEERS_MOCK}
      />

      {/* Request Sent Toast */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[2500] transition-all  ${
        requestSentToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        <div className="bg-slate-900 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-4">
          <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center">
             <Check className="w-5 h-5" />
          </div>
          <div>
             <p className="text-sm font-bold">Request Sent!</p>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wait for host approval</p>
          </div>
        </div>
      </div>
    </div>
  );
};
