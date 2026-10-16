'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import ConsultationModal from '@/components/ui/consultation-modal';

interface ConsultationContextValue {
  openConsultation: () => void;
}

const ConsultationContext = createContext<ConsultationContextValue>({
  openConsultation: () => {},
});

export function useConsultation() {
  return useContext(ConsultationContext);
}

// One modal instance for the whole page; every "free consultation" button
// (nav, hero, booking card, mobile bar) opens the same form.
export function ConsultationProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openConsultation = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ConsultationContext.Provider value={{ openConsultation }}>
      {children}
      <ConsultationModal isOpen={isOpen} onClose={close} />
    </ConsultationContext.Provider>
  );
}
