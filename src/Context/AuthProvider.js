import React, { useState, useContext, createContext } from 'react';
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  //會員登入狀態
  const [authMember, setAuthMember] = useState(false);
  //店家登入狀態
  const [authStore, setAuthStore] = useState(false);
  //外送員登入狀態
  const [authDeliver, setAuthDeliver] = useState(false);
  //管理者登入狀態
  const [authAdmin, setAuthAdmin] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        authMember,
        setAuthMember,
        authStore,
        setAuthStore,
        authDeliver,
        setAuthDeliver,
        authAdmin,
        setAuthAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
