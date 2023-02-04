import { useEffect } from 'react';

//選項群
function OrderOptions({
  orderList,
  setSelectedOrder,
  setOpenList,
  setSelectedData,
  selectedOrder,
  openList,
}) {
  //{ orderId: 0, name: '' }
  /* 
    {
    "sid": 88,
    "shop_sid": 3,
    "name": "樂麵屋",
    "order_time": "2022/11/20 19:04:58",
    "orderId": "M22112088"
    }
     */
  //  .openedOptions    .active

  return (
    <>
      <div>
        {orderList.map((v, i) => {
          return (
            <div
              onClick={() => {
                setSelectedOrder(v.sid);
                setOpenList(false);
                setSelectedData({ orderId: v.orderId, name: v.name });
              }}
              value={v.sid}
              key={v.sid}
              className={`w100p disf marb10 padV5 jc-sb ai-c h100p openedOptions  ${
                selectedOrder === v.sid ? 'active' : ''
              }`}
            >
              <p className="w50p orderSelectWrap">{v.name}</p>
              <p className="w50p disf">
                <span className="smallHidden">訂單編號:</span>
                <span>{v.orderId}</span>
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default OrderOptions;
