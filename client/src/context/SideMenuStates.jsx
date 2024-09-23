import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isProfile, setIsProfile] = useState(false);
  const [isChatList, setIsChatList] = useState(true);
  const [isFriends, setIsFriends] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isGroup, setIsGroup] = useState(false);

  return (
    <AppContext.Provider value={{
      isProfile, setIsProfile,
      isChatList, setIsChatList,
      isFriends, setIsFriends,
      isNewGroup, setIsNewGroup,
      isGroup, setIsGroup
    }}>
      {children}
    </AppContext.Provider>
  );
};
