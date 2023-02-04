import React, { useState, useContext, createContext } from 'react';
const PayContext = createContext(null);
//購物車相關狀態管理
export const PaydetailProvider = ({ children }) => {
  //===============================================分隔線================================================
  //舊 useCart
  //購物車總數
  const [cartTotal, setCartTotal] = useState(0);
  //購物車完整內容
  const [cartContents, setCartContents] = useState({});
  //選擇前往結帳的SID
  const [chooseedPayShop, setChooseedPayShop] = useState(0);
  //選擇前往結帳的商店內容
  //=>    cartContents.cartList[chooseedPayShop]
  // const [chooseedPayShopContents, setChooseedPayShopContents] = useState({});
  //送達地址
  const [sendAddress, setSendAddress] = useState('');
  //===============================================分隔線================================================
  //結帳頁用
  //優惠券折扣金額 只傳金額
  const [couponCutAmount, setCouponCutAmount] = useState(0);
  //優惠券SID
  const [couponSid, setCouponSid] = useState(0);
  //外送費
  const [deliverFee, setDeliverFee] = useState(10);
  //個人資料
  const [profile, setProfile] = useState({});
  //付款方式 0現金 1LINEPAY
  const [payWay, setPayWay] = useState(0);
  //外送員備註
  const [deliverMemo, setDeliverMemo] = useState('');
  //店家備註
  const [storeMemo, setStoreMemo] = useState('');
  //正在支付的訂單SID LINEPAY用
  const [payingOrderSid, setPayingOrderSid] = useState(0);
  //選擇的店家等待時間
  const [waitTime, setWaitTime] = useState(0);
  //每日優惠券折扣額度
  const [dailyCouponAmount, setDailyCouponAmount] = useState(0);
  //每日優惠券SID
  const [dailyCouponSid, setDailyCouponSid] = useState(0);

  //離開結帳頁的時候重設狀態
  const clearPayPageState = () => {
    setCouponCutAmount(0);
    setCouponSid(0);
    setDeliverFee(10);
    setProfile({});
    setPayWay(0);
    setDeliverMemo('');
    setStoreMemo('');
    setPayingOrderSid(0);
    setWaitTime(0);
    setChooseedPayShop(0);
    setDailyCouponAmount(0);
  };

  return (
    <PayContext.Provider
      value={{
        couponCutAmount,
        setCouponCutAmount,
        deliverFee,
        setDeliverFee,
        profile,
        setProfile,
        payWay,
        setPayWay,
        couponSid,
        setCouponSid,
        deliverMemo,
        setDeliverMemo,
        storeMemo,
        setStoreMemo,
        payingOrderSid,
        setPayingOrderSid,
        cartTotal,
        setCartTotal,
        cartContents,
        setCartContents,
        chooseedPayShop,
        setChooseedPayShop,
        sendAddress,
        setSendAddress,
        waitTime,
        setWaitTime,
        clearPayPageState,
        dailyCouponAmount,
        setDailyCouponAmount,
        dailyCouponSid,
        setDailyCouponSid,
      }}
    >
      {children}
    </PayContext.Provider>
  );
};

export const usePay = () => useContext(PayContext);
