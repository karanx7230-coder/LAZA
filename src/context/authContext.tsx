// src/context/AuthContext.tsx
import React, { createContext, useState } from 'react';

// Create the context
export const AuthContext = createContext<any>(null);

// Create a Provider component
export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null); // user is null by default

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};