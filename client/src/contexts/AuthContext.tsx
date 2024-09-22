import React, { createContext, ReactNode, useState } from "react";

interface IAuth {
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<IAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{ userId, setUserId, isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
