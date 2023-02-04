import React, { useState, useContext, createContext } from 'react';
const shoppingContext = createContext({});

//店家搜尋欄相關狀態管理
export const SearchValueProvider = ({ children }) => {
  //文字、價格
  const [formData, setFormData] = useState({});
  //排序方式
  const [isChecked, setIsChecked] = useState(false);
  //等待時間
  const [searchWaitTime, setSearchWaitTime] = useState('80');

  const clearSearchState = () => {
    setFormData({});
    setIsChecked(false);
    setSearchWaitTime('80')
  };


  return (
    <shoppingContext.Provider
      value={{
        searchWaitTime,
        setSearchWaitTime,
        formData,
        setFormData,
        isChecked,
        setIsChecked,
        clearSearchState,
      }}
    >
      {children}
    </shoppingContext.Provider>
  );
};

export const UseSearchValue = () => useContext(shoppingContext);
