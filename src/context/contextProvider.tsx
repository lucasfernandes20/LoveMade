"use client";
import { FormData, formSteps, Steps } from "@/models";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface AppState {
  checkoutForm?: FormData;
  steps: Steps[];
  activeStep: number;
}

type ContextType = [AppState, Dispatch<SetStateAction<AppState>>];

export const AppStateContext = createContext<ContextType | undefined>(
  undefined
);

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const state = useState<AppState>({
    steps: formSteps,
    activeStep: 1,
  });
  return (
    <AppStateContext.Provider value={state}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState(): ContextType {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within the AppProvider");
  }
  return context;
}
