import React, { createContext, useContext, useState } from 'react';

const ShowcaseContext = createContext();

export const useShowcase = () => useContext(ShowcaseContext);

export const ShowcaseProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    heroStyle: 'video', // 'video' | 'static'
    ctaColor: 'luxury', // 'luxury' | 'brand'
    showFomo: false,
    navStyle: 'transparent',
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <ShowcaseContext.Provider value={{ settings, updateSetting }}>
      {children}
    </ShowcaseContext.Provider>
  );
};
