import React, { useState, useContext, createContext } from 'react';
import { usePay } from './PayPageContext';
const CartContext = createContext(null);
//購物車函式編輯
export const CartProvider = ({ children }) => {
  //購物車總數
  const { setCartContents, setCartTotal } = usePay();
  //===============================================分隔線================================================
  //+
  function addCart(
    shopSid, // 店家SID
    productSid, //產品SID
    shopName, //店家名稱
    productName, //產品名稱
    price, //產品價格
    cuttedPrice, //產品特價後價格
    imageUrl, //產品圖片連結
    details //其他資訊(選擇等等)
  ) {
    let localCart = JSON.parse(localStorage.getItem('cart'));
    if (!localCart) {
      localCart = {};
    }
    if (!localCart.cartList) {
      localCart.cartList = {};
    }
    if (!localCart.cartList[shopSid]) {
      localCart.cartList[shopSid] = {};
      localCart.cartList[shopSid].shopTotal = 0;
      localCart.cartList[shopSid].shopName = shopName;
    }
    if (!localCart.cartList[shopSid].list) {
      localCart.cartList[shopSid].list = {};
    }
    if (!localCart.cartList[shopSid].list[productSid]) {
      localCart.cartList[shopSid].list[productSid] = {};
    }
    //本來就有就+1 沒有就設定成1
    if (localCart.cartList[shopSid].list[productSid].amount) {
      localCart.cartList[shopSid].list[productSid].amount++;
    }
    //沒設定過要設定商品資訊
    else {
      localCart.cartList[shopSid].list[productSid].amount = 1;
    }
    localCart.cartList[shopSid].list[productSid].name = productName;
    localCart.cartList[shopSid].list[productSid].price = price;
    localCart.cartList[shopSid].list[productSid].cuttedPrice = cuttedPrice;
    localCart.cartList[shopSid].list[productSid].imageUrl = imageUrl;
    localCart.cartList[shopSid].list[productSid].details = details;
    localCart.cartList[shopSid].shopTotal++;

    //店家總金額
    let shopPriceTotal = 0;
    for (let element in localCart.cartList[shopSid].list) {
      if (element) {
        const dividedProduct = localCart.cartList[shopSid].list[element];
        shopPriceTotal +=
          Number(dividedProduct.cuttedPrice) * Number(dividedProduct.amount);
        //===============================================分隔線================================================
        if (Object.keys(dividedProduct.details).length) {
          // console.log(Object.keys(dividedProduct.details).length);
          for (let element of dividedProduct.details) {
            shopPriceTotal +=
              Number(element.price) * Number(dividedProduct.amount);
          }
        }
        //===============================================分隔線================================================
      }
    }
    localCart.cartList[shopSid].shopPriceTotal = shopPriceTotal;

    //總數重新計算
    let countCartTotal = 0;
    for (let element in localCart.cartList) {
      if (element) {
        countCartTotal += localCart.cartList[element].shopTotal;
      }
    }
    //放回去
    localCart.cartTotal = countCartTotal;
    localStorage.setItem('cart', JSON.stringify(localCart));
    //全域變數
    setCartTotal(countCartTotal);
    setCartContents(localCart);
  }
  //===============================================分隔線================================================
  //-
  function reduceCart(shopSid, productSid) {
    let localCart = JSON.parse(localStorage.getItem('cart'));
    if (
      !localCart ||
      !localCart.cartList ||
      !localCart.cartList[shopSid] ||
      !localCart.cartList[shopSid].list ||
      !localCart.cartList[shopSid].list[productSid] ||
      !localCart.cartList[shopSid].list[productSid].amount
    ) {
      return;
    }
    //判斷現在幾個
    if (localCart.cartList[shopSid].list[productSid].amount > 1) {
      localCart.cartList[shopSid].list[productSid].amount--;
    } else if (localCart.cartList[shopSid].list[productSid].amount === 1) {
      delete localCart.cartList[shopSid].list[productSid];
    }
    let shopPriceTotal = 0;
    //如果是最後一個則清除 不然只-1
    if (localCart.cartList[shopSid].shopTotal === 1) {
      delete localCart.cartList[shopSid];
    } else {
      localCart.cartList[shopSid].shopTotal--;
      //店家總金額
      for (let element in localCart.cartList[shopSid].list) {
        if (element) {
          const dividedProduct = localCart.cartList[shopSid].list[element];
          shopPriceTotal +=
            Number(dividedProduct.cuttedPrice) * Number(dividedProduct.amount);
          //===============================================分隔線================================================
          if (Object.keys(dividedProduct.details).length) {
            // console.log(Object.keys(dividedProduct.details).length);
            for (let element of dividedProduct.details) {
              shopPriceTotal +=
                Number(element.price) * Number(dividedProduct.amount);
            }
          }
          //===============================================分隔線================================================
        }
      }
      localCart.cartList[shopSid].shopPriceTotal = shopPriceTotal;
    }

    //總數重新計算
    let countCartTotal = 0;
    for (let element in localCart.cartList) {
      if (element) {
        countCartTotal += localCart.cartList[element].shopTotal;
      }
    }
    //如果歸零直接刪除
    if (countCartTotal === 0) {
      localStorage.removeItem('cart');
    } else {
      localCart.cartTotal = countCartTotal;
      // localStorage.removeItem("cart");
      localStorage.setItem('cart', JSON.stringify(localCart));
    }
    //全域變數

    setCartTotal(countCartTotal);
    setCartContents(localCart);
  }
  //===============================================分隔線================================================
  //購物車下拉式API 已經有資料    店家SID 產品SID 數量  setShowCart  setShowChooseShop 購物車內不動選項
  function editCartBySelect(
    shopSid,
    productSid,
    amount,
    setShowCart,
    setShowChooseShop
  ) {
    let localCart = JSON.parse(localStorage.getItem('cart'));
    //選擇不是0就設定數量
    console.log(123);
    console.log(amount);
    if (Number(amount) === 0) {
      console.log(123);
      delete localCart.cartList[shopSid].list[productSid];
    } else if (amount > 0) {
      localCart.cartList[shopSid].list[productSid].amount = amount;
    }
    //店家總金額重新計算
    let shopPriceTotal = 0;
    //數量
    let shopAmountTotal = 0;
    for (let element in localCart.cartList[shopSid].list) {
      if (element) {
        //數量
        shopAmountTotal += Number(
          localCart.cartList[shopSid].list[element].amount
        );
        const dividedProduct = localCart.cartList[shopSid].list[element];
        //金額
        shopPriceTotal +=
          Number(dividedProduct.cuttedPrice) * Number(dividedProduct.amount);
        //===============================================分隔線================================================
        if (Object.keys(dividedProduct.details).length) {
          // console.log(Object.keys(dividedProduct.details).length);
          for (let element of dividedProduct.details) {
            shopPriceTotal +=
              Number(element.price) * Number(dividedProduct.amount);
          }
        }
      }
    }
    localCart.cartList[shopSid].shopPriceTotal = shopPriceTotal;
    localCart.cartList[shopSid].shopTotal = shopAmountTotal;
    //本店沒內容時刪除
    if (shopPriceTotal === 0) {
      delete localCart.cartList[shopSid];
    }

    //總數重新計算
    let countCartTotal = 0;
    for (let element in localCart.cartList) {
      if (element) {
        countCartTotal += localCart.cartList[element].shopTotal;
      }
    }
    setCartTotal(countCartTotal);
    //如果歸零直接刪除
    if (countCartTotal === 0) {
      localStorage.removeItem('cart');
      setCartContents({});
    } else {
      localCart.cartTotal = countCartTotal;
      localStorage.setItem('cart', JSON.stringify(localCart));
      setCartContents(localCart);
    }
    if (shopPriceTotal === 0 || countCartTotal === 0) {
      if (setShowChooseShop && setShowCart) {
        setShowChooseShop(false);
        setShowCart(false);
      }
    }
  }
  //===============================================分隔線================================================
  function setCartWithAmount(
    shopSid, // 店家SID
    productSid, //產品SID
    shopName, //店家名稱
    productName, //產品名稱
    price, //產品價格
    cuttedPrice, //產品特價後價格
    imageUrl, //產品圖片連結
    details, //其他資訊(選擇等等)
    amount //數量
  ) {
    let localCart = JSON.parse(localStorage.getItem('cart'));
    if (!localCart) {
      localCart = {};
    }
    if (!localCart.cartList) {
      localCart.cartList = {};
    }
    if (!localCart.cartList[shopSid]) {
      localCart.cartList[shopSid] = {};
      localCart.cartList[shopSid].shopTotal = 0;
      localCart.cartList[shopSid].shopName = shopName;
    }
    if (!localCart.cartList[shopSid].list) {
      localCart.cartList[shopSid].list = {};
    }
    if (!localCart.cartList[shopSid].list[productSid]) {
      localCart.cartList[shopSid].list[productSid] = {};
    }
    console.log({ amount });
    //沒設定過要設定商品資訊
    if (Number(amount) === 0) {
      console.log(123);
      delete localCart.cartList[shopSid].list[productSid];
    } else if (Number(amount) > 0) {
      //扣掉原本的 再加新的
      //如果已經有這項商品才重算總數
      if (localCart.cartList[shopSid].list[productSid].amount > 0) {
        localCart.cartList[shopSid].shopTotal =
          localCart.cartList[shopSid].shopTotal -
          localCart.cartList[shopSid].list[productSid].amount +
          amount;
        console.log('into >0');
      } else {
        localCart.cartList[shopSid].shopTotal += amount;
        console.log('into 0');
      }
      console.log('into N>0');
      localCart.cartList[shopSid].list[productSid].amount = amount;
      localCart.cartList[shopSid].list[productSid].name = productName;
      localCart.cartList[shopSid].list[productSid].price = price;
      localCart.cartList[shopSid].list[productSid].cuttedPrice = cuttedPrice;
      localCart.cartList[shopSid].list[productSid].imageUrl = imageUrl;
      localCart.cartList[shopSid].list[productSid].details = details;
    }

    //店家總金額
    let shopPriceTotal = 0;
    for (let element in localCart.cartList[shopSid].list) {
      if (element) {
        const dividedProduct = localCart.cartList[shopSid].list[element];
        shopPriceTotal +=
          Number(dividedProduct.cuttedPrice) * Number(dividedProduct.amount);
        //===============================================分隔線================================================
        if (Object.keys(dividedProduct.details).length) {
          // console.log(Object.keys(dividedProduct.details).length);
          for (let element of dividedProduct.details) {
            shopPriceTotal +=
              Number(element.price) * Number(dividedProduct.amount);
          }
        }
        //===============================================分隔線================================================
      }
    }
    localCart.cartList[shopSid].shopPriceTotal = shopPriceTotal;

    //總數重新計算
    let countCartTotal = 0;
    for (let element in localCart.cartList) {
      if (element) {
        countCartTotal += localCart.cartList[element].shopTotal;
      }
    }
    //放回去
    localCart.cartTotal = countCartTotal;
    localStorage.setItem('cart', JSON.stringify(localCart));
    //全域變數
    setCartTotal(countCartTotal);
    setCartContents(localCart);
  }
  //===============================================分隔線================================================
  //結帳後刪除該店家購物車內容
  function paidDeleteCartPart(shopSid) {
    console.log('function-start');
    let localCart = JSON.parse(localStorage.getItem('cart'));
    delete localCart.cartList[shopSid];
    //總數重新計算
    let countCartTotal = 0;
    for (let element in localCart.cartList) {
      if (element) {
        countCartTotal += localCart.cartList[element].shopTotal;
      }
    }
    console.log({ countCartTotal });
    //如果歸零直接刪除
    if (countCartTotal === 0) {
      localStorage.removeItem('cart');
      localCart = {};
      console.log('變0');
    } else {
      localCart.cartTotal = countCartTotal;
      localStorage.setItem('cart', JSON.stringify(localCart));
      console.log('沒變0');
    }
    console.log('function-end');
    //全域變數
    setCartContents(localCart);
    setCartTotal(countCartTotal);
  }
  //===============================================分隔線================================================
  return (
    <CartContext.Provider
      value={{
        addCart,
        reduceCart,
        paidDeleteCartPart,
        editCartBySelect,
        setCartWithAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
