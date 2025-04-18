"use client";
import { CreatePageFormData, formSteps, Steps } from "@/models";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface AppState {
  checkoutForm?: CreatePageFormData;
  formData?: CreatePageFormData;
  steps: Steps[];
  activeStep: number;
}

type ContextType = [AppState, Dispatch<SetStateAction<AppState>>];

export const AppStateContext = createContext<ContextType | undefined>(
  undefined
);

export function CreateContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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

export function useCreateState(): ContextType {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useCreateState must be used within the AppProvider");
  }
  return context;
}
