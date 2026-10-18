import React, { createContext, useContext, useEffect, useState } from 'react';
import { eventHorizonAudio, AudioEngineState } from '../utils/eventHorizonAudio';

interface AudioContextValue extends AudioEngineState {
  toggleMute: () => void;
  setVolume: (v: number) => void;
  setProximitySwell: (active: boolean) => void;
  initAudio: () => void;
}

const AudioContext = createContext<AudioContextValue | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AudioEngineState>(() => eventHorizonAudio.getState());

  useEffect(() => {
    // Subscribe to engine state updates
    const unsubscribe = eventHorizonAudio.subscribe(setState);

    // Global first-interaction listener to start audio automatically
    const handleFirstInteraction = () => {
      eventHorizonAudio.initOnInteraction();
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { passive: true });
    window.addEventListener('pointerdown', handleFirstInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });
    window.addEventListener('scroll', handleFirstInteraction, { passive: true });

    return () => {
      unsubscribe();
      cleanupListeners();
    };
  }, []);

  const value: AudioContextValue = {
    ...state,
    toggleMute: () => eventHorizonAudio.toggleMute(),
    setVolume: (v: number) => eventHorizonAudio.setVolume(v),
    setProximitySwell: (active: boolean) => eventHorizonAudio.setProximitySwell(active),
    initAudio: () => eventHorizonAudio.initOnInteraction(),
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

export const useEventHorizonAudio = (): AudioContextValue => {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    throw new Error('useEventHorizonAudio must be used within an AudioProvider');
  }
  return ctx;
};
