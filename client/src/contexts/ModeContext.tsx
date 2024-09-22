import { createContext, ReactNode, useState } from "react";

interface IMode {
  mode: "light" | "dark";
  changeMode(): void;
}

export const ModeContext = createContext<IMode | null>(null);

export const ModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<"light" | "dark">(() => {
    const mode = localStorage.getItem("mode") as "light" | "dark";
    return mode || "light";
  });

  const changeMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("mode", newMode);
  };

  return (
    <ModeContext.Provider value={{ mode, changeMode }}>
      {children}
    </ModeContext.Provider>
  );
};
