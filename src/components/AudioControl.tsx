import React, { useState } from 'react';
import { useEventHorizonAudio } from '../context/AudioContext';
import { Volume2, VolumeX, Radio, Sparkles } from 'lucide-react';

interface AudioControlProps {
  className?: string;
  variant?: 'hero' | 'compact';
}

export const AudioControl: React.FC<AudioControlProps> = ({
  className = '',
  variant = 'hero',
}) => {
  const { isStarted, isMuted, volume, toggleMute, setVolume, initAudio } = useEventHorizonAudio();
  const [showSlider, setShowSlider] = useState(false);

  const handleClick = () => {
    if (!isStarted) {
      initAudio();
    } else {
      toggleMute();
    }
  };

  const isHero = variant === 'hero';

  return (
    <div
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setShowSlider(true)}
      onMouseLeave={() => setShowSlider(false)}
    >
      <button
        onClick={handleClick}
        type="button"
        role="button"
        aria-label={
          !isStarted
            ? 'Start Event Horizon Audio Hum'
            : isMuted
            ? 'Unmute Event Horizon Audio'
            : 'Mute Event Horizon Audio'
        }
        title={
          !isStarted
            ? 'Event Horizon Sound: Click to activate cosmic hum'
            : isMuted
            ? 'Event Horizon Hum (Muted) — Click to unmute'
            : 'Event Horizon Hum Active (49 Hz Sub-Bass) — Click to mute'
        }
        className={`group relative flex items-center cursor-pointer select-none rounded-full border transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          !isStarted
            ? 'bg-black/60 hover:bg-black/80 border-amber-500/30 hover:border-amber-400 text-amber-300/80 hover:text-amber-200 shadow-sm'
            : isMuted
            ? 'bg-zinc-900/80 hover:bg-zinc-800 border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-zinc-200'
            : 'bg-black/75 hover:bg-black/90 border-amber-500/60 hover:border-amber-400 text-amber-300 shadow-[0_0_18px_rgba(245,158,11,0.25)] hover:shadow-[0_0_24px_rgba(245,158,11,0.45)]'
        } ${
          isHero
            ? 'px-3 py-1.5 gap-2 backdrop-blur-md text-xs font-mono'
            : 'p-1.5'
        }`}
      >
        {/* Animated Visualizer / Speaker Icon */}
        <div className="relative flex items-center justify-center w-5 h-5 flex-none">
          {!isStarted ? (
            <Radio className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
          ) : isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
          ) : (
            <div className="flex items-end gap-[2px] h-3.5 w-3.5 justify-center py-0.5">
              <span className="w-[2.5px] bg-amber-400 rounded-full animate-[soundWave_1.2s_ease-in-out_infinite] h-2" />
              <span className="w-[2.5px] bg-amber-300 rounded-full animate-[soundWave_1.6s_ease-in-out_infinite_0.3s] h-3" />
              <span className="w-[2.5px] bg-amber-400 rounded-full animate-[soundWave_1.4s_ease-in-out_infinite_0.6s] h-1.5" />
            </div>
          )}
        </div>

        {/* Text Label */}
        {isHero && (
          <div className="flex items-center gap-1.5 pr-0.5">
            <span className="text-[11px] uppercase tracking-wider font-semibold">
              {!isStarted ? (
                'Horizon Hum'
              ) : isMuted ? (
                'Hum Muted'
              ) : (
                'Horizon 49Hz'
              )}
            </span>
            {!isStarted ? (
              <Sparkles className="w-2.5 h-2.5 text-amber-400 animate-pulse" />
            ) : !isMuted ? (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping opacity-80" />
            ) : null}
          </div>
        )}
      </button>

      {/* Flyout Mini Volume Slider on Hover */}
      {isStarted && showSlider && (
        <div
          className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3 py-2 rounded-xl bg-black/90 border border-amber-500/40 shadow-[0_8px_25px_rgba(0,0,0,0.85)] backdrop-blur-md animate-in fade-in zoom-in-95 duration-200"
          style={{ width: '150px' }}
        >
          <button
            onClick={toggleMute}
            className="text-amber-300/80 hover:text-white transition-colors cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-red-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
            aria-label="Event Horizon Sound Volume"
          />
        </div>
      )}
    </div>
  );
};
