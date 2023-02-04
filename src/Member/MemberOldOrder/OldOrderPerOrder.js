//歷史訂單 第二層 各單項訂單
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DropDownDetails from './DropDownDetails';
import OrderCommand from './OrderCommand';
const siteName = '35.221.208.241';
function OldOrderPerOrder({ orderData, setReloading }) {
  const [openDetail, setOpenDetail] = useState(false);
  const [openShopCommand, setOpenShopCommand] = useState(false);
  const [openDeliverCommand, setOpenDeliverCommand] = useState(false);
  const navi = useNavigate();
  const SolidStar = () => {
    return <i className="fa-solid fa-star fs18 fontMainColor"></i>;
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
    "src": "null",
    "complete_time": "2022/11/21 23:32",
    "deliverName": "外送員01",
    "coupon_name": null,
    "deliverScore": 1,
    "shopScore": null,
    "orderId": "M221122112",
    "order_date": "2022年11月22日"
    src
} */ //orderData.deliverScore       orderData.shopScore
  return (
    <>
      <div name="單個訂單外框" className="w100p marb20 oldOrderFrame bgcW of-h">
        <div className="oldOrderTopDetail">
          <div className="oldOrderStoreImgFrame  h100p as1 lh0 flexSetCenter padV10 padH5">
            <img
              className="oldOrderStoreImg w100p"
              src={` http://${siteName}:3001/images/shop/${orderData.src}`}
              alt=""
            />
          </div>
          <div className="oldOrderStoreNotImgFrame lh24 disf fd-c jc-se fw6 fs18 padH10">
            <p className="marV5">訂單編號：{orderData.orderId}</p>
            <p className="marV5">店家：{orderData.shopName}</p>
            <p className="marV5">外送員：{orderData.deliverName}</p>
            <p className="marV5">{orderData.order_date}</p>
          </div>
          <div className=" oldOrderStoreNotImgFrame  disf fd-c ai-c jc-se gap10">
            <p className="fw6 fs18">${orderData.sale}</p>
            <div className="disf fd-c">
              <p
                onClick={() => {
                  navi(`/productList/?shop_sid=${orderData.shop_sid}`);
                }}
                className="oldOrderCommand marb10 padV5"
              >
                重新下單
              </p>
              <div>
                {orderData.shopScore ? (
                  <p className="ta-c mar10 fw5 padV5">
                    店家評價：
                    {orderData.shopScore}
                    <SolidStar />
                  </p>
                ) : (
                  <p
                    onClick={() => {
                      setOpenShopCommand(true);
                    }}
                    className="oldOrderCommand"
                  >
                    給予店家評價
                  </p>
                )}
              </div>
              <div>
                {orderData.deliverScore ? (
                  <p className="ta-c marb10 fw5 padV5">
                    外送評價：
                    {orderData.deliverScore}
                    <SolidStar />
                  </p>
                ) : (
                  <p
                    onClick={() => {
                      setOpenDeliverCommand(true);
                    }}
                    className="oldOrderCommand"
                  >
                    給予外送評價
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          name="查看細節"
          onClick={() => {
            setOpenDetail((v) => !v);
          }}
          className="disf jc-sb padV20 padH20 h50 pointer"
        >
          <p className="fw5 fs18">
            {openDetail
              ? '訂單細節'
              : `查看細節(${orderData.total_amount}個品項)`}
          </p>
          <div
            className={`fontMainColor reverseArrow ${
              openDetail ? 'active' : ''
            }`}
          >
            <i className="fa-solid fa-chevron-down"></i>
          </div>
        </div>
        <div>
          {openDetail ? (
            <>
              <DropDownDetails orderSid={orderData.sid} orderData={orderData} />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      {openShopCommand ? (
        <OrderCommand
          side={2}
          setOpenShopCommand={setOpenShopCommand}
          orderSid={orderData.sid}
          targetSid={orderData.shop_sid}
          setReloading={setReloading}
        />
      ) : null}
      {openDeliverCommand ? (
        <OrderCommand
          side={3}
          setOpenDeliverCommand={setOpenDeliverCommand}
          orderSid={orderData.sid}
          targetSid={orderData.deliver_sid}
          setReloading={setReloading}
        />
      ) : null}
    </>
  );
}
export default OldOrderPerOrder;
