//地圖上訂單按鈕、訂單細節
import { useState } from 'react';
import { useSVG } from '../../../Context/SVGProvider';
import OrderDetailsOnMap from './OrderDetailsOnMap';
//                       訂單編號,訂單內容
function OrderShowOnMap({ selectedOrder, orderShowNow }) {
  const { orderSVG } = useSVG();
  const [openDetail, setOpenDetail] = useState(false);
  /* {
    "orderResult": {
        "sid": 99,
        "member_sid": 1,
        "shop_sid": 89,
        "deliver_sid": null,
        "store_order_sid": 13,
        "deliver_order_sid": null,
        "shop_memo": "店家備註",
        "deliver_memo": "外送員備註",
        "order_time": "2022-11-19T07:49:23.000Z",
        "order_total": 7715,
        "coupon_sid": 0,
        "sale": 7715,
        "paid": 1,
        "pay_method": 1,
        "LinePayID": "2022111900732678910",   
        "daily_coupon_sid": 0,
        "deliver_fee": 10,
        "cook_time": 40,
        "shop_order_status": 1,
        "deliver_order_status": 0,
        "total_amount": 65,
        "receive_name": "ゆう",
        "receive_phone": "0952400243",
        "receive_address": "106台北市大安區復興南路一段390號2樓",
        "order_complete": 0,
        "name": "I’m PASTA 和平店",
        orderId:"M221121113"
    },
    "shopResult": {
        "sid": 13,
        "member_sid": 1,
        "deliver_sid": null,
        "deliver_order_sid": null,
        "order_sid": 99,
        "shop_memo": null,
        "shop_accept_time": "2022-11-19T07:49:23.000Z",
        "shop_complete_time": "2022-11-19T07:49:30.000Z",
        "deliver_take": 0,
        "shop_sid": 89,
        "cook_finish": 1
    },
    "stepNow": 3
} */
  return (
    <>
      <div
        onClick={() => {
          if (!openDetail) {
            setOpenDetail(true);
          }
        }}
        className={`orderButtonOnMap ${openDetail ? 'open' : 'close'} `}
      >
        {openDetail ? (
          <OrderDetailsOnMap
            setOpenDetail={setOpenDetail}
            orderShowNow={orderShowNow}
          />
        ) : (
          // <orderSVG className={'orderButtonOnMapSVG'} />
          <>{orderSVG('orderButtonOnMapSVG')}</>
        )}
      </div>
    </>
  );
}
export default OrderShowOnMap;
