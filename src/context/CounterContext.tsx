import { createContext, useContext, ReactNode } from "react";

type CounterContextType = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

const CounterContext = createContext<CounterContextType | undefined>(undefined);

type CounterProviderProps = {
  children: ReactNode;
  value: CounterContextType;
};

export function CounterProvider({ children, value }: CounterProviderProps) {
  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
}

export function useCounter() {
  const context = useContext(CounterContext);
  if (context === undefined) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  return context;
}
