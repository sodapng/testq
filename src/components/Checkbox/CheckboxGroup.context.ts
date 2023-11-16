import { createContext, useContext } from "react";

interface CheckboxGroupContextValue {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string[];
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(
  null
);
export const CheckboxGroupProvider = CheckboxGroupContext.Provider;
export const useCheckboxGroupContext = () => useContext(CheckboxGroupContext);
