
import React, { useEffect, useState } from 'react';

interface LoginPageProps {
  onLogin: () => void;
  loadingText?: string;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, loadingText = "Initializing Dashboard..." }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Auto-login sequence simulation
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Non-linear progress for realism
        const increment = Math.random() * 12; // Slightly smoother increments
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Slight pause at 100% before triggering exit animation
      const timeout = setTimeout(() => {
        setIsExiting(true);
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  useEffect(() => {
    if (isExiting) {
      // Wait for exit animation to complete before calling onLogin (which unmounts this component)
      const timeout = setTimeout(() => {
        onLogin();
      }, 1000); // Must match CSS duration
      return () => clearTimeout(timeout);
    }
  }, [isExiting, onLogin]);

  return (
    <div className={`h-screen w-full bg-[#fcfdfe] flex items-center justify-center relative overflow-hidden font-sans selection:bg-blue-100 transition-all  ease-[cubic-bezier(0.645,0.045,0.355,1)] ${isExiting ? 'opacity-0 scale-105 filter blur-lg' : 'opacity-100 scale-100 blur-0'}`}>
       {/* Light Theme Background Elements - Matching Main App */}
       <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-100/50 rounded-full blur-[120px] animate-pulse" />
       <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-[100px]" />
       
       <div className="relative z-10 flex flex-col items-center    ">
          {/* Natively Recreated Logo Integration with Interactive Fill */}
          <div className="relative overflow-hidden rounded-[3rem] px-16 py-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white/60 bg-white/40 backdrop-blur-xl mb-4    ">
            {/* Rectangular Fill Overlay (Background) */}
            <div 
              className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 transition-all  ease-out z-0"
              style={{ width: `${progress}%` }}
            />
            {/* Glowing Edge Line */}
            <div 
              className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-blue-500/40 to-transparent transition-all  ease-out z-0 shadow-[0_0_20px_rgba(59,130,246,0.6)]"
              style={{ left: `calc(${progress}% - 1px)` }}
            />

            <div 
              className="relative z-10 flex flex-col items-center transition-transform  ease-out"
              style={{ transform: `scale(${1 + (progress / 100) * 0.1})` }}
            >
              <div className="flex items-center relative">
                {/* Vector Logo Mark */}
                <div className="relative flex-shrink-0 animate-pulse drop-shadow-xl" style={{ animationDuration: '3s' }}>
                  <svg width="130" height="130" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="logo-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#2563EB" />
                        <stop offset="50%" stopColor="#4F46E5" />
                        <stop offset="100%" stopColor="#9333EA" />
                      </linearGradient>
                      <linearGradient id="sparkle-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#c084fc" />
                      </linearGradient>
                      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    <g filter="url(#glow)">
                      {/* Primary Sparkle */}
                      <path d="M 45 5 Q 45 25 65 25 Q 45 25 45 45 Q 45 25 25 25 Q 45 25 45 5 Z" fill="url(#sparkle-gradient)" />
                      {/* Secondary Sparkle */}
                      <path d="M 75 30 Q 75 40 85 40 Q 75 40 75 50 Q 75 40 65 40 Q 75 40 75 30 Z" fill="url(#sparkle-gradient)" />

                      {/* The 'A' Framework */}
                      <path d="M 20 100 L 50 30 L 80 100" stroke="url(#logo-gradient)" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      
                      {/* The Swoosh */}
                      <path d="M 10 75 Q 50 95 105 45" stroke="url(#logo-gradient)" strokeWidth="14" strokeLinecap="round" fill="none" />
                    </g>
                  </svg>
                </div>

                {/* Vertical Separator */}
                <div className="w-[2px] h-[75px] bg-slate-200 mx-6 rounded-full shadow-sm"></div>

                {/* Branding Typography */}
                <div className="flex flex-col justify-center text-left pt-2">
                  <span className="text-[52px] leading-[0.85] font-black text-[#0B132B] tracking-tight">event</span>
                  <span className="text-[52px] leading-[1.1] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 tracking-tight">artemis</span>
                </div>
              </div>

              {/* Subtitle Track */}
              <div className="flex items-center gap-4 mt-6 opacity-90">
                 <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-blue-500 rounded-full"></div>
                 <span className="text-[11px] font-bold tracking-[0.3em] text-[#0B132B] uppercase">Discover Events. Create Memories.</span>
                 <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-purple-500 rounded-full"></div>
              </div>
            </div>
          </div>
       </div>
    </div>
  );
};
