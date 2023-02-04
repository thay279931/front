import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom/dist';
import { v4 as uuidv4 } from 'uuid';
const siteName = '35.221.208.241';
// 開新視窗並置中的函式，facebook use it
// https://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen
function PopupCenter(url, title, w, h) {
  var userAgent = navigator.userAgent,
    mobile = function () {
      return (
        /\b(iPhone|iP[ao]d)/.test(userAgent) ||
        /\b(iP[ao]d)/.test(userAgent) ||
        /Android/i.test(userAgent) ||
        /Mobile/i.test(userAgent)
      );
    },
    screenX =
      typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft,
    screenY =
      typeof window.screenY != 'undefined' ? window.screenY : window.screenTop,
    outerWidth =
      typeof window.outerWidth != 'undefined'
        ? window.outerWidth
        : document.documentElement.clientWidth,
    outerHeight =
      typeof window.outerHeight != 'undefined'
        ? window.outerHeight
        : document.documentElement.clientHeight - 22,
    targetWidth = mobile() ? null : w,
    targetHeight = mobile() ? null : h,
    V = screenX < 0 ? window.screen.width + screenX : screenX,
    left = parseInt(V + (outerWidth - targetWidth) / 2, 10),
    right = parseInt(screenY + (outerHeight - targetHeight) / 2.5, 10),
    features = [];
  if (targetWidth !== null) {
    features.push('width=' + targetWidth);
  }
  if (targetHeight !== null) {
    features.push('height=' + targetHeight);
  }
  features.push('left=' + left);
  features.push('top=' + right);
  features.push('scrollbars=1');

  var newWindow = window.open(url, title, features.join(','));

  if (window.focus) {
    newWindow.focus();
  }

  return newWindow;
}
//自訂HOOK INTERVAL
// source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
//開啟監聽器
function subscribe(eventName, listener) {
  document.addEventListener(eventName, listener);
}
//關閉監聽器
function unsubscribe(eventName, listener) {
  document.removeEventListener(eventName, listener);
}

function publish(eventName, data) {
  const event = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(event);
}

function LinePay(props) {
  // 開新視窗給line-pay使用，用ref可以對跳出視窗控制或讀取dom等等
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/open
  const newWindow = useRef(null);

  const [paid, setPaid] = useState(false);
  const [start, setStart] = useState(false);

  // 5 min to countDown
  // const [countDown, setContDown] = useState(5 * 60);

  // const [orderId, setOrderId] = useState('');

  const [productName, setProductName] = useState('測試商品');
  const [amount, setAmount] = useState(2);

  const navi = useNavigate();

  //進來時監聽是否已經付款
  useEffect(() => {
    subscribe('paid', () => setPaid(true));
    return () => {
      unsubscribe('paid');
    };
  }, []);

  useEffect(() => {
    if (paid) {
      // alert('已付款');
      //這一頁之後做成元件放在訂單頁
      setTimeout(() => {
        navi('/');
      }, 3000);
    }
    return;
  }, [paid]);

  // const checkPaid = () => {
  //   axios
  //     .get(`http://${siteName}:3001/LinePay/checking?orderId=${orderId}`)
  //     .then((response) => {
  //       console.log(response.data.status);

  //       if (response.data.status === 'paid') {
  //         setStart(false);
  //         setPaid(true);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setStart(false);
  //     });
  // };

  // check every second
  //倒數
  // useInterval(
  //   () => {
  //     if (countDown < 0) {
  //       setStart(false);
  //       return;
  //     }

  //     //checkPaid()
  //     console.log(countDown);
  //     setContDown(countDown - 1);
  //   },
  //   start ? 1000 : null
  // );
  //===============================================分隔線================================================
  //按下去的函式

  // https://developers.line.biz/en/docs/line-login/
  // productName: 'demo',
  // amount: 1,
  // currency: 'TWD',
  // orderId: uuidv4(),
  // const newOrderId = uuidv4()

  // setOrderId(newOrderId)
  const handleLinePay = () => {
    const params = new URLSearchParams({
      //產品名稱 之後可能改成店名?
      productName: productName,
      //價格
      amount: amount,
      //幣別
      currency: 'TWD',
      // orderId: 'SS20221112A1105',
    });

    // console.log(params.toString())

    //1. open a new window for line login
    const url =
      `http://${siteName}:3001/oldLinePay/reserve/?` + params.toString();

    newWindow.current = PopupCenter(url, 'LinelogInPopup', 400, 600);

    setStart(true);
  };
  //===============================================分隔線================================================
  return (
    <>
      <p>付款</p>
      商品名稱:
      <input
        type="text"
        name="productName"
        value={productName}
        onChange={(e) => {
          setProductName(e.target.value);
        }}
      />
      總價:
      <input
        type="number"
        name="amount"
        value={amount === 0 ? '' : amount}
        onChange={(e) => {
          setAmount(Number(e.target.value));
        }}
      />
      <p>
        付款狀態:
        {paid ? <strong>已完成付款</strong> : '尚未付款'}
      </p>
      <button onClick={handleLinePay}>Line Pay</button>
    </>
  );
}

export default LinePay;
