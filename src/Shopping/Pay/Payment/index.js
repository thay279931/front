//第四段 付款方式
import { useState } from 'react';
import PayTitleBlock from '../PayTitleBlock';
import PayButton from '../PayButton';
import { usePay } from '../../../Context/PayPageContext';
function Payment({ orderSocket }) {
  const { payWay, setPayWay } = usePay();
  //付款方式 0 現金 1 LinePay 傳到按鈕處理
  return (
    <>
      <div className="payDetailBox disf fd-c jc-sb">
        <PayTitleBlock number={4} titleString={'付款方式'} />
        <div>
          <p className="marb20 fs24 disf ai-c">
            <input
              id="pay_cash"
              name="payWay"
              checked={payWay === 0 ? true : false}
              onChange={() => {
                setPayWay(0);
              }}
              className="w10p"
              type="radio"
            />
            <label htmlFor="pay_cash">現金</label>
          </p>
          <div className="marb20 fs24 disf ai-c">
            <input
              id="pay_linepay"
              checked={payWay === 1 ? true : false}
              onChange={() => {
                setPayWay(1);
              }}
              name="payWay"
              className="w10p"
              type="radio"
            />
            <div>
              <label htmlFor="pay_linepay">
                <img src="/LINE-PayLogo.svg" alt="linepay" className="h50" />
              </label>
            </div>
          </div>
        </div>
        <PayButton orderSocket={orderSocket} />
      </div>
    </>
  );
}
export default Payment;
