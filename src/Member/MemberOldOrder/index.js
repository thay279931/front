//歷史訂單 第一層
import { Component, useEffect, useState } from 'react';
import { useFunc } from '../../Context/FunctionProvider';
import OldOrderPerOrder from './OldOrderPerOrder';
import './OldOrder.css';
function MemberOldOrder() {
  const [orders, setOrders] = useState([]);
  const { loginCheckGetFetch } = useFunc();
  const [reloading, setReloading] = useState(0);
  const getAllCompleteOrders = async () => {
    const result = await loginCheckGetFetch(
      'MemberOldOrder/GetAllCompleteOrders',
      'Member'
    );
    console.log(result);
    setOrders(result);
  };
  /* {
        "sid": 112,
        "shop_sid": 89,
        "deliver_sid": 1,
        "store_order_sid": 19,
        "deliver_order_sid": 1,
        "order_time": "2022/11/22 23:17",
        "order_total": 720,
        "coupon_sid": 0,
        "sale": 720,
        "pay_method": 0,
        "deliver_fee": 10,
        "total_amount": 6,
        "shopName": "I’m PASTA 和平店",
        "complete_time": "2022/11/21 23:32",
        "deliverName": "外送員01",
        "coupon_name": null,
        "orderId": "M221122112"
        deliverScore
        shopScore
  } */

  useEffect(() => {
    getAllCompleteOrders();
  }, [reloading]);
  return (
    <div>
      {orders.length === 0 ? (
        <p className="flexSetCenter w100p h500 fw7 fs36">無歷史訂單</p>
      ) : (
        <>
          {' '}
          <p className="marb20 fs36 fw7 ta-c">過往訂單</p>
          <div name="訂單整體外框" className="disf fw-w jc-c ai-c">
            {/* 這邊MAP */}
            {/* //===============================================分隔線================================================ */}
            {/* 傳單筆資料進去 */}
            {/* <OldOrderPerOrder orderData={1} /> */}
            {orders.map((v, i) => {
              return (
                <OldOrderPerOrder
                  key={v.sid}
                  orderData={v}
                  setReloading={setReloading}
                />
              );
            })}
            {/* //===============================================分隔線================================================ */}

            {/* //===============================================分隔線================================================ */}
          </div>
        </>
      )}
    </div>
  );
}
export default MemberOldOrder;
