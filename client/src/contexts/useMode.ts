import { useContext } from "react";
import { ModeContext } from "./ModeContext";

export const useMode = () => {
  const context = useContext(ModeContext);
  if (context === null)
    throw new Error("ModeContext was used outside ModeProvider");
  return context;
};
