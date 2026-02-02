
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

// --- Components ---

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
    <div className="fixed inset-0 z-[300] bg-neutral-900 flex flex-col items-center justify-between py-20 px-10 text-white animate-fade-in">
      <div className="text-center">
        <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.5)]">
          <span className="text-4xl text-white">👤</span>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-white">Kuyasa Cyber Hackar</h2>
        <p className="text-neutral-400 font-mono tracking-widest">{SUPPORT_NUMBER}</p>
        <p className="text-green-500 font-mono mt-4 text-xl animate-pulse">{formatTime(timer)}</p>
      </div>

      <div className="grid grid-cols-3 gap-8 w-full max-w-sm mb-12 opacity-50">
        {['Mute', 'Keypad', 'Speaker', 'Add Call', 'Video', 'Contacts'].map(opt => (
          <div key={opt} className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 border border-white/20 rounded-full flex items-center justify-center bg-white/5">
              <span className="text-xs">⬤</span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-tighter text-white">{opt}</span>
          </div>
        ))}
      </div>

      <button 
        onClick={onHangUp}
        className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(220,38,38,0.6)] active:scale-90 transition-transform"
      >
        <span className="text-4xl rotate-[135deg] text-white">📞</span>
      </button>
    </div>
  );
};

const LockScreen: React.FC<{ onUnlock: () => void }> = ({ onUnlock }) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [isCalling, setIsCalling] = useState(false);

  const handleKeyPress = (val: string) => {
    if (pin.length < 4) {
      const newPin = pin + val;
      setPin(newPin);
      if (newPin.length === 4) {
        if (newPin === MASTER_PIN) {
          onUnlock();
        } else {
          setError(true);
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
    <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-8 select-none">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <img 
          src={HACKER_BACKGROUND_URL} 
          alt="bg" 
          className="w-full h-full object-cover grayscale brightness-50"
        />
      </div>

      <div className="text-center mb-10 relative z-10 w-full">
        <h1 className="text-3xl font-black text-red-600 mb-4 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)] animate-pulse uppercase">Kuyasa Cyber Hackar</h1>
        <div className="bg-red-950/60 border border-red-500/30 p-4 rounded-xl backdrop-blur-md">
          <p className="text-white text-lg font-bold leading-relaxed">ফোন আনলক করতে আপনার ফ্রেন্ড এর নাম্বার এ কল দেন Kuyasa Cyber Hackar</p>
        </div>
      </div>

      <div className={`flex gap-4 mb-8 transition-transform ${error ? 'animate-bounce text-red-600' : ''}`}>
        {[0, 1, 2, 3].map((i) => (
          <div 
            key={i} 
            className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
              pin.length > i ? 'bg-red-600 border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.8)]' : 'border-neutral-700'
            }`} 
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 max-w-[280px] relative z-10 mb-10">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "E"].map((val) => (
          <button
            key={val}
            onClick={() => {
              if (val === "C") setPin("");
              else if (val === "E") return;
              else handleKeyPress(val);
            }}
            className="w-16 h-16 rounded-full border border-neutral-800 bg-neutral-900 flex items-center justify-center text-xl font-mono text-red-500 hover:bg-red-900/40 hover:border-red-500 transition-colors active:scale-90"
          >
            {val}
          </button>
        ))}
      </div>

      <button 
        onClick={() => setIsCalling(true)}
        className="relative z-10 w-full max-w-[280px] py-4 bg-green-600 hover:bg-green-500 text-white rounded-2xl flex items-center justify-center gap-4 shadow-[0_0_30px_rgba(34,197,94,0.4)] active:scale-95 transition-all"
      >
        <span className="text-2xl animate-bounce">📞</span>
        <span className="font-black text-sm uppercase tracking-widest text-white">Call to Unlock Now</span>
      </button>
      
      <p className="mt-8 text-[9px] text-red-900 uppercase tracking-widest animate-pulse font-mono text-center">
        SYSTEM LOCKED. POWER OFF DISABLED.<br/>DEVICE COMPROMISED BY KUYASA.
      </p>
    </div>
  );
};

const ScaryOverlay: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 4000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[150] bg-black flex flex-col items-center justify-center cursor-none">
      <div className="absolute inset-0 opacity-80">
        <img 
          src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000" 
          alt="Glitch" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-center z-20">
        <h2 className="text-red-600 text-3xl font-mono mb-4 animate-pulse uppercase tracking-widest">Target Found</h2>
        <h1 className="text-red-500 text-[3rem] md:text-[6rem] font-black glitch drop-shadow-[0_0_20px_rgba(220,38,38,1)] text-white" data-text="Kuyasa Cyber Hackar">Kuyasa Cyber Hackar</h1>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [appStarted, setAppStarted] = useState(false);
  const [isScared, setIsScared] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [settings, setSettings] = useState<PrankSettings>({
    timerSeconds: 10,
    isArmed: false,
    lockOnTrigger: true,
  });
  const [countdown, setCountdown] = useState<number | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio and wake lock safely
  const handleStart = async () => {
    const audio = new Audio(GHOST_SCREAM_URL);
    audio.load();
    audioRef.current = audio;

    if ('wakeLock' in navigator) {
      try {
        await (navigator as any).wakeLock.request('screen');
      } catch (err) {
        console.warn("WakeLock failed:", err);
      }
    }

    // Try fullscreen on start to "hide" browser UI
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch (e) {}

    setAppStarted(true);
  };

  const triggerScare = useCallback(() => {
    setIsScared(true);
    if (audioRef.current) {
      audioRef.current.volume = 1.0;
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
  }, []);

  const finishScare = useCallback(() => {
    setIsScared(false);
    if (settings.lockOnTrigger) {
      setIsLocked(true);
    }
    setSettings(prev => ({ ...prev, isArmed: false }));
    setCountdown(null);
  }, [settings.lockOnTrigger]);

  useEffect(() => {
    let interval: number;
    if (settings.isArmed && countdown !== null && countdown > 0) {
      interval = window.setInterval(() => {
        setCountdown(prev => (prev !== null ? prev - 1 : 0));
      }, 1000);
    } else if (settings.isArmed && countdown === 0) {
      triggerScare();
    }
    return () => clearInterval(interval);
  }, [settings.isArmed, countdown, triggerScare]);

  if (!appStarted) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-10 text-center">
        <div className="w-20 h-20 bg-green-900/20 rounded-full flex items-center justify-center mb-8 border border-green-500/30 animate-pulse">
           <span className="text-3xl">📡</span>
        </div>
        <h1 className="text-green-500 text-2xl font-bold mb-4 tracking-wider">Secure Signal Terminal</h1>
        <p className="text-neutral-500 text-sm mb-10 max-w-xs leading-relaxed">
          ফ্রী তে কল সার্ভিস টি শুরু করতে নিচের বাটনে ক্লিক করে কানেক্ট করুন।
        </p>
        <button 
          onClick={handleStart}
          className="w-full max-w-xs py-4 bg-green-600 hover:bg-green-500 text-white font-black uppercase tracking-widest rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all active:scale-95"
        >
          CONNECT SERVER
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 flex flex-col font-sans relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen"
        style={{ backgroundImage: `url(${HACKER_BACKGROUND_URL})`, backgroundSize: 'cover' }}
      />

      {isScared && <ScaryOverlay onFinish={finishScare} />}
      {isLocked && <LockScreen onUnlock={() => setIsLocked(false)} />}

      <header className="p-6 border-b border-green-900/30 flex justify-between items-center z-10 backdrop-blur-md bg-black/60">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded-full animate-pulse border border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
          <h1 className="text-xl font-bold text-green-500 tracking-wider">ফ্রী তে কল করুন</h1>
        </div>
        <div className="text-[10px] text-green-800 uppercase tracking-[0.2em] font-mono">STATUS: ONLINE</div>
      </header>

      <main className="flex-1 flex flex-col p-6 gap-6 z-10 max-w-2xl mx-auto w-full">
        
        <div className="bg-neutral-900/80 border border-green-900/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div className="w-40 h-40 rounded-full border-4 border-dashed border-green-900/40 flex items-center justify-center mb-6 relative group overflow-hidden">
            <div className="absolute inset-0 bg-green-500/5 rounded-full blur-2xl group-hover:bg-green-500/10 transition-all"></div>
            {countdown !== null ? (
              <div className="text-6xl font-black text-green-500 font-mono drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">{countdown}</div>
            ) : (
              <div className="text-green-800 text-xs font-mono animate-pulse">SERVER READY</div>
            )}
          </div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-green-700 font-mono">
            {settings.isArmed ? "CONNECTING TO GLOBAL NODE" : "ENCRYPTED CALL NETWORK"}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <button 
            onClick={triggerScare}
            className="p-8 bg-green-900/10 border border-green-900/30 rounded-2xl flex flex-col items-center justify-center hover:bg-green-900/20 transition-all active:scale-95 group shadow-lg"
          >
            <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">📞</span>
            <span className="text-lg font-bold uppercase tracking-widest text-green-500">ফ্রী কল শুরু করুন</span>
            <span className="text-[10px] text-green-900 mt-1 uppercase font-mono">Satellite Connection Enabled</span>
          </button>
        </div>

        <div className="p-5 bg-neutral-900/80 border border-green-900/20 rounded-2xl">
           <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-mono text-green-900">QUALITY_STABILIZER</span>
              <span className="text-xs font-bold text-green-600">{settings.timerSeconds}s</span>
           </div>
           <input 
              type="range" 
              min="3" 
              max="60" 
              value={settings.timerSeconds}
              onChange={(e) => setSettings(s => ({...s, timerSeconds: parseInt(e.target.value)}))}
              className="w-full h-1 bg-green-950 rounded-lg appearance-none cursor-pointer accent-green-500 mb-6"
           />
           <button 
             onClick={() => { setCountdown(settings.timerSeconds); setSettings(s => ({...s, isArmed: true})); }}
             disabled={settings.isArmed || isScared}
             className="w-full py-3 bg-neutral-800 hover:bg-green-900/20 hover:text-green-400 disabled:bg-neutral-900 text-neutral-500 border border-green-900/10 rounded-xl text-xs font-black uppercase tracking-widest transition-all font-mono"
           >
             Initialize Signal
           </button>
        </div>

        <div className="bg-neutral-900/40 border border-green-900/10 rounded-2xl p-6">
          <h2 className="font-mono text-sm text-green-700 mb-4 flex items-center gap-2 uppercase tracking-widest">
            <span className="text-green-500 animate-pulse">●</span> Support Center
          </h2>
          <div className="space-y-4">
            <p className="text-xs text-neutral-500 italic mb-4 leading-relaxed">
              কল করতে সমস্যা হচ্ছে? Kuyasa Cyber Hackar টিমের সাথে যোগাযোগ করতে নিচের বাটনে ক্লিক করুন।
            </p>
            <a 
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-[#075E54] hover:bg-[#128C7E] text-white rounded-xl flex items-center justify-center gap-3 font-bold text-sm uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(37,211,102,0.1)] border border-green-500/20"
            >
              <span className="font-bold text-sm uppercase tracking-wider text-white">WhatsApp Message</span>
            </a>
          </div>
        </div>

      </main>

      <footer className="p-8 text-[11px] text-green-900 text-center font-mono uppercase tracking-[0.1em] bg-black/60 border-t border-green-900/20">
        আমাদের উন্নত সার্ভার ব্যবহার করে এখন আপনি বিশ্বের যেকোনো প্রান্তে সম্পূর্ণ ফ্রীতে কল করতে পারবেন। 
        <br/>
        আপনার গোপনীয়তা আমাদের কাছে অগ্রাধিকার। Kuyasa Cyber Hackar টিমের সাথেই থাকুন।
      </footer>
    </div>
  );
};

export default App;
