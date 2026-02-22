import React, { createContext } from 'react'

export const dataContext= createContext();

function UserContext({children}) {
  const serveUrl="http://localhost:8000";
  const value={
    serveUrl
  };
  return (
    <dataContext.Provider value={value}>
      {children}
    </dataContext.Provider>
  )
}

export default UserContext
