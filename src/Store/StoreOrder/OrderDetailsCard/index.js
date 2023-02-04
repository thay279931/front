//訂單第三層 卡片

import { useState } from 'react';
import '../StoreOrder.css';

function OrderDetailsCard({ datas, page, setOpenDetail, setChoosedOrderSid }) {
  return (
    <div className="orderDetailsCardCol padH5 ai-s">
      <div
        className={`orderDetailsCard color${page}`}
        onClick={() => {
          setChoosedOrderSid(() => datas.sid);
          setOpenDetail(() => true);
        }}
      >
        <div className="fw6">客戶名稱：{datas.name}</div>
        <div>訂單編號：{datas.orderNumber}</div>
        {/* 未確認訂單 */}
        {page === 0 ? (
          <>
            <div>商品總數：{datas.total_amount}</div>
            <div>下單時間：{datas.order_time}</div>
          </>
        ) : (
          <></>
        )}
        {/* 已接受訂單 */}
        {page === 1 ? (
          <>
            <div>商品總數：{datas.total_amount}</div>
            <div>接單時間：{datas.shop_accept_time}</div>
          </>
        ) : (
          <></>
        )}
        {/* 未取餐訂單 */}
        {page === 2 ? (
          <>
            <div>完成時間：{datas.shop_complete_time}</div>
            <div>外送員：{datas.deliver_name || '未接單'}</div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
export default OrderDetailsCard;
