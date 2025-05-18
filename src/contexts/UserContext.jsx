import React, { createContext, useContext, useState } from 'react';

const userToken = localStorage.getItem('auth');
const decodedUser = userToken ? JSON.parse(userToken) : null;

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(decodedUser);

  const login = (userDetails) => {
    localStorage.setItem('auth', JSON.stringify(userDetails));
    setUser(userDetails);
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { useUserContext };
export default UserProvider;
