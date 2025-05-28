import { createContext, useContext, useState, ReactNode } from "react";

interface FormContextType {
    result: number | null;
    setResult: (value: number) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
    const [result, setResult] = useState<number | null>(null);
    return (
        <FormContext.Provider value={{ result, setResult }}>
            {children}
        </FormContext.Provider>
    );
}

export function useFormContext() {
    const context = useContext(FormContext);
    if (!context) throw new Error("useFormContext must be used in FormProvider");
    return context;
}