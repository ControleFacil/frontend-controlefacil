"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction
} from "react";

interface Periodo {
  inicio: string;
  fim: string;
}

interface PeriodoContextType {
  periodo: Periodo;
  setPeriodo: Dispatch<SetStateAction<Periodo>>;
}

const PeriodoContext = createContext<PeriodoContextType | undefined>(undefined);

export const PeriodoProvider = ({ children }: { children: ReactNode }) => {

  const hoje = new Date();
  const inicio = new Date();
  inicio.setDate(hoje.getDate() - 30);
  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const [periodo, setPeriodo] = useState<Periodo>({
    inicio: formatDate(inicio),
    fim: formatDate(hoje)
  });

  return (
    <PeriodoContext.Provider value={{ periodo, setPeriodo }}>
      {children}
    </PeriodoContext.Provider>
  );
};

export const usePeriodo = () => {
  const context = useContext(PeriodoContext);

  if (!context) {
    throw new Error("usePeriodo deve ser usado dentro de um PeriodoProvider");
  }

  return context;
};