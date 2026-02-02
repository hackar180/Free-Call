
import React, { useState, useEffect, useCallback, useRef } from 'react';

// --- Constants ---
const GHOST_SCREAM_URL = 'https://www.soundjay.com/human/man-screaming-01.mp3';
const HACKER_BACKGROUND_URL = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000';
const MASTER_PIN = "1998";
const SUPPORT_NUMBER = "01736428130";
const WHATSAPP_URL = "https://wa.me/8801953913242?text=I'm%20Not%20Hackar%20But%20i%20love%20Hackar%20on%20WhatsApp.";

interface PrankSettings {
  timerSeconds: number;
  isArmed: boolean;
  lockOnTrigger: boolean;
}

const FakeCallScreen: React.FC<{ onHangUp: () => void }> = ({ onHangUp }) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-[#050505] flex flex-col items-center justify-between py-20 px-10 text-white animate-fade-in overflow-hidden touch-none">
      <div className="text-center">
        <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(34,197,94,0.6)] animate-pulse">
          <span className="text-5xl">👤</span>
        </div>
        <h2 className="text-3xl font-black mb-2 tracking-tighter">Kuyasa Cyber Hackar</h2>
        <p className="text-neutral-500 font-mono text-lg tracking-[0.2em]">{SUPPORT_NUMBER}</p>
        <div className="mt-6 inline-block px-4 py-1 bg-green-900/30 border border-green-500/20 rounded-full">
           <p className="text-green-400 font-mono text-xl">{formatTime(timer)}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-10 w-full max-w-sm mb-12 opacity-30 grayscale">
        {['Mute', 'Keypad', 'Speaker', 'Add Call', 'Video', 'Contacts'].map(opt => (
          <div key={opt} className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 border-2 border-white/10 rounded-full flex items-center justify-center bg-white/5">
              <div className="w-2 h-2 bg-white/20 rounded-full"></div>
            </div>
            <span className="text-[10px] uppercase font-black tracking-widest text-white/40">{opt}</span>
          </div>
        ))}
      </div>

      <button 
        onClick={onHangUp}
        className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(220,38,38,0.7)] active:scale-75 transition-all border-4 border-red-500/50"
      >
        <span className="text-5xl rotate-[135deg] text-white">📞</span>
      </button>
    </div>
  );
};

const LockScreen: React.FC<{ onUnlock: () => void }> = ({ onUnlock }) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [showPowerDisabled, setShowPowerDisabled] = useState(false);

  // Block Back Button aggressively
  useEffect(() => {
    const blockBack = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener('popstate', blockBack);

    const preventKeys = (e: KeyboardEvent) => {
        if (e.key === 'Escape' || e.key === 'F11' || e.key === 'Home') {
            e.preventDefault();
            triggerPowerWarning();
        }
    };
    window.addEventListener('keydown', preventKeys);

    return () => {
        window.removeEventListener('popstate', blockBack);
        window.removeEventListener('keydown', preventKeys);
    };
  }, []);

  const triggerPowerWarning = () => {
    setShowPowerDisabled(true);
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
    setTimeout(() => setShowPowerDisabled(false), 3000);
  };

  const handleKeyPress = (val: string) => {
    if (pin.length < 4) {
      const newPin = pin + val;
      setPin(newPin);
      if (newPin.length === 4) {
        if (newPin === MASTER_PIN) {
          onUnlock();
        } else {
          setError(true);
          if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
          setTimeout(() => {
            setPin("");
            setError(false);
          }, 1000);
        }
      }
    }
  };

  if (isCalling) {
    return <FakeCallScreen onHangUp={() => setIsCalling(false)} />;
  }

  return (
    <div 
        className="fixed inset-0 z-[900] bg-black flex flex-col items-center justify-center p-8 select-none overflow-hidden touch-none"
        onContextMenu={(e) => e.preventDefault()}
        onClick={(e) => {
            // Re-request fullscreen if they somehow exited
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
            }
        }}
    >
      {/* Power Button Disabled Toast */}
      {showPowerDisabled && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[1100] bg-red-600 text-white px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest animate-bounce shadow-[0_0_30px_rgba(220,38,38,0.8)] border-2 border-white/20 whitespace-nowrap">
          ⚠️ POWER BUTTON IS DISABLED BY SYSTEM
        </div>
      )}

      {/* OS Simulation Elements */}
      <div className="absolute top-4 left-0 w-full px-6 flex justify-between items-center opacity-40 z-50">
        <span className="text-xs font-mono text-white">09:00 AM</span>
        <div className="flex gap-2">
           <span className="text-xs">🚫 NO SIGNAL</span>
           <span className="text-xs">🔋 0%</span>
        </div>
      </div>

      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <img 
          src={HACKER_BACKGROUND_URL} 
          alt="bg" 
          className="w-full h-full object-cover grayscale brightness-[0.2]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
      </div>

      <div className="text-center mb-12 relative z-10 w-full">
        <div className="inline-block p-4 mb-4 bg-red-600/20 rounded-full animate-ping">
           <div className="w-4 h-4 bg-red-600 rounded-full"></div>
        </div>
        <h1 className="text-5xl font-black text-red-600 mb-6 drop-shadow-[0_0_30px_rgba(220,38,38,1)] uppercase tracking-tighter italic">PHONE LOCKED</h1>
        
        <div className="bg-red-950/60 border-2 border-red-500/50 p-6 rounded-3xl backdrop-blur-2xl shadow-[0_0_50px_rgba(220,38,38,0.3)] animate-pulse">
          <p className="text-white text-xl font-black leading-tight">
             আপনার ফোনটি পুরোপুরি লক করা হয়েছে। পাওয়ার অফ বাটন ডিজেবল করা হয়েছে।
          </p>
          <div className="mt-4 flex flex-col gap-1">
            <span className="text-red-500 text-[11px] font-mono font-black uppercase tracking-[0.2em]">Hardware Access: DENIED</span>
            <span className="text-red-500 text-[11px] font-mono font-black uppercase tracking-[0.2em]">Navigation: LOCKED</span>
          </div>
        </div>
      </div>

      <div className={`flex gap-6 mb-12 transition-all duration-300 ${error ? 'scale-110' : 'scale-100'}`}>
        {[0, 1, 2, 3].map((i) => (
          <div 
            key={i} 
            className={`w-6 h-6 rounded-full border-2 transition-all duration-500 ${
              pin.length > i ? 'bg-red-600 border-red-400 shadow-[0_0_30px_rgba(220,38,38,1)] scale-125' : 'border-neutral-800 scale-100'
            } ${error ? 'bg-white border-white animate-shake' : ''}`} 
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 max-w-[320px] relative z-10 mb-12">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "E"].map((val) => (
          <button
            key={val}
            onClick={() => {
              if (val === "C") setPin("");
              else if (val === "E") triggerPowerWarning();
              else handleKeyPress(val);
            }}
            className="w-16 h-16 rounded-3xl border border-neutral-800 bg-neutral-900/60 backdrop-blur-xl flex items-center justify-center text-3xl font-black text-red-500 hover:bg-red-600 hover:text-white transition-all active:scale-50 shadow-2xl"
          >
            {val}
          </button>
        ))}
      </div>

      <button 
        onClick={() => setIsCalling(true)}
        className="relative z-10 w-full max-w-[280px] py-6 bg-red-600 hover:bg-red-50 text-red-50 hover:text-red-600 rounded-full flex items-center justify-center gap-4 shadow-[0_0_60px_rgba(220,38,38,0.6)] active:scale-90 transition-all border-2 border-white/20 animate-pulse"
      >
        <span className="text-3xl">⚠️</span>
        <span className="font-black text-sm uppercase tracking-[0.3em]">ADMIN SUPPORT</span>
      </button>
      
      <p className="mt-12 text-[10px] text-neutral-700 uppercase tracking-[0.5em] font-mono text-center font-black">
        KUYASA_SECURITY_PROTOCOL_v9 <br/>
        SYSTEM_ID: #B87-44-X
      </p>
    </div>
  );
};

const App: React.FC = () => {
  const [appStarted, setAppStarted] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isScared, setIsScared] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Aggressive popstate management to prevent leaving
    if (appStarted) {
        window.history.pushState(null, "", window.location.href);
        const handlePop = () => {
            window.history.pushState(null, "", window.location.href);
        };
        window.addEventListener('popstate', handlePop);
        return () => window.removeEventListener('popstate', handlePop);
    }
  }, [appStarted]);

  const handleStart = async () => {
    setAppStarted(true);
    setIsLocked(true); // Go straight to lock mode for maximum effect

    const audio = new Audio(GHOST_SCREAM_URL);
    audio.load();
    audioRef.current = audio;

    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch (e) {}

    if ('wakeLock' in navigator) {
      try { await (navigator as any).wakeLock.request('screen'); } catch (err) {}
    }

    if (navigator.vibrate) navigator.vibrate([200, 100, 500]);
  };

  if (!appStarted) {
    return (
      <div className="flex-1 min-h-[100dvh] bg-black flex flex-col items-center justify-center p-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-green-500/[0.03] animate-pulse"></div>
        <div className="w-32 h-32 bg-green-950/10 rounded-[2rem] flex items-center justify-center mb-10 border-2 border-green-500/20 animate-pulse relative z-10 rotate-12">
           <span className="text-6xl">📡</span>
        </div>
        <h1 className="text-green-500 text-4xl font-black mb-8 tracking-tighter uppercase relative z-10">FREE CALL</h1>
        <p className="text-neutral-500 text-sm mb-16 max-w-xs leading-relaxed relative z-10 font-bold">
          আমাদের হাই-সিকিউর সার্ভারের মাধ্যমে যেকোনো নাম্বারে ফ্রিতে কল করুন। কানেক্ট করতে নিচে ক্লিক করুন।
        </p>
        <button 
          onClick={handleStart}
          className="w-full max-w-xs py-8 bg-green-600 hover:bg-green-500 text-white font-black uppercase tracking-[0.4em] rounded-[2rem] shadow-[0_0_60px_rgba(34,197,94,0.4)] transition-all active:scale-75 text-2xl border-b-8 border-green-800 relative z-10"
        >
          START NOW
        </button>
      </div>
    );
  }

  return (
    <div 
        className="flex-1 min-h-[100dvh] bg-black text-neutral-200 flex flex-col font-sans relative overflow-hidden"
        onContextMenu={(e) => e.preventDefault()}
    >
      {isLocked && <LockScreen onUnlock={() => setIsLocked(false)} />}
      
      {/* This main UI is "hidden" behind the lock unless unlocked */}
      <div className="flex-1 flex flex-col p-6 pt-12 items-center justify-center text-center opacity-20 blur-sm pointer-events-none">
        <h1 className="text-3xl font-black text-green-500 mb-4">SYSTEM BYPASSED</h1>
        <p className="text-neutral-500 font-mono text-xs">Waiting for Signal Input...</p>
      </div>
    </div>
  );
};

export default App;
