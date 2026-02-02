
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
    <div className="fixed inset-0 z-[500] bg-[#050505] flex flex-col items-center justify-between py-20 px-10 text-white animate-fade-in overflow-hidden">
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

  // Block Back Button by repeatedly pushing state
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const blockBack = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener('popstate', blockBack);
    return () => window.removeEventListener('popstate', blockBack);
  }, []);

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
    <div className="fixed inset-0 z-[400] bg-black flex flex-col items-center justify-center p-8 select-none overflow-hidden touch-none">
      {/* Simulation Overlay to make it look like a real OS lock */}
      <div className="absolute top-4 left-0 w-full px-6 flex justify-between items-center opacity-40 z-50">
        <span className="text-xs font-mono text-white">12:00</span>
        <div className="flex gap-2">
           <span className="text-xs">📶</span>
           <span className="text-xs">🔋 1%</span>
        </div>
      </div>

      <div className="absolute inset-0 opacity-50 pointer-events-none">
        <img 
          src={HACKER_BACKGROUND_URL} 
          alt="bg" 
          className="w-full h-full object-cover grayscale brightness-[0.3]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
      </div>

      <div className="text-center mb-12 relative z-10 w-full animate-pulse">
        <h1 className="text-4xl font-black text-red-600 mb-6 drop-shadow-[0_0_20px_rgba(220,38,38,1)] uppercase tracking-tighter">System Locked</h1>
        <div className="bg-red-950/40 border-2 border-red-500/40 p-6 rounded-2xl backdrop-blur-xl shadow-2xl">
          <p className="text-white text-lg font-black leading-tight">
             আপনার ফোন হ্যাক হয়েছে। আনলক করতে নিচের নাম্বারে কল দিন অথবা সঠিক পিন দিন।
          </p>
          <p className="text-red-500 text-[10px] mt-4 font-mono uppercase tracking-[0.3em]">Hardware Buttons Disabled</p>
        </div>
      </div>

      <div className={`flex gap-6 mb-12 transition-transform ${error ? 'animate-shake' : ''}`}>
        {[0, 1, 2, 3].map((i) => (
          <div 
            key={i} 
            className={`w-5 h-5 rounded-full border-2 transition-all duration-500 ${
              pin.length > i ? 'bg-red-600 border-red-500 shadow-[0_0_25px_rgba(220,38,38,1)] scale-125' : 'border-neutral-800 scale-100'
            }`} 
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5 max-w-[300px] relative z-10 mb-12">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "E"].map((val) => (
          <button
            key={val}
            onClick={() => {
              if (val === "C") setPin("");
              else if (val === "E") return;
              else handleKeyPress(val);
            }}
            className="w-16 h-16 rounded-full border border-neutral-800 bg-neutral-900/50 backdrop-blur-md flex items-center justify-center text-2xl font-black text-red-500 hover:bg-red-600 hover:text-white transition-all active:scale-75 shadow-lg"
          >
            {val}
          </button>
        ))}
      </div>

      <button 
        onClick={() => setIsCalling(true)}
        className="relative z-10 w-full max-w-[280px] py-5 bg-green-600 hover:bg-green-500 text-white rounded-3xl flex items-center justify-center gap-4 shadow-[0_0_40px_rgba(34,197,94,0.5)] active:scale-90 transition-all border-b-4 border-green-800"
      >
        <span className="text-3xl animate-bounce">📞</span>
        <span className="font-black text-sm uppercase tracking-[0.2em]">Emergency Call</span>
      </button>
      
      <p className="mt-10 text-[10px] text-neutral-600 uppercase tracking-[0.4em] font-mono text-center">
        POWER_OFF_LOCKED // HOME_LOCKED <br/>
        ENCRYPTION ACTIVE: 256-BIT AES
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
    <div className="fixed inset-0 z-[600] bg-black flex flex-col items-center justify-center cursor-none overflow-hidden touch-none">
      <div className="absolute inset-0 opacity-100 animate-glitch-fast">
        <img 
          src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000" 
          alt="Glitch" 
          className="w-full h-full object-cover grayscale brightness-200 contrast-150"
          loading="eager"
        />
      </div>
      <div className="text-center z-20">
        <div className="text-red-600 text-6xl font-black mb-8 animate-bounce">⚠️</div>
        <h1 className="text-white text-[3rem] md:text-[6rem] font-black glitch drop-shadow-[0_0_30px_rgba(255,255,255,1)]" data-text="SYSTEM COMPROMISED">SYSTEM COMPROMISED</h1>
        <p className="text-red-500 font-mono text-sm tracking-[1em] mt-10 animate-pulse">KUYASA CYBER ATTACK</p>
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

  const handleStart = async () => {
    setAppStarted(true);

    const audio = new Audio(GHOST_SCREAM_URL);
    audio.load();
    audioRef.current = audio;

    // Aggressive Fullscreen
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch (e) {
      console.warn("Fullscreen failed", e);
    }

    // Attempt Wake Lock
    if ('wakeLock' in navigator) {
      try {
        await (navigator as any).wakeLock.request('screen');
      } catch (err) {}
    }

    // Vibrate on start
    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
  };

  const triggerScare = useCallback(() => {
    setIsScared(true);
    if (audioRef.current) {
      audioRef.current.volume = 1.0;
      audioRef.current.play().catch(() => {});
    }
    if (navigator.vibrate) navigator.vibrate([500, 200, 500, 200, 1000]);
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
      <div className="flex-1 min-h-[100dvh] bg-black flex flex-col items-center justify-center p-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-green-500/5 animate-pulse"></div>
        <div className="w-28 h-28 bg-green-950/20 rounded-full flex items-center justify-center mb-10 border-2 border-green-500/40 animate-pulse relative z-10">
           <span className="text-5xl">🛰️</span>
        </div>
        <h1 className="text-green-500 text-3xl font-black mb-6 tracking-widest uppercase relative z-10">Cyber Signal</h1>
        <p className="text-neutral-500 text-sm mb-12 max-w-xs leading-relaxed relative z-10">
          সার্ভারে কানেক্ট করতে নিচের বাটনে ক্লিক করুন। একবার কানেক্ট হলে হাই-স্পিড কল সার্ভিস চালু হবে।
        </p>
        <button 
          onClick={handleStart}
          className="w-full max-w-xs py-6 bg-green-600 hover:bg-green-500 text-white font-black uppercase tracking-[0.3em] rounded-3xl shadow-[0_0_50px_rgba(34,197,94,0.4)] transition-all active:scale-90 text-xl border-b-8 border-green-800 relative z-10"
        >
          CONNECT SERVER
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-[100dvh] bg-black text-neutral-200 flex flex-col font-sans relative overflow-x-hidden">
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-screen"
        style={{ backgroundImage: `url(${HACKER_BACKGROUND_URL})`, backgroundSize: 'cover' }}
      />

      {isScared && <ScaryOverlay onFinish={finishScare} />}
      {isLocked && <LockScreen onUnlock={() => setIsLocked(false)} />}

      <header className="p-6 border-b border-green-900/30 flex justify-between items-center z-10 backdrop-blur-xl bg-black/80">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-green-600 rounded-full animate-pulse border-2 border-green-400 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.5)]">
             <span className="text-white text-xs">ON</span>
          </div>
          <h1 className="text-2xl font-black text-green-500 tracking-tighter">ফ্রী কল সার্ভিস</h1>
        </div>
        <div className="text-[10px] text-green-800 uppercase font-mono tracking-[0.3em] bg-green-950/30 px-3 py-1 rounded-full border border-green-900/40">ONLINE</div>
      </header>

      <main className="flex-1 flex flex-col p-6 gap-8 z-10 max-w-2xl mx-auto w-full pt-10">
        
        <div className="bg-neutral-900/90 border-2 border-green-900/30 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center shadow-2xl relative group">
          <div className="absolute -top-4 -right-4 bg-green-600 text-black text-[10px] font-black px-4 py-1 rounded-full">ENCRYPTED</div>
          <div className="w-48 h-48 rounded-full border-8 border-double border-green-900/30 flex items-center justify-center mb-8 relative transition-all group-hover:border-green-500/50">
            <div className="absolute inset-0 bg-green-500/5 rounded-full blur-2xl"></div>
            {countdown !== null ? (
              <div className="text-7xl font-black text-green-500 font-mono drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]">{countdown}</div>
            ) : (
              <div className="text-green-800 text-[12px] font-black font-mono animate-pulse tracking-[0.2em]">STANDBY</div>
            )}
          </div>
          <p className="text-[12px] uppercase tracking-[0.5em] text-green-700 font-mono font-black">
            {settings.isArmed ? "INITIATING GLOBAL BYPASS..." : "SIGNAL TERMINAL READY"}
          </p>
        </div>

        <button 
          onClick={triggerScare}
          className="p-12 bg-green-900/10 border-2 border-green-900/40 rounded-[2.5rem] flex flex-col items-center justify-center hover:bg-green-900/20 transition-all active:scale-95 shadow-xl group border-b-8 border-green-950"
        >
          <span className="text-6xl mb-6 group-hover:scale-110 transition-transform">📞</span>
          <span className="text-2xl font-black uppercase tracking-[0.3em] text-green-500">ফ্রী কল শুরু করুন</span>
          <span className="text-[10px] text-green-900 mt-4 font-mono uppercase font-black">Satellite Node Protocol 4.0</span>
        </button>

        <div className="p-8 bg-neutral-900/70 border-2 border-green-900/20 rounded-[2rem]">
           <div className="flex justify-between items-center mb-6">
              <span className="text-[11px] font-black font-mono text-green-900 uppercase tracking-widest">Signal Buffer Delay</span>
              <span className="text-sm font-black text-green-500 bg-green-950 px-3 py-1 rounded-lg">{settings.timerSeconds}s</span>
           </div>
           <input 
              type="range" 
              min="3" 
              max="60" 
              value={settings.timerSeconds}
              onChange={(e) => setSettings(s => ({...s, timerSeconds: parseInt(e.target.value)}))}
              className="w-full h-2 bg-green-950 rounded-lg appearance-none cursor-pointer accent-green-500 mb-8"
           />
           <button 
             onClick={() => { setCountdown(settings.timerSeconds); setSettings(s => ({...s, isArmed: true})); }}
             disabled={settings.isArmed || isScared}
             className="w-full py-5 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 text-green-500 border-2 border-green-900/20 rounded-2xl text-xs font-black uppercase tracking-[0.3em] transition-all shadow-lg active:translate-y-1"
           >
             Initialize Signal Bypass
           </button>
        </div>

        <div className="bg-neutral-900/40 border-2 border-green-900/10 rounded-[2rem] p-8 mb-10">
          <h2 className="font-mono text-[12px] text-green-700 mb-6 flex items-center gap-3 uppercase font-black tracking-widest">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span> Global Support
          </h2>
          <p className="text-[12px] text-neutral-500 mb-8 leading-relaxed font-medium">
            যদি কল কানেক্ট হতে সমস্যা হয়, তবে দ্রুত সমাধান পেতে আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন।
          </p>
          <a 
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-5 bg-[#075E54] hover:bg-[#128C7E] text-white rounded-2xl flex items-center justify-center font-black text-sm uppercase tracking-[0.2em] transition-all border-b-4 border-[#043d37] shadow-xl"
          >
            WhatsApp Support
          </a>
        </div>

      </main>

      <footer className="p-12 text-[11px] text-green-900 text-center font-mono uppercase leading-relaxed border-t border-green-900/10 bg-black/90">
        আমাদের উন্নত সার্ভার ব্যবহার করে এখন আপনি বিশ্বের যেকোনো প্রান্তে সম্পূর্ণ ফ্রীতে কল করতে পারবেন। আপনার গোপনীয়তা আমাদের কাছে অগ্রাধিকার। <br/>
        <span className="mt-4 block font-black text-[9px] opacity-40">SYSTEM VERSION: 9.4.1.2 // SECURE TERMINAL</span>
      </footer>
    </div>
  );
};

export default App;
