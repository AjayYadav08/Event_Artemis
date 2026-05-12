import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronRight, AlertCircle, MousePointer2 } from 'lucide-react';
import { useTutorial } from './tutorial/TutorialContext';
import { TUTORIAL_FLOWS } from './tutorial/tutorialFlows';

export interface TutorialStep {
  targetId: string;
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  requiresAction?: boolean;
}

export const TutorialOverlay: React.FC = () => {
  const { activeFlow, currentStepIndex, advanceStep, skipFlow } = useTutorial();
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const reqRef = useRef<number | null>(null);

  const steps = activeFlow ? TUTORIAL_FLOWS[activeFlow] : [];
  const step = activeFlow ? steps[currentStepIndex] : null;

  const updateRect = () => {
    if (!step) return;
    const element = document.getElementById(step.targetId);
    if (element) {
      const newRect = element.getBoundingClientRect();
      setRect(prev => {
        if (!prev || Math.abs(prev.top - newRect.top) > 0.5 || Math.abs(prev.left - newRect.left) > 0.5 || prev.width !== newRect.width) {
          return newRect;
        }
        return prev;
      });
    } else {
      setRect(null);
    }
  };

  useLayoutEffect(() => {
    if (!activeFlow || !step) return;
    
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const element = document.getElementById(step.targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }

    const loop = () => {
      updateRect();
      reqRef.current = requestAnimationFrame(loop);
    };
    loop();

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      updateRect();
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', updateRect, true);

    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', updateRect, true);
    };
  }, [activeFlow, currentStepIndex, step?.targetId]);

  if (!activeFlow || !step) return null;

  // --- Fallback for missing elements: Centered Modal ---
  if (!rect) {
    return createPortal(
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm  ">
         <div className="bg-white p-8 rounded-[32px] shadow-2xl max-w-sm w-full m-4 border border-slate-100 flex flex-col gap-4  -95 duration-200">
             <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs shadow-sm">
                     {currentStepIndex + 1}/{steps.length}
                   </div>
                   <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">{step.title}</h3>
                </div>
                <button onClick={skipFlow} className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-50 rounded-full transition-colors">
                  <X className="w-4 h-4" />
                </button>
             </div>
             
             <p className="text-sm text-slate-600 leading-relaxed font-medium">
               {step.content}
             </p>
             
             {/* Note for missing element */}
             <div className="bg-amber-50 text-amber-600 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border border-amber-100">
                <AlertCircle className="w-4 h-4" />
                <span>Focus element not visible in current view.</span>
             </div>

             <div className="flex gap-3 mt-2">
               <button onClick={skipFlow} className="flex-1 py-3 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors">
                  Skip
               </button>
               {!step.requiresAction && (
                 <button onClick={advanceStep} className="flex-1 py-3 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-black transition-all shadow-lg shadow-slate-200">
                    {currentStepIndex === steps.length - 1 ? 'Finish' : 'Next'} 
                 </button>
               )}
             </div>
         </div>
      </div>,
      document.body
    );
  }

  // --- Normal Flow: Highlight & Tooltip ---
  const TOOLTIP_WIDTH = 320;
  const TOOLTIP_MIN_HEIGHT = 200; 
  const GAP = 16;
  const PADDING = 20; // Increased padding for safer margins
  const { width: vw, height: vh } = windowSize;

  let placement = step.position || 'bottom';

  // Smart repositioning logic: check if the preferred placement fits
  const canFit = (p: string) => {
    if (p === 'top') {
      // Extra safety: if the element is already near the top, don't even try top placement
      if (rect.top < 120) return false;
      return rect.top - TOOLTIP_MIN_HEIGHT - GAP - PADDING >= 0;
    }
    if (p === 'bottom') return rect.bottom + TOOLTIP_MIN_HEIGHT + GAP + PADDING <= vh;
    if (p === 'left') return rect.left - TOOLTIP_WIDTH - GAP - PADDING >= 0;
    if (p === 'right') return rect.right + TOOLTIP_WIDTH + GAP + PADDING <= vw;
    return true;
  };

  type Placement = 'top' | 'bottom' | 'left' | 'right';
  if (!canFit(placement)) {
    // Try opposite first
    const opposites: Record<string, Placement> = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };
    if (canFit(opposites[placement])) {
      placement = opposites[placement];
    } else {
      // Find any that fits
      const fallbacks: Placement[] = ['bottom', 'top', 'right', 'left'];
      for (const f of fallbacks) {
        if (canFit(f)) {
          placement = f;
          break;
        }
      }
    }
  }

  // Final emergency check for narrow viewports
  if (vw < (TOOLTIP_WIDTH + PADDING * 2)) {
    placement = rect.top > vh / 2 ? 'top' : 'bottom';
  }

  const tooltipStyle: React.CSSProperties = {
    position: 'fixed',
    width: `${TOOLTIP_WIDTH}px`,
    zIndex: 10001,
    transition: 'opacity 0.2s',
  };

  const arrowStyle: React.CSSProperties = {
    position: 'absolute',
    width: '12px',
    height: '12px',
    backgroundColor: 'white',
    transform: 'rotate(45deg)',
    zIndex: 10002,
  };

  const borderStyle = '1px solid rgba(255,255,255,0.2)'; 

  if (placement === 'top') {
    tooltipStyle.bottom = (vh - rect.top) + GAP;
    let left = rect.left + (rect.width / 2) - (TOOLTIP_WIDTH / 2);
    left = Math.max(PADDING, Math.min(left, vw - TOOLTIP_WIDTH - PADDING));
    tooltipStyle.left = left;
    arrowStyle.bottom = '-6px';
    arrowStyle.left = Math.max(10, Math.min(TOOLTIP_WIDTH - 22, (rect.left + rect.width / 2) - left - 6));
    arrowStyle.borderBottom = borderStyle;
    arrowStyle.borderRight = borderStyle;

  } else if (placement === 'bottom') {
    tooltipStyle.top = rect.bottom + GAP;
    let left = rect.left + (rect.width / 2) - (TOOLTIP_WIDTH / 2);
    left = Math.max(PADDING, Math.min(left, vw - TOOLTIP_WIDTH - PADDING));
    tooltipStyle.left = left;
    arrowStyle.top = '-6px';
    arrowStyle.left = Math.max(10, Math.min(TOOLTIP_WIDTH - 22, (rect.left + rect.width / 2) - left - 6));
    arrowStyle.borderTop = borderStyle;
    arrowStyle.borderLeft = borderStyle;

  } else if (placement === 'left') {
    tooltipStyle.right = (vw - rect.left) + GAP;
    let top = rect.top;
    top = Math.max(PADDING, Math.min(top, vh - TOOLTIP_MIN_HEIGHT - PADDING));
    tooltipStyle.top = top;
    arrowStyle.right = '-6px';
    arrowStyle.top = Math.max(10, Math.min(TOOLTIP_MIN_HEIGHT - 22, (rect.top + rect.height / 2) - top - 6));
    arrowStyle.borderTop = borderStyle;
    arrowStyle.borderRight = borderStyle;

  } else if (placement === 'right') {
    tooltipStyle.left = rect.right + GAP;
    let top = rect.top;
    top = Math.max(PADDING, Math.min(top, vh - TOOLTIP_MIN_HEIGHT - PADDING));
    tooltipStyle.top = top;
    arrowStyle.left = '-6px';
    arrowStyle.top = Math.max(10, Math.min(TOOLTIP_MIN_HEIGHT - 22, (rect.top + rect.height / 2) - top - 6));
    arrowStyle.borderBottom = borderStyle;
    arrowStyle.borderLeft = borderStyle;
  }

  const highlightStyle: React.CSSProperties = {
    position: 'fixed',
    top: rect.top - 8,
    left: rect.left - 8,
    width: rect.width + 16,
    height: rect.height + 16,
    borderRadius: '16px',
    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.75)',
    zIndex: 10000,
    pointerEvents: 'none', // Always allow clicking through to the underlying UI
    transition: 'all 0.1s ease-out'
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <div style={highlightStyle} className={`ring-2 ${step.requiresAction ? 'ring-emerald-500 ring-offset-4 animate-pulse' : 'ring-blue-500/50'}`}>
        {step.requiresAction && (
          <div className="absolute -top-3 -right-3 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <MousePointer2 className="w-3 h-3 text-white" />
          </div>
        )}
      </div>
      <div 
        style={tooltipStyle} 
        className="pointer-events-auto bg-white p-6 rounded-[24px] shadow-2xl border border-slate-100 flex flex-col gap-4 animate-in zoom-in-95 fade-in duration-200"
      >
        <div style={arrowStyle} className="shadow-sm" />
        <div className="flex justify-between items-start relative z-10">
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs shadow-sm">
                {currentStepIndex + 1}/{steps.length}
              </div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">{step.title}</h3>
           </div>
           <button onClick={skipFlow} className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-50 rounded-full transition-colors">
             <X className="w-4 h-4" />
           </button>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed font-medium relative z-10">
          {step.content}
        </p>
        <div className="flex gap-3 mt-2 relative z-10">
          <button onClick={skipFlow} className="flex-1 py-3 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
             Skip
          </button>
          {!step.requiresAction ? (
            <button onClick={advanceStep} className="flex-1 py-3 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-black transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95">
               {currentStepIndex === steps.length - 1 ? 'Finish' : 'Next'} 
               {currentStepIndex !== steps.length - 1 && <ChevronRight className="w-3 h-3" />}
            </button>
          ) : (
            <div className="flex-1 py-3 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center gap-2">
               Action Required
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
